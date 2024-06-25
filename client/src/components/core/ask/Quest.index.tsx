import Question from '@/components/core/ask/Question.index';
import {QuestionData} from "@/components/core/ask/model/types";
import QuestView from "@/components/core/ask/Quest.view";
import QuestState from "@/components/core/ask/Quest.state";

interface Props {
  questionDataList: QuestionData[];
}

const Quest = ({ questionDataList }: Props) => {

  console.log('状态不拆分')

  const questState = new QuestState();

  const {questionAnswered, questionOptionChosen} = questState;

  const qidList = questionDataList.map(q => q.qid);

  const questionDict: {[qid:string]: QuestionData} = questionDataList.reduce(
    (acc, q) => {
      acc[q.qid] = q;
      return acc;
    }, {}
  );


  questState.init(qidList);

  // 需要在这包一下，不然会访问不到 store
  const questionAffirmHandler = (qid: string) => {
    questState.setQuestionAnswered(qid, true);
  }

  const questionOptionClickHandler = (qid: string, oid: string) => {

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
      } else {
        if(!questState.questionOptionChosen[qid][oid]){
          questState.setQuestionAnswered(qid, false)
        }
      }

    }
  }

  const questionPackBuilder = (question: QuestionData) => {

    return <Question
      questionData={question}
      questionAnswered={questionAnswered[question.qid]}
      questionOptionChosen={questionOptionChosen[question.qid]}
      onClickQuestionAffirm={() => questionAffirmHandler(question.qid)}
      onClickQuestionOption={(oid:string) => {questionOptionClickHandler(question.qid, oid)}}
    />;
  }

  return (
    <QuestView
      questionDataList={questionDataList}
      questionPackBuilder={questionPackBuilder}
    />
  );
};

export default Quest;
