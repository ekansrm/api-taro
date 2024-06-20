import {View} from "@tarojs/components";

import {QuestionData} from "@/components/core/ask/model/types";
import React from "react";

interface Props {

  questionDataList: QuestionData[];

  questionPackBuilder: (question: QuestionData) => React.ReactNode;

}


const QuestView = ({ questionDataList, questionPackBuilder}: Props) => {
  return (
    <View>
      {questionDataList.map((question) => (
        questionPackBuilder(question)
      ))}
    </View>
  );
};

export default QuestView;
