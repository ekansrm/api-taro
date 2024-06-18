import Question from '@/components/core/ask/Question.index';
import {QuestionData} from "@/components/core/ask/model/types";
import QuestView from "@/components/core/ask/Quest.view";
import QuestState from "@/components/core/ask/Quest.state";
import {observer} from "mobx-react-lite";

interface Props {
  questions: QuestionData[];
}


const QuestObserver = observer(QuestView);


const Quest = ({ questions }: Props) => {


  const questState = new QuestState();

  const qidList = questions.map(q => q.qid);

  const {answered, optionSelected} = questState;

  const questionDict: {[qid:string]: QuestionData} = questions.reduce(
    (acc, q) => {
      acc[q.qid] = q;
      return acc;
    }, {}
  );

  // 需要在这包一下，不然会访问不到 store
  const answer = (qid: string) => {
    questState.answer(qid);
  }

  const clickOption = (qid: string, oid: string) => {
    questState.selectOption(qid, oid);
    if(!questState.answered[qid]){
      if(!questionDict[qid].multiSelection){
        questState.answer(qid)
      }
    }
    if(questState.answered[qid]){
      if(questionDict[qid].multiSelection){
        questState.retract(qid)
      }

    }
  }

  questState.initAnswered(qidList);

  return (
    <QuestObserver
      questionDataList={questions}
      questionPackBuilder={
        (question) => {
          return {
            questionView: <Question
              question={question}
              answered={answered[question.qid]}
              clickAnswer={() => answer(question.qid)}
              selectOption={(oid:string) => {clickOption(question.qid, oid)}}
              selectedOption={optionSelected[question.qid]}
            />,
          }
        }
      }
    />
  );
};

export default Quest;
