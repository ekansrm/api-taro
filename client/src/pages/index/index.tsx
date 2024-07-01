import Taro from '@tarojs/taro'

import { Component, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
// import TestMobx from "@/components/core/ask/TestMobx";
import Ask from "@/components/core/ask/index.weapp";
// import TestMobx from "@/components/core/ask/TestMobx";
import './index.scss'



export default class Index extends Component<PropsWithChildren> {
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    Taro.request({
      url: 'http://127.0.0.1:9527/api/user/1',
      method: 'GET',
      data: {
        // 请求参数
      },
      success(res) {
        console.log(res.data)
      },
      fail(err) {
        console.log(err)
      }
    })


    return (
      <View className='index'>
        <Ask />
         {/*<TestMobx />*/}
      </View>
    )
  }
}
