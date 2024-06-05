import {makeAutoObservable, action} from 'mobx';
import {QuestionProps} from "@/components/core/ask/model/types";

class QuestionStore {

  question: QuestionProps
  pick: {[oid:string]: boolean}

  constructor() {
    makeAutoObservable(this)
  }

  @action
  refresh(question: QuestionProps) {
    this.question = question
    this.pick = {}
    question.options.forEach((option) => {
      this.pick[option.oid] = false
    })
  }

  @action
  clickSelect(oid: string) {
    this.pick[oid] = !this.pick[oid]
  }
}

export default QuestionStore;
