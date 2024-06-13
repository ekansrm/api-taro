import {QuestionData} from "@/components/core/ask/model/types";
import QuestionState from "@/components/core/ask/Question.state";
import QuestionView from "@/components/core/ask/Question.view";
import {observer} from "mobx-react-lite";

interface Props {
  question: QuestionData,
  answered: boolean
}

const QuestionObserver = observer(QuestionView)


const Question = ({question, answered}: Props) => {

  const store = new QuestionState()

  store.refresh(question);
  // store.refresh(question);

  const clickSelect = (oid: string) => {
    store.clickSelect(oid);
  }
  const {pick} = store

  console.log("render QuestionIndex Component")

  return  (
    <QuestionObserver
      qid={question.qid}
      desc={question.desc}
      options={question.options}
      multiSelection={question.multiSelection}
      optionSelected={pick}
      clickSelect={clickSelect}
      answered={answered}
    />
  )
  // return (<Observer>{()=><QuestionView
  //   desc={question.desc} optionSelected={pick} options={question.options} qid={question.qid}
  //   clickSelect={clickSelect}
  // />}</Observer>)
};

export default Question;
