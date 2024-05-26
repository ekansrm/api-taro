import { Question } from '@/commons/model/ask/question';

/**
 * 处理回答，对属性集合进行变更
 * @param properties 属性集合
 * @param questions 问题集合
 * @param qid 回答的问题 ID
 * @param answer 选择的选项
 */
export function handleAnswer(properties: Map<string, number>, questions: Question[], qid: string, answer: string): void {
  const question = questions.find((q) => q.qid === qid);
  if (!question) {
    throw new Error(`Question with ID ${qid} not found`);
  }

  const option = question.options.find((o) => o.oid === answer);
  if (!option) {
    throw new Error(`Option with ID ${answer} not found for question ${qid}`);
  }

  // 更新属性集合
  option.propertyFunctions.forEach((pf) => {
    const currentValue = properties.get(pf.pid) ?? 0;
    const newValue = pf.evaluate(currentValue);
    properties.set(pf.pid, newValue);
  });

  // 更新命中属性和使用属性
  question.propertyHit.forEach((pid) => {
    properties.set(pid, (properties.get(pid) ?? 0) + 1);
  });
  question.propertyUse.forEach((pid) => {
    properties.set(pid, (properties.get(pid) ?? 0) + 1);
  });

  // 更新属性块
  question.propertyBlocks.forEach((pe) => {
    const currentValue = properties.get(pe.pid) ?? 0;
    const newValue = pe.evaluate(currentValue);
    properties.set(pe.pid, newValue);
  });

  // 更新偏好属性
  question.propertyPrefer.forEach((pe) => {
    const currentValue = properties.get(pe.pid) ?? 0;
    const newValue = pe.evaluate(currentValue);
    properties.set(pe.pid, newValue);
  });
}