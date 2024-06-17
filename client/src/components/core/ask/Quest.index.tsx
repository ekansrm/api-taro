import Question from '@/components/core/ask/Question.index';
import {QuestionData} from "@/components/core/ask/model/types";
import QuestView from "@/components/core/ask/Quest.view";

interface Props {
  questions: QuestionData[];
}


const Quest = ({ questions }: Props) => {
  return (
    <QuestView
      questionDataList={questions}
      questionPackBuilder={
        (question) => {
          return {
            questionView: <Question question={question}  answered={false} />,
          }
        }
      }
    />
  );
};

export default Quest;
