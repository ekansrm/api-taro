import {useState} from "react";
import {Radio, Text, View} from '@tarojs/components';
import {QuestionProps} from "@/components/core/ask/model/types";


function Question({desc, options}: QuestionProps) {

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionSelect = (oid: string) => {
      const index = selectedOptions.indexOf(oid);
      if (index === -1) {
        setSelectedOptions([...selectedOptions, oid]);
      } else {
        setSelectedOptions([
          ...selectedOptions.slice(0, index),
          ...selectedOptions.slice(index + 1),
        ]);
      }
  };

  return (
    <View>
      <Text>{desc}</Text>
      {options.map((option) => (
        <View key={option.oid}>
            <Radio
              checked={selectedOptions[0] === option.oid}
              onClick={() => handleOptionSelect(option.oid)}
            />
          <Text>{option.desc}</Text>
        </View>
      ))}
    </View>
  );
}

export default Question;
