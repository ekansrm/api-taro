import {View} from '@tarojs/components';

import Quest from "@/components/core/ask/Quest";
import {questions} from "@/components/core/ask/model/mocks";

const QuestAll = () => {
  return (
    <View>
      <Quest
        questions={questions}
      />
    </View>
  )
}

export default QuestAll;
