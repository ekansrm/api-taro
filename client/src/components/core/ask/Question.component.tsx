import {Text, View} from '@tarojs/components';
import {QuestionOptionProps} from "@/components/core/ask/model/types";

interface Props {
  qid: string;
  desc: string;
  options: QuestionOptionProps[];
  optionSelected: {[oid: string]: boolean};
  clickSelect: (oid: string) => void
}

const QuestionComponent = ({desc, options, optionSelected, clickSelect}: Props) => {

  console.log("render QuestionComponent Component")

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

export default QuestionComponent;
