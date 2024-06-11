import {QuestionProps} from "@/components/core/ask/model/types";
import QuestionState from "@/components/core/ask/QuestionState";
import QuestionView from "@/components/core/ask/QuestionView";
import {observer} from "mobx-react-lite";

interface Props {
  question: QuestionProps,
}

const QuestionObserver = observer(QuestionView)

const Question = ({question}: Props) => {

  const store = new QuestionState()

  store.refresh(question);
  // store.refresh(question);

  const clickSelect = (oid: string) => {
    store.clickSelect(oid);
  }
  const {pick} = store

  console.log("render Question Component")

  return  (
    <QuestionObserver
      desc={question.desc} optionSelected={pick} options={question.options} qid={question.qid}
      clickSelect={clickSelect}
    />
  )
  // return (<Observer>{()=><QuestionView
  //   desc={question.desc} optionSelected={pick} options={question.options} qid={question.qid}
  //   clickSelect={clickSelect}
  // />}</Observer>)
};

export default Question;
