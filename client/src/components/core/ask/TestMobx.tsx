import { View, Text, Button } from '@tarojs/components'
import {observer, useLocalStore} from '@tarojs/mobx'
// import 'mobx-react-lite/batchingForReactDom'

function TestMobx() {

  const store = useLocalStore(() => ({
    counter: 0,
    increment() {
      store.counter++
    },
    decrement() {
      store.counter--
    },
    incrementAsync() {
      setTimeout(() => store.counter++, 1000)
    },
  }))

  const { counter, increment, decrement, incrementAsync } = store

  return (
    <View>
      <Button onClick={increment}>+</Button>
      <Button onClick={decrement}>-</Button>
      <Button onClick={incrementAsync}>Add Async</Button>
      <Text>{counter}</Text>
    </View>
  )
}

export default observer(TestMobx)
