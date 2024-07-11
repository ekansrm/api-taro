import Taro from '@tarojs/taro'

import { Component, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
// import TestMobx from "@/components/core/ask/TestMobx";
import Ask from "@/components/core/ask/index.weapp";
// import TestMobx from "@/components/core/ask/TestMobx";
import './index.scss'
import path from "path";



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


    const fs = Taro.getFileSystemManager();
    fs.readdir({
      dirPath: `${Taro.env.USER_DATA_PATH}`,
      success(res) {
        console.log(res)
      },
      fail(res) {
        console.log(res)
      }

    })

    fs.getFileInfo({
      filePath: `${Taro.env.USER_DATA_PATH}`,
      success(res) {
        console.log(res)
      },
      fail(res) {
        console.log(res)
      }

    })

    fs.mkdir({
      dirPath: '123',
      success(res) {
        console.log(res)
      },
      fail(res) {
        console.log(res)
      }
    })

    fs.readFile(
      {
        filePath: `${Taro.env.USER_DATA_PATH}/ask.json`,
        encoding: 'utf8',
        success(res) {
          if( typeof res.data === 'string' ) {
            const json = JSON.parse(res.data)
            console.log(json)
          } else {
            console.log(res.data)
          }
        },
        fail(err) {
          console.log(err)
        }
      }
    )
    // const res = fs.readFileSync(
    //   'comp.json', 'utf8', 0,
    // )
    //
    // console.log(res)


    return (
      <View className='index'>
        <Ask />
         {/*<TestMobx />*/}
      </View>
    )
  }
}
