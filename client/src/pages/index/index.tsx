import { Component, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import Quest from '@/components/core/ask/question/index.weapp'
import './index.scss'



export default class Index extends Component<PropsWithChildren> {
  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Quest />
      </View>
    )
  }
}
