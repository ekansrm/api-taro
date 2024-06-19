import {View} from "@tarojs/components";

import {QuestionData} from "@/components/core/ask/model/types";
import React from "react";

interface QuestionPack {

  questionView: React.ReactNode;

}

interface Props {

  questionDataList: QuestionData[];
  
  questionPackBuilder: (question: QuestionData) => QuestionPack;

}


const QuestView = ({ questionDataList, questionPackBuilder}: Props) => {
  return (
    <View>
      {questionDataList.map((question) => (
        questionPackBuilder(question).questionView
      ))}
    </View>
  );
};

export default QuestView;
