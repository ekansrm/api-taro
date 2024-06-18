import {makeAutoObservable} from "mobx";


class QuestState {

  constructor() {
    makeAutoObservable(this);
  }

  answered: {[qid:string]: boolean} = {};

  optionSelected: {[qid:string]:{[oid:string]:boolean}} = {};

  selectOption(qid: string, oid: string) {
    if(this.optionSelected[qid] === undefined) {
      this.optionSelected[qid] = {};
    }
    this.optionSelected[qid][oid] = !this.optionSelected[qid][oid];
  }

  initAnswered(qidList: string[]) {
    qidList.forEach(qid => {
      this.answered[qid] = false;
    });
  }

  answer(qid: string) {
    this.answered[qid] = true;
    console.log(this.answered)
  }

  retract(qid: string) {
    this.answered[qid] = false;
  }

}

export default QuestState;
