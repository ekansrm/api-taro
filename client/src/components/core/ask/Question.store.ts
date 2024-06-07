import {action, computed, observable, ObservableMap} from 'mobx'

import {QuestionProps} from "@/components/core/ask/model/types";

class QuestionStore {

  @observable pick: ObservableMap<string, boolean> = observable.map({})

  @observable token = false

  @computed
  get pickA()  {
    const m = new Map()
    this.pick.forEach((v, k) => {
      m.set(k, v)
    })
    return m
  }

  @action.bound
  refresh(question: QuestionProps) {
    question.options.forEach((option) => {
      this.pick[option.oid] = true
    })
  }

  @action.bound
  clickSelect(oid: string) {
    this.pick[oid] = !this.pick[oid]
    this.token = !this.token
  }

}

export default QuestionStore;
