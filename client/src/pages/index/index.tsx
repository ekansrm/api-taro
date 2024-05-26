import { Component, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import './index.scss'

import Test from '@/components/test/index.weapp'


export default class Index extends Component<PropsWithChildren> {
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Test/>
      </View>
    )
  }
}
