import { Question } from '@/commons/model/ask/question';
import {
  PropertyType,
  PropertyValue,
  PropertyEvaluator,
  PropertyComparator,
  PropertyFunction,
  PropertyOperator
} from '@/commons/model/ask/property';
import {size} from "lodash";


export class AskContext {

  // 问题集合, {qid: Question}

  question: {[qid: string]: Question} = {}

  // 属性集合, {pid: PropertyValue}
  propertyCache: {[pid: string]: PropertyValue} = {}

  propertyCacheHistory: {[qNum: string]: {[pid: string]: PropertyValue}} = {}

  // 回答次序， [qid]

  questionLog: {[qid: string]: number} = {}

  // 回答选项， {qid: [oid]}

  questionAnswer: {[qid: string]: string} = {}

}

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
    if( property.operator === PropertyComparator.EMPTY) {
      return true;
    }
    return false;
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

function proertyEvaluateWeight(propertyCache: {[pid: string]: PropertyValue}, evaluatorList: PropertyEvaluator[]): number {

  var totalWeight = 0;
  evaluatorList.map(evaluator =>{

    var proertyValue = propertyCache[evaluator.pid];
    if(evaluateProperty(evaluator, proertyValue)) {
      totalWeight += evaluator.weight;
    }

  })
  return totalWeight;
}

// function proertyEvaluateHit(propertyCache: {[pid: string]: PropertyValue}, evaluatorList: PropertyEvaluator[]): boolean {
//   // 遍历属性 evaluatorList, 如果存在一个 evaluateProperty(evaluator, proertyValue)为 true, 就马上返回 true
//
//   for (const evaluator of evaluatorList) {
//     var proertyValue = propertyCache[evaluator.pid];
//     if(evaluateProperty(evaluator, proertyValue)) {
//       return true;
//     }
//   }
//   return false;
//
// }


function evalueteQuestion( propertyCache: {[pid: string]: PropertyValue}, quesion: Question): {
  prefer: number;
  blocks: number
} {

  var weightBlock = proertyEvaluateWeight(propertyCache, quesion.propertyBlocks);
  var weightPrefer = proertyEvaluateWeight(propertyCache, quesion.propertyPrefer);

  return {
    blocks: weightBlock,
    prefer: weightPrefer
  }

}

// 获取下一个问题
export function route(context: AskContext): string  {

  // 遍历所有问题，找到优先级最高的问题，且没有被 Block 的，返回该问题 ID
  var qid: string = '';
  var maxWeight: number = 0;

  for (const question of Object.values(context.question)) {
    var rst: {blocks: number, prefer:number, }  = evalueteQuestion(context.propertyCache, question);

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
  for (const [qid, qNum2] of Object.entries(context.questionLog)) {
    if(qNum2 > qNum) {
      delete context.questionLog[qid];
      delete context.questionAnswer[qid];
      delete context.propertyCacheHistory[qNum2]
    }
  }

  // 恢复属性池

  context.propertyCache = context.propertyCacheHistory[qNum];

}


export function evaluate(context: AskContext, qid: string, oid: string): void {

  // 获取问题
  var question = context.question[qid];

  // 获取回答选项
  var options = question.options;

  // 根据 oid, 找出 QuestionOption
  var option = options.find((e) => e.oid === oid);

  if (option == null) {
    return
  }

  // 逐个处理属性操作
  for (const propertyFunction of option.propertyFunctions) {
    var oldPropertyValue = context.propertyCache[propertyFunction.pid];
    var newPropertyValue = processPropertyFunction(propertyFunction, oldPropertyValue);
    context.propertyCache[propertyFunction.pid] = newPropertyValue;
  }

  // 记录回答次序
  context.questionLog[qid] = size(context.questionLog) + 1;

  context.questionAnswer[qid] = oid;

}



