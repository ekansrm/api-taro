import {makeAutoObservable} from "mobx";
import {AskContext} from "@/commons/service/ask/ask-context";
import {Question} from "@/commons/model/ask/question";
import {route} from "@/commons/service/ask/ask-engine";
import {QuestionStatus} from "@/components/core/ask/model/types";


class QuestState {

  constructor() {
    makeAutoObservable(this);
  }

  context: AskContext = {
    questions: {},
    propertyPool: [],
    questionOptionChosen: {},
    questionAnsweredOrder: [],
  };

  loadQuestions(questions: Question[]) {
    questions.forEach(question => {
      this.context.questions[question.qid] = question;
      this.questionAnswered[question.qid] = false;
      this.questionOptionChosen[question.qid] = {};
    });
  }

  get questionOptionChosenN() {return this.context.questionOptionChosen}

  get questCurrent() {
    // 按顺序列出已回答的问题
    const questions: Question[] = []

    const pendingQuestionId = route(this.context);
    if(pendingQuestionId !== '') {
      questions.push(this.context.questions[pendingQuestionId]);
    }
    return questions;

  }

  questionAnswered: {[qid:string]: boolean} = {};
  questionStatusMap: {[qid:string]: QuestionStatus} = {};

  questionOptionChosen: {[qid:string]:{[oid:string]:boolean}} = {};

  init(qidList: string[]) {
    qidList.forEach(qid => {
      this.questionAnswered[qid] = false;
      this.questionStatusMap[qid] = {answered: false};
      this.questionOptionChosen[qid] = {};
    });
  }

  setQuestionOptionChosen(qid: string, oid: string, value: boolean) {
    if(this.questionOptionChosen[qid] === undefined) {
      this.questionOptionChosen[qid] = {};
    }
    this.questionOptionChosen[qid][oid] = value;
  }

  setQuestionAnswered(qid: string, value: boolean) {
    this.questionAnswered[qid] = value;
    this.questionStatusMap[qid].answered = value;
  }

}

export default QuestState;
