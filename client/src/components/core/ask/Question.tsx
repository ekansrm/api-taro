import {QuestionProps} from "@/components/core/ask/model/types";
import QuestionStore from "@/components/core/ask/Question.store";
import QuestionComponent from "@/components/core/ask/Question.component";
import {observer} from "mobx-react";

interface Props {
  question: QuestionProps
}

const Question = ({question}: Props) => {

  const store = new QuestionStore()

  store.refresh(question);

  const clickSelect = (oid: string) => {
    store!.clickSelect(oid);
    console.log(oid)
  }

  return observer(() =>(
    <QuestionComponent
      clickSelect={clickSelect}
      pick={store.pick}
      question={question}
    />
  ));
};

export default Question;
