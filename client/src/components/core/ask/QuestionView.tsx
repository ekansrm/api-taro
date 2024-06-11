import {Text, View} from '@tarojs/components';
import {QuestionOptionData} from "@/components/core/ask/model/types";

interface Props {
  qid: string;
  desc: string;
  options: QuestionOptionData[];
  optionSelected: {[oid: string]: boolean};
  clickSelect: (oid: string) => void
}

const QuestionView = ({desc, options, optionSelected, clickSelect}: Props) => {

  console.log("render QuestionView Component")

  return (
    <View>
      <Text>{desc}</Text>
      {options.map((option) => (
        <View key={option.oid}>
          {/*<Radio*/}
          {/*  checked={pick[option.oid]}*/}
          {/*  onClick={() => clickSelect(option.oid)}*/}
          {/*/>*/}
          <Text onClick={() => clickSelect(option.oid)}>{option.desc} - {optionSelected[option.oid] ? 'true' : 'false'}</Text>
        </View>
      ))}
    </View>
  );
}

export default QuestionView;
