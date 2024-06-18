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

  initial(optionSeleted: {[oid: string]: boolean}) {
    Object.keys(optionSeleted).forEach((oid) => {
      this.pick[oid] = optionSeleted[oid]
    });
  }

  clickSelect(oid: string) {
    this.pick[oid] = !this.pick[oid]
  }

}

export default QuestionState;
