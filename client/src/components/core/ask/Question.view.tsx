import {Button, Text, View} from '@tarojs/components';
import {QuestionOptionData} from "@/components/core/ask/model/types";

interface Props {

  qid: string;
  desc: string;
  options: QuestionOptionData[];
  multiSelection: boolean;

  optionSelected: {[oid: string]: boolean};
  clickSelect: (oid: string) => void

  answered: boolean

}

const QuestionView = ({desc, options, multiSelection, optionSelected, clickSelect, answered}: Props) => {

  console.log("render QuestionView Component")
  const hasSelectedOption = Object.values(optionSelected).some((selected) => selected);


  return (
    <View>
      <Text>{desc} - {answered? '已答': '未答'}</Text>
      {options.map((option) => (
        <View key={option.oid}>
          {/*<Radio*/}
          {/*  checked={pick[option.oid]}*/}
          {/*  onClick={() => clickSelect(option.oid)}*/}
          {/*/>*/}
          <Text onClick={() => clickSelect(option.oid)}>{option.desc} - {optionSelected[option.oid] ? 'true' : 'false'}</Text>
        </View>
      ))}
      {hasSelectedOption && multiSelection && !answered && <Button>确定</Button>}
    </View>
  );
}

export default QuestionView;