import {QuestionData} from "@/components/core/ask/model/types";
import QuestionState from "@/components/core/ask/Question.state";
import QuestionView from "@/components/core/ask/Question.view";
import {observer} from "mobx-react-lite";

interface Props {
  question: QuestionData,
  answered: boolean,
  clickAnswer: () => void,
  selectedOption: {[oid: string]: boolean},
  selectOption: (oid: String) => void,
}

const QuestionObserver = observer(QuestionView)


const Question = ({question, clickAnswer, selectOption, selectedOption, answered}: Props) => {

  const store = new QuestionState()

  store.refresh(question);
  store.initial(selectedOption);
  // store.refresh(question);

  const clickSelect = (oid: string) => {
    store.clickSelect(oid);
    selectOption(oid)
  }
  const {pick} = store

  // console.log("render QuestionIndex Component")

  return  (
    <QuestionObserver
      qid={question.qid}
      desc={question.desc}
      options={question.options}
      multiSelection={question.multiSelection}
      optionSelected={pick}
      clickSelect={clickSelect}
      answered={answered}
      clickAnswer={clickAnswer}
    />
  )
  // return (<Observer>{()=><QuestionView
  //   desc={question.desc} optionSelected={pick} options={question.options} qid={question.qid}
  //   clickSelect={clickSelect}
  // />}</Observer>)
};

export default Question;
