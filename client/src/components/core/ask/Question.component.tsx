import {Radio, Text, View} from '@tarojs/components';
import {QuestionProps} from "@/components/core/ask/model/types";

interface Props {
  question: QuestionProps
  pick: {[oid:string]: boolean}
  clickSelect: (oid: string) => void
  children?: React.ReactNode
}

const QuestionComponent = ({question, pick, clickSelect}: Props) => {

  return (
    <View>
      <Text>{question.desc}</Text>
      {question.options.map((option) => (
        <View key={option.oid}>
          <Radio
            checked={pick[option.oid]}
            onClick={() => clickSelect(option.oid)}
          />
          <Text>{option.desc}</Text>
        </View>
      ))}
    </View>
  );
}

export default QuestionComponent;
