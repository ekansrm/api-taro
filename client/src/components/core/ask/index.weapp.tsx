import {View} from '@tarojs/components';

import {Component} from 'react'
import Quest from "@/components/core/ask/Quest";
import {questions} from "@/components/core/ask/model/mocks";

export default class QuestAll extends Component {
  render() {
    return <View>
      <Quest
        questions={questions}
      />
    </View>;
  }
}
