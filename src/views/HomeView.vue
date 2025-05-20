<script setup lang="ts">
import requ from '@/utils/request'
import { onMounted } from 'vue'

/**
 * 网络请求：
 * 第一个参数url [必填]
 * 第二个参数传参对象 [可选]
 * 第三个参数传参方式（get请求默认为query，可不传，post请求默认为body，可不传） [可选]
 * 第四个参数其他配置（如额外headers项） [可选]
 */
const getDataNoQuery = async () => {
  try {
    // 无参只传url即可
    const res = await requ.get('/api/list')
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

const getDataWithQuery = async () => {
  try {
    // 有参数时 get 请求默认为 query 传参方式
    const res = await requ.get('/api/list', {
      userId: 1,
    })
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

const postData = async () => {
  try {
    // 有参数时 post 请求默认为 body 传参方式
    const res = await requ.post('/api/list', {
      userId: 1,
    })
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}
const postDataWithQuery = async () => {
  try {
    // 有参数时 post 请求默认为 body 传参方式, 若使用 query 传参方式, 则需要指定第三个参数为 'query'
    const res = await requ.post(
      '/api/list',
      {
        userId: 1,
      },
      'query',
    )
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

const postDataAddHeaders = async () => {
  try {
    // 其他配置，第四个参数，例如此接口额外的Headers
    const res = await requ.post(
      '/api/list',
      {
        userId: 1,
      },
      'body',
      {
        headers: {
          deviceId: '1234567890',
        },
      },
    )
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getDataNoQuery()
  getDataWithQuery()
  postData()
  postDataWithQuery()
  postDataAddHeaders()
})
</script>
<template>
  <h1>首页</h1>
  <div>
    网络请求：
    <br />
    第一个参数 url [必填]
    <br />
    第二个参数 传参对象 [可选]
    <br />
    第三个参数 传参方式（get 请求默认为 query，可不传，post 请求默认为 body ，可不传） [可选]
    <br />
    第四个参数其他配置（如当前接口需要额外的 headers 项） [可选]
  </div>
</template>
