export interface QuestionData {
  qid: string;
  desc: string;
  options: QuestionOptionData[];
  isMCQ: boolean,

}

export interface QuestionOptionData {
  oid: string;
  desc: string;
}
