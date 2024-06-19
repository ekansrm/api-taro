import {View} from '@tarojs/components';

import Quest from "@/components/core/ask/Quest.index";
import {questions} from "@/components/core/ask/model/mocks";

const Ask = () => {
  return (
    <View>
      <Quest
        questionDataList={questions}
      />
    </View>
  )
}

export default Ask;
