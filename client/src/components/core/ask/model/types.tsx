export interface QuestionProps {
  qid: string;
  desc: string;
  options: QuestionOptionProps[];

}

export interface QuestionOptionProps {
  oid: string;
  desc: string;
}

export interface QuestProps {
  questions: QuestionProps[];
}
