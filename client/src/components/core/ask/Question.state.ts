import {makeAutoObservable} from 'mobx'

import {QuestionData} from "@/components/core/ask/model/types";

class QuestionState {

  constructor() {
    makeAutoObservable(this)
  }

  // pick: ObservableMap<string, boolean> = observable.map({})
  optionChosen = {}

  refresh(question: QuestionData) {
    question.options.forEach((option) => {
      this.optionChosen[option.oid] = false
    })
  }

  init(optionChosen: {[oid: string]: boolean}) {
    Object.keys(optionChosen).forEach((oid) => {
      this.optionChosen[oid] = optionChosen[oid]
    });
  }

  clickOption(oid: string) {
    this.optionChosen[oid] = !this.optionChosen[oid]
  }

}

export default QuestionState;
