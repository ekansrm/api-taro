import {QuestionProps} from "@/components/core/ask/model/types";
import QuestionComponent from "@/components/core/ask/Question.component";
import QuestionStore from "@/components/core/ask/Question.store";
import {observer} from "mobx-react";

interface Props {
  question: QuestionProps
}

const store = QuestionStore()

const clickSelect = (oid: string) => {
  store.clickSelect(oid);
  console.log(oid, store.pick)
}

const Question = ({question}: Props) => {


  store.refresh(question);


  const {pick} = store;

  return  observer( () =>(
    <QuestionComponent
      clickSelect={clickSelect}
      pick={pick}
      question={question}
    />
  ));
};

export default Question;
