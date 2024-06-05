import {QuestionProps} from "@/components/core/ask/model/types";
import QuestionStore from "@/components/core/ask/Question.store";
import QuestionComponent from "@/components/core/ask/Question.component";

interface Props {
  question: QuestionProps
}

const Question = ({question}: Props) => {

  const store = new QuestionStore();
  store.refresh(question);

  const clickSelect = (oid: string) => {
    store!.clickSelect(oid);
    console.log(oid)
  }

  return  (
    <QuestionComponent
      clickSelect={clickSelect}
      pick={store.pick}
      question={question}
    >
    </QuestionComponent>
  );
};

export default Question;
