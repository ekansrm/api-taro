import {makeAutoObservable, observable} from 'mobx'

import {QuestionProps} from "@/components/core/ask/model/types";

class QuestionStore {

  constructor() {
    makeAutoObservable(this)
  }

  // pick: ObservableMap<string, boolean> = observable.map({})
  pick = {}

  token = observable.box(false)

  refresh(question: QuestionProps) {
    question.options.forEach((option) => {
      this.pick[option.oid] = true
    })
  }

  clickSelect(oid: string) {
    this.pick[oid] = !this.pick[oid]
    this.token.set(!this.token)
  }

}

export default QuestionStore;
