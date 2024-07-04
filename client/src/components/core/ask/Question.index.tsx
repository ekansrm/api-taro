import {QuestionData, QuestionStatus} from "@/components/core/ask/model/types";
// import QuestionState from "@/components/core/ask/Question.state";
import QuestionView from "@/components/core/ask/Question.view";

interface Props {
  questionData: QuestionData,
  questionAnswered: QuestionStatus,
  questionOptionChosen: {[oid: string]: boolean},
  onClickQuestionAffirm: () => void,
  onClickQuestionOption: (oid: String) => void,
}

const Question = ({questionData, questionOptionChosen, questionAnswered, onClickQuestionAffirm, onClickQuestionOption, }: Props) => {

  // const store = new QuestionState()
  // const {optionChosen} = store;
  // const {optionChosen} = store

  // const intactQuestionOptionChosenInit  = buildOptionChosenInitial(questionOptionChosen, questionData)
  // store.init(intactQuestionOptionChosenInit);

  // const clickOptionHandler = (oid: string) => {
  //   // store.clickOption(oid);
  //   onClickQuestionOption(oid)
  // }

  return  (
    <QuestionView
      questionData={questionData}
      questionOptionChosen={questionOptionChosen}
      questionAnswered={questionAnswered}
      onClickOption={onClickQuestionOption}
      onClickAffirm={onClickQuestionAffirm}
    />
  )
};
//
// const buildOptionChosenInitial = (optionChosen: { [oid: string]: boolean }, questionData: QuestionData) => {
//
//   const rst = {}
//   questionData.options.forEach((option) => {
//     if(optionChosen[option.oid]){
//       rst[option.oid] = optionChosen[option.oid]
//     } else {
//       rst[option.oid] = false
//     }
//   });
//   return rst
// }

export default Question;
