import {View} from "@tarojs/components";
import Question from '@/components/core/ask/Question.index';

const Quest = ({ questions }) => {
  return (
    <View>
      {questions.map((question) => (
        <View key={question.qid}>
            <Question question={question} answered={false} />
        </View>
      ))}
    </View>
  );
};

export default Quest;
