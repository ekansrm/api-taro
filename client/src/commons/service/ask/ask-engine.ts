import {Question} from '@/commons/model/ask/question';
import {
  PropertyComparator,
  PropertyEvaluator,
  PropertyFunction,
  PropertyOperator,
  PropertyType,
  PropertyValue
} from '@/commons/model/ask/property';
import {size} from "lodash";
import {AskContext} from "@/commons/service/ask/ask-context";




function processPropertyFunction(func: PropertyFunction, value: PropertyValue): PropertyValue {
  switch (func.operator) {
    case PropertyOperator.APPEND:
      return PropertyValue.literalValue({ type: value.type, value: value.value + func.operands[0].value });
    case PropertyOperator.REMOVE:
      return PropertyValue.literalValue({ type: value.type, value: value.value.replace(func.operands[0].value, "") });
    case PropertyOperator.UNIQUE:
      const set = new Set(value.value.split(func.operands[0].value));
      return PropertyValue.literalValue({ type: value.type, value: Array.from(set).join(func.operands[0].value) });
    case PropertyOperator.ADD:
      const num1 = parseInt(value.value);
      const num2 = parseInt(func.operands[0].value);
      return PropertyValue.literalValue({ type: PropertyType.INTEGER, value: (num1 + num2).toString() });
    default:
      return value;
  }
}

function evaluateProperty(property: PropertyEvaluator, value: PropertyValue): boolean {

  // 如果属性值为空，且比较器为不存在, 返回 True
  if (value == null) {
    return property.operator === PropertyComparator.EMPTY;
  }

  switch (property.operator) {
    case PropertyComparator.EMPTY:
      return value.value === "";
    case PropertyComparator.NOT_EMPTY:
      return value.value !== "";
    case PropertyComparator.EQUAL:
      return value.value === property.operands[0].value;
    case PropertyComparator.NOT_EQUAL:
      return value.value !== property.operands[0].value;
    case PropertyComparator.INTERSECT:
      const set1 = new Set(value.value.split(","));
      const set2 = new Set(property.operands[0].value.split(","));
      for (const item of set1) {
        if (set2.has(item)) {
          return true;
        }
      }
      return false;
    case PropertyComparator.IN:
      return property.operands.some((operand) => operand.value === value.value);
    case PropertyComparator.NOT_IN:
      return property.operands.every((operand) => operand.value !== value.value);
    case PropertyComparator.CONTAIN:
      return value.value.includes(property.operands[0].value);
    case PropertyComparator.NOT_CONTAIN:
      return !value.value.includes(property.operands[0].value);
    case PropertyComparator.LESS:
      return parseInt(value.value) < parseInt(property.operands[0].value);
    case PropertyComparator.LESS_EQUAL:
      return parseInt(value.value) <= parseInt(property.operands[0].value);
    case PropertyComparator.GREATER:
      return parseInt(value.value) > parseInt(property.operands[0].value);
    case PropertyComparator.GREATER_EQUAL:
      return parseInt(value.value) >= parseInt(property.operands[0].value);
    case PropertyComparator.BETWEEN:
      const lowerBound = parseInt(property.operands[0].value);
      const upperBound = parseInt(property.operands[1].value);
      const valueNum = parseInt(value.value);
      return valueNum >= lowerBound && valueNum <= upperBound;
    case PropertyComparator.NOT_BETWEEN:
      const lowerBound2 = parseInt(property.operands[0].value);
      const upperBound2 = parseInt(property.operands[1].value);
      const valueNum2 = parseInt(value.value);
      return valueNum2 < lowerBound2 || valueNum2 > upperBound2;
    default:
      return false;
  }
}

function propertyEvaluateWeight(propertyCache: {[pid: string]: PropertyValue}, evaluatorList: PropertyEvaluator[]): number {

  var totalWeight = 0;
  evaluatorList.map(evaluator =>{

    var proertyValue = propertyCache[evaluator.pid];
    if(evaluateProperty(evaluator, proertyValue)) {
      totalWeight += evaluator.weight;
    }

  })
  return totalWeight;
}

function evaluateQuestion(propertyCache: {[pid: string]: PropertyValue}, question: Question): { prefer: number; blocks: number } {

  const weightBlock = propertyEvaluateWeight(propertyCache, question.propertyBlocks);
  const weightPrefer = propertyEvaluateWeight(propertyCache, question.propertyPrefer);

  return {
    blocks: weightBlock,
    prefer: weightPrefer
  }

}

export function route(context: AskContext): string  {

  // 遍历所有问题，找到优先级最高的问题，且没有被 Block 的，返回该问题 ID
  let qid: string = '';
  let maxWeight: number = 0;

  for (const question of Object.values(context.questions)) {
    const rst: {blocks: number, prefer:number, }  = evaluateQuestion(context.propertyPool, question);

    if(rst.blocks > 0){
      continue
    }

    if(rst.prefer > maxWeight) {
      maxWeight = rst.prefer;
      qid = question.qid;
    }

  }
  return qid;

}

export function rollback(context: AskContext, qNum: number): void {

  // 移除回答次序, questionLog[qid] > qNum 的值删除掉
  for (const [qid, qNum2] of Object.entries(context.questionAnsweredOrder)) {
    if(qNum2 > qNum) {
      delete context.questionAnsweredOrder[qid];
      delete context.questionOptionChosen[qid];
      delete context.propertyPoolHistory[qNum2]
      context.questionAnswered[qid] = false;
    }
  }

  // 恢复属性池

  context.propertyPool = context.propertyPoolHistory[qNum];

}

export function evaluate(context: AskContext, qid: string, oidList: string[]): void {

  // 获取问题
  const question = context.questions[qid];

  // 获取回答选项
  const options = question.options;

  oidList.forEach( (oid) => {
      // 根据 oid, 找出 QuestionOption
      const option = options.find((e) => e.oid === oid);

      if (option == null) {
        return
      }

      // 逐个处理属性操作
      for (const propertyFunction of option.propertyFunctions) {
        const oldPropertyValue = context.propertyPool[propertyFunction.pid];
        const newPropertyValue = processPropertyFunction(propertyFunction, oldPropertyValue);
        context.propertyPool[propertyFunction.pid] = newPropertyValue;
      }

    context.questionOptionChosen[qid][oid] = true;

    }

  )


  // 记录回答次序
  context.questionAnswered[qid] = true;
  context.questionAnsweredOrder[qid] = size(context.questionAnsweredOrder) + 1;


}



