import { observable } from 'mobx'

import {QuestionProps} from "@/components/core/ask/model/types";

const QuestionStore =() =>{

  return observable({

    question: {},

    pick: {},

    refresh(question: QuestionProps) {
      this.question = question
      this.pick = {}
      question.options.forEach((option) => {
        this.pick[option.oid] = false
      })
    },

    clickSelect(oid: string) {
      this.pick[oid] = !this.pick[oid]
    }

  })

}

export default QuestionStore;
