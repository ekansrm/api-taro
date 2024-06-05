import React from 'react';
import {View} from "@tarojs/components";
import {QuestProps} from "@/components/core/ask/model/types";
import Question from '@/components/core/ask/Question';

const Quest: React.FC<QuestProps> = ({ questions }) => {
  return (
    <View>
      {questions.map((question) => (
        <View key={question.qid}>
            <Question qid={question.qid} desc={question.desc} options={question.options} />
        </View>
      ))}
    </View>
  );
};

export default Quest;
