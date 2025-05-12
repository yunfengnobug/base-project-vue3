import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios'

// 定义响应数据的接口
interface ResponseData {
  code: number
  data: any
  message: string
}

// 定义传参方式
type RequestParamsType = 'query' | 'body' | 'params'

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`)
    }
    return config
  },
  (error: AxiosError) => {
    // 对请求错误做些什么
    console.error('请求错误：', error)
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    const res = response.data
    // 这里可以根据后端的响应结构定制
    if (res.code !== 200) {
      // 触发错误处理
      const error = new Error(res.message || '请求失败') as Error & { code?: number }
      error.code = res.code
      return Promise.reject(error)
    }
    return res.data
  },
  (error: AxiosError<ResponseData>) => {
    console.error('响应错误：', error)
    // 处理 HTTP 状态码错误
    const message = error.response?.data?.message || '网络错误'
    const customError = new Error(message) as Error & { code?: number }
    customError.code = error.response?.status
    return Promise.reject(customError)
  },
)

// 处理请求参数
function handleRequestParams(params: any, type: RequestParamsType): AxiosRequestConfig {
  if (!params) return {}

  switch (type) {
    case 'query':
      return { params }
    case 'body':
      return { data: params }
    case 'params':
      return { params }
    default:
      return { params }
  }
}

// 创建请求对象
const requ = {
  get(
    url: string,
    params?: any,
    paramsType: RequestParamsType = 'query',
    config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'params' | 'data'>,
  ): Promise<any> {
    return service.request({
      method: 'GET',
      url,
      ...handleRequestParams(params, paramsType),
      ...config,
    })
  },

  post(
    url: string,
    params?: any,
    paramsType: RequestParamsType = 'body',
    config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'params' | 'data'>,
  ): Promise<any> {
    return service.request({
      method: 'POST',
      url,
      ...handleRequestParams(params, paramsType),
      ...config,
    })
  },

  put(
    url: string,
    params?: any,
    paramsType: RequestParamsType = 'body',
    config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'params' | 'data'>,
  ): Promise<any> {
    return service.request({
      method: 'PUT',
      url,
      ...handleRequestParams(params, paramsType),
      ...config,
    })
  },

  delete(
    url: string,
    params?: any,
    paramsType: RequestParamsType = 'query',
    config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'params' | 'data'>,
  ): Promise<any> {
    return service.request({
      method: 'DELETE',
      url,
      ...handleRequestParams(params, paramsType),
      ...config,
    })
  },
}

export default requ
