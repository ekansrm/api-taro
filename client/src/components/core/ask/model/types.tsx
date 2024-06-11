export interface QuestionData {
  qid: string;
  desc: string;
  options: QuestionOptionData[];

}

export interface QuestionOptionData {
  oid: string;
  desc: string;
}

export interface QuestData {
  questions: QuestionData[];
}
