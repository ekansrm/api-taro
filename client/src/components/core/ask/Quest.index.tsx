import Question from '@/components/core/ask/Question.index';
import {QuestionData} from "@/components/core/ask/model/types";
import QuestView from "@/components/core/ask/Quest.view";
import QuestState from "@/components/core/ask/Quest.state";
import {observer} from "mobx-react-lite";

interface Props {
  questionDataList: QuestionData[];
}

const QuestObserver = observer(QuestView);

const Quest = ({ questionDataList }: Props) => {

  const qidList = questionDataList.map(q => q.qid);

  const questState = new QuestState();

  questState.init(qidList);

  const questionDict: {[qid:string]: QuestionData} = questionDataList.reduce(
    (acc, q) => {
      acc[q.qid] = q;
      return acc;
    }, {}
  );

  // 需要在这包一下，不然会访问不到 store
  const questionAffirmHandler = (qid: string) => {
    questState.setQuestionAnswered(qid, true);
  }

  const clickOption = (qid: string, oid: string) => {

    if(questState.questionOptionChosen[qid][oid]){
      questState.setQuestionOptionChosen(qid, oid, false);
    } else {
      questState.setQuestionOptionChosen(qid, oid, true);
    }

    if(!questState.questionAnswered[qid]){
      if(!questionDict[qid].isMCQ){
        questState.setQuestionAnswered(qid, true);
      }
    }
    if(questState.questionAnswered[qid]){
      if(questionDict[qid].isMCQ){
        questState.setQuestionAnswered(qid, false)
      }

    }
  }

  const {questionAnswered, questionOptionChosen} = questState;

  return (
    <QuestObserver
      questionDataList={questionDataList}
      questionPackBuilder={
        (question) => {
          return {
            questionView: <Question
              questionData={question}
              questionAnswered={questionAnswered[question.qid]}
              questionOptionChosen={questionOptionChosen[question.qid]}
              onClickQuestionAffirm={() => questionAffirmHandler(question.qid)}
              onClickQuestionOption={(oid:string) => {clickOption(question.qid, oid)}}
            />,
          }
        }
      }
    />
  );
};

export default Quest;
