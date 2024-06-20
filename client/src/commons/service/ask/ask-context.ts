import {Question} from "@/commons/model/ask/question";
import {PropertyValue} from "@/commons/model/ask/property";

export class AskContext {

  // 问题集合, {qid: QuestionIndex}
  questions: { [qid: string]: Question } = {}

  // 属性集合, {pid: PropertyValue}
  propertyPool: { [pid: string]: PropertyValue } = {}

  // 属性集合历史
  propertyPoolHistory: { [qNum: string]: { [pid: string]: PropertyValue } } = {}

  // 回答次序， [qid]
  questionAnsweredOrder: { [qid: string]: number } = {}

  // 回答选项， {qid: [oid]}
  questionOptionChosen: { [qid: string]: string } = {}

}
