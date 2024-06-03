import { View } from '@tarojs/components';

import { Component } from 'react'
import QuestionComponent from "@/components/core/ask/question/question";

export default class Quest extends Component {
  render() {
    return <View>
      <QuestionComponent
        question={{
          title: '以下哪个不是 JavaScript 的数据类型？',
          options: ['Number', 'String', 'Boolean', 'Object'],
          type: 'single'
        }}
      />

    </View>;
  }
}
