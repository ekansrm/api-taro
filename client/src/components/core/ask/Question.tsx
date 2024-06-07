import {QuestionProps} from "@/components/core/ask/model/types";
import QuestionStore from "@/components/core/ask/Question.store";
import QuestionComponent from "@/components/core/ask/Question.component";
import {Observer} from "mobx-react";

interface Props {
  question: QuestionProps,
}


const Question = ({question}: Props) => {

  const store = new QuestionStore()

  store.refresh(question);
  // store.refresh(question);

  const clickSelect = (oid: string) => {
    store.clickSelect(oid);
    console.log(store)
    // console.log('isObservable(store.token)', isObservable(store.token))
    // console.log('isObservable(token)', isObservable(token))
    // console.log('isObservable(store.pick)', isObservable(store.pick))
    // console.log('isObservable(pick)', isObservable(pick))
  }

  console.log("render Question Component")

  return  <Observer>{()=>(
    <QuestionComponent
      state={store}
      props={question}
      clickSelect={clickSelect}
    />
  )}</Observer>;
};

export default Question;
