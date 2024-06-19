import {makeAutoObservable} from "mobx";


class QuestState {

  constructor() {
    makeAutoObservable(this);
  }

  questionAnswered: {[qid:string]: boolean} = {};

  questionOptionChosen: {[qid:string]:{[oid:string]:boolean}} = {};

  init(qidList: string[]) {
    qidList.forEach(qid => {
      this.questionAnswered[qid] = false;
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
  }

}

export default QuestState;
