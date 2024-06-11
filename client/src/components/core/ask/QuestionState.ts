import {makeAutoObservable, observable} from 'mobx'

import {QuestionData} from "@/components/core/ask/model/types";

class QuestionState {

  constructor() {
    makeAutoObservable(this)
  }

  // pick: ObservableMap<string, boolean> = observable.map({})
  pick = {}

  token = observable.box(false)

  refresh(question: QuestionData) {
    question.options.forEach((option) => {
      this.pick[option.oid] = true
    })
  }

  clickSelect(oid: string) {
    this.pick[oid] = !this.pick[oid]
    this.token.set(!this.token)
  }

}

export default QuestionState;
