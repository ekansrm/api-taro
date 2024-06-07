import {View} from "@tarojs/components";
import Question from '@/components/core/ask/Question';

const Quest = ({ questions }) => {
  return (
    <View>
      {questions.map((question) => (
        <View key={question.qid}>
            <Question question={question} />
        </View>
      ))}
    </View>
  );
};

export default Quest;
