import {makeAutoObservable} from 'mobx'

import {QuestionData} from "@/components/core/ask/model/types";

class QuestionState {

  constructor() {
    makeAutoObservable(this)
  }

  // pick: ObservableMap<string, boolean> = observable.map({})
  pick = {}

  refresh(question: QuestionData) {
    question.options.forEach((option) => {
      this.pick[option.oid] = false
    })
  }

  clickSelect(oid: string) {
    this.pick[oid] = !this.pick[oid]
  }

}

export default QuestionState;
