import {Button, Text, View} from '@tarojs/components';
import {QuestionData} from "@/components/core/ask/model/types";
import QuestionState from "@/components/core/ask/Question.state";

interface Props {

  state: QuestionState,

  questionData: QuestionData,
  questionAnswered: boolean

  onClickOption: (oid: string) => void
  onClickAffirm: () => void


}

const QuestionView = ({ state, questionData, questionAnswered,
                        onClickOption, onClickAffirm}: Props) => {

  const hasChosenOption = Object.values(state.optionChosen).some((selected) => selected);


  return (
    <View>
      <Text>{questionData.desc} - {questionAnswered? '已答': '未答'}</Text>
      {questionData.options.map((option) => (
        <View key={option.oid}>
          <Text onClick={() => onClickOption(option.oid)}>{option.desc} - {state.optionChosen[option.oid] ? 'true' : 'false'}</Text>
        </View>
      ))}
      {hasChosenOption && questionData.isMCQ && !questionAnswered && <Button onClick={() =>onClickAffirm()}>确定</Button>}
    </View>
  );
}

export default QuestionView;
