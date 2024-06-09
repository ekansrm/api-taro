// import React from '@tarojs/react';
// import React from 'react';
import {Text, View} from '@tarojs/components';
import {QuestionProps} from "@/components/core/ask/model/types";
import QuestionStore from "@/components/core/ask/Question.store";
// import {Observer} from "mobx-react";
import {observer} from "mobx-react-lite";

interface Props {
  props: QuestionProps
  state: QuestionStore
  clickSelect: (oid: string) => void
}

const QuestionComponent = ({props, state, clickSelect}: Props) => {

  const {pick} = state;
  console.log("render QuestionComponent Component")

  return (
    <View>
      <Text>{props.desc}</Text>
      {props.options.map((option) => (
        <View key={option.oid}>
          {/*<Radio*/}
          {/*  checked={pick[option.oid]}*/}
          {/*  onClick={() => clickSelect(option.oid)}*/}
          {/*/>*/}
          <Text onClick={() => clickSelect(option.oid)}>{option.desc} - {pick[option.oid] ? 'true' : 'false'}</Text>
        </View>
      ))}
    </View>
  );
}

export default observer(QuestionComponent);

// @observer
// class QuestionComponent extends React.Component<Props> {
//   render() {
//     const {props, state, clickSelect} = this.props;
//     const {pick, token} = state;
//     console.log("render QuestionComponent Component")
//
//     return <Observer>{()=>(
//       <View>
//         <Text>{props.desc}</Text>
//         <Text>{token.get() ? 'true' : 'false'}</Text>
//         {props.options.map((option) => (
//           <View key={option.oid}>
//             {/*<Radio*/}
//             {/*  checked={pick[option.oid]}*/}
//             {/*  onClick={() => clickSelect(option.oid)}*/}
//             {/*/>*/}
//             <Text onClick={() => clickSelect(option.oid)}>{option.desc} - {pick[option.oid] ? 'true' : 'false'}</Text>
//           </View>
//         ))}
//       </View>
//     )}</Observer>;
//   }
// }
//
// export default QuestionComponent;
