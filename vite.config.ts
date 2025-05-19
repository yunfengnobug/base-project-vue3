import { fileURLToPath, URL } from 'node:url'
import { loadEnv, type ConfigEnv, type UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { wrapperEnv } from './build/utils'
import { visualizer } from 'rollup-plugin-visualizer'
import removeConsole from 'vite-plugin-remove-console'
// https://vite.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const env: any = wrapperEnv(loadEnv(mode, process.cwd()))
  console.log('当前环境变量：', env)

  const plugins = [
    vue(),
    vueDevTools(),
    removeConsole(), // 生产环境移除 console
  ]

  // 只在生成报告时添加 visualizer 插件
  if (process.env.ANALYZE) {
    plugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
        filename: 'dist/stats.html',
      }),
    )
  }

  return {
    base: env.VITE_BASE_PATH,
    server: {
      host: true,
    },
    plugins,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
}
