import {QuestionProps} from "@/components/core/ask/model/types";
import QuestionStore from "@/components/core/ask/Question.store";
import QuestionComponent from "@/components/core/ask/Question.component";
import {observer} from "mobx-react-lite";

interface Props {
  question: QuestionProps,
}

const QuestionComponent2 = observer(QuestionComponent)

const Question = ({question}: Props) => {

  const store = new QuestionStore()

  store.refresh(question);
  // store.refresh(question);

  const clickSelect = (oid: string) => {
    store.clickSelect(oid);
  }
  const {pick} = store

  console.log("render Question Component")

  return  (
    <QuestionComponent2
      desc={question.desc} optionSelected={pick} options={question.options} qid={question.qid}
      clickSelect={clickSelect}
    />
  )
};

export default Question;
