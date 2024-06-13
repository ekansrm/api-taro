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
    return (
      <View className='index'>
        <Ask />
         {/*<TestMobx />*/}
      </View>
    )
  }
}
