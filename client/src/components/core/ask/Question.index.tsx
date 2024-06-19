import {QuestionData} from "@/components/core/ask/model/types";
import QuestionState from "@/components/core/ask/Question.state";
import QuestionView from "@/components/core/ask/Question.view";
import {observer} from "mobx-react-lite";

interface Props {
  questionData: QuestionData,
  questionAnswered: boolean,
  questionOptionChosen: {[oid: string]: boolean},
  onClickQuestionAffirm: () => void,
  onClickQuestionOption: (oid: String) => void,
}

const QuestionObserver = observer(QuestionView)


const buildOptionChosenInitial = (optionChosen: { [oid: string]: boolean }, questionData: QuestionData) => {

  const rst = {}
  questionData.options.forEach((option) => {
    if(optionChosen[option.oid]){
      rst[option.oid] = optionChosen[option.oid]
    } else {
      rst[option.oid] = false
    }
  });
  return rst
}

const Question = ({questionData, questionOptionChosen, questionAnswered, onClickQuestionAffirm, onClickQuestionOption, }: Props) => {
  const intactQuestionOptionChosenInit  = buildOptionChosenInitial(questionOptionChosen, questionData)

  const store = new QuestionState()
  store.init(intactQuestionOptionChosenInit);

  const clickOptionHandler = (oid: string) => {
    store.clickOption(oid);
    onClickQuestionOption(oid)
  }

  const {optionChosen} = store

  return  (
    <QuestionObserver
      questionData={questionData}
      questionOptionChosen={optionChosen}
      questionAnswered={questionAnswered}
      onClickOption={clickOptionHandler}
      onClickAffirm={onClickQuestionAffirm}
    />
  )
  // return (<Observer>{()=><QuestionView
  //   desc={question.desc} optionSelected={pick} options={question.options} qid={question.qid}
  //   clickSelect={clickSelect}
  // />}</Observer>)
};

export default Question;
