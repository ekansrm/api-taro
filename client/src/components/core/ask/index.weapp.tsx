import {View} from '@tarojs/components';

import Quest from "@/components/core/ask/Quest.index";
import {QuestionData} from "@/components/core/ask/model/types";

interface Props {
  questions: QuestionData[];

}

const Ask = (props: Props) => {

  const {questions} = props;

  return (
    <View>
      <Quest
        questionDataList={questions}
      />
    </View>
  )
}

export default Ask;
