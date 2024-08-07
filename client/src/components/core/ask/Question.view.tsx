import {Button, Text, View} from '@tarojs/components';
import {QuestionData, QuestionStatus} from "@/components/core/ask/model/types";
import {observer} from "mobx-react-lite";

interface Props {

  questionData: QuestionData,
  questionAnswered: QuestionStatus,
  questionOptionChosen: {},

  onClickOption: (oid: string) => void
  onClickAffirm: () => void


}

const QuestionView = observer(({ questionData, questionAnswered, questionOptionChosen,
                        onClickOption, onClickAffirm}: Props) => {

  const hasChosenOption = Object.values(questionOptionChosen).some((selected) => selected);


  return (
    <View>
      <Text>{questionData.desc} - {questionAnswered.answered? '已答': '未答'}</Text>
      {questionData.options.map((option) => (
        <View key={option.oid}>
          <Text onClick={() => onClickOption(option.oid)}>{option.desc} - {questionOptionChosen[option.oid] ? 'true' : 'false'}</Text>
        </View>
      ))}
      {hasChosenOption && questionData.isMCQ && !questionAnswered.answered && <Button onClick={() =>onClickAffirm()}>确定</Button>}
    </View>
  );
})


export default QuestionView;
