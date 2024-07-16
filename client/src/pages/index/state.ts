import {makeAutoObservable} from "mobx";
import {QuestionData} from "@/components/core/ask/model/types";

class State {

  constructor() {
    makeAutoObservable(this)
  }

  questions: QuestionData[] = []

  updateQuestions(questions: QuestionData[]) {
    this.questions.slice(0)
    this.questions.push(...questions)
  }


}

export default State
