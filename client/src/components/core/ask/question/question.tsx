import {useState} from "react";
import { View, Text, Radio } from '@tarojs/components';

// interface Question {
//   title: string;
//   type: 'single' | 'multiple';
//   options: string[];
// }

const QuestionComponent = ({ question}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionSelect = (option: string) => {
    if (question.type === 'single') {
      setSelectedOptions([option]);
    } else {
      const index = selectedOptions.indexOf(option);
      if (index === -1) {
        setSelectedOptions([...selectedOptions, option]);
      } else {
        setSelectedOptions([
          ...selectedOptions.slice(0, index),
          ...selectedOptions.slice(index + 1),
        ]);
      }
    }
  };

  return (
    <View>
      <Text>{question.title}</Text>
      {question.options.map((option) => (
        <View key={option}>
            <Radio
              checked={selectedOptions[0] === option}
              onClick={() => handleOptionSelect(option)}
            />
          <Text>{option}</Text>
        </View>
      ))}
    </View>
  );
};

export default QuestionComponent;
