import { PropertyEvaluator, PropertyFunction } from './property';

export class Question {
  qid: string;
  desc: string;
  options: QuestionOption[];
  propertyHit: string[];
  propertyUse: string[];
  propertyBlocks: PropertyEvaluator[];
  propertyPrefer: PropertyEvaluator[];

  constructor({
    qid,
    desc,
    options,
    propertyHit,
    propertyUse,
    propertyBlocks,
    propertyPrefer,
  }: {
    qid: string;
    desc: string;
    options: QuestionOption[];
    propertyHit: string[];
    propertyUse: string[];
    propertyBlocks: PropertyEvaluator[];
    propertyPrefer: PropertyEvaluator[];
  }) {
    this.qid = qid;
    this.desc = desc;
    this.options = options;
    this.propertyHit = propertyHit;
    this.propertyUse = propertyUse;
    this.propertyBlocks = propertyBlocks;
    this.propertyPrefer = propertyPrefer;
  }

  toMap(): {
    qid: string;
    desc: string;
    options: { oid: string; desc: string; propertyFunctions: { pid: string; operator: string; operands: { type: string; refer: boolean; value: string }[] }[] }[];
    propertyHit: string[];
    propertyUse: string[];
    propertyBlocks: { pid: string; operator: string; operands: { type: string; refer: boolean; value: string }[]; weight: number }[];
    propertyPrefer: { pid: string; operator: string; operands: { type: string; refer: boolean; value: string }[]; weight: number }[];
  } {
    return {
      qid: this.qid,
      desc: this.desc,
      options: this.options.map((e) => e.toMap()),
      propertyHit: this.propertyHit,
      propertyUse: this.propertyUse,
      propertyBlocks: this.propertyBlocks.map((e) => e.toMap()),
      propertyPrefer: this.propertyPrefer.map((e) => e.toMap()),
    };
  }

  static fromMap(map: {
    qid: string;
    desc: string;
    options: { oid: string; desc: string; propertyFunctions: { pid: string; operator: string; operands: { type: string; refer: boolean; value: string }[] }[] }[];
    propertyHit: string[];
    propertyUse: string[];
    propertyBlocks: { pid: string; operator: string; operands: { type: string; refer: boolean; value: string }[]; weight: number }[];
    propertyPrefer: { pid: string; operator: string; operands: { type: string; refer: boolean; value: string }[]; weight: number }[];
  }): Question {
    return new Question({
      qid: map.qid,
      desc: map.desc,
      options: map.options.map((e) => QuestionOption.fromMap(e)),
      propertyHit: map.propertyHit,
      propertyUse: map.propertyUse,
      propertyBlocks: map.propertyBlocks.map((e) => PropertyEvaluator.fromMap(e)),
      propertyPrefer: map.propertyPrefer.map((e) => PropertyEvaluator.fromMap(e)),
    });
  }
}

export class QuestionOption {
  oid: string;
  desc: string;
  propertyFunctions: PropertyFunction[];

  constructor({ oid, desc, propertyFunctions }: { oid: string; desc: string; propertyFunctions: PropertyFunction[] }) {
    this.oid = oid;
    this.desc = desc;
    this.propertyFunctions = propertyFunctions;
  }

  hitProperty(): string[] {
    return [...new Set(this.propertyFunctions.map((e) => e.pid))];
  }

  toMap(): {
    oid: string;
    desc: string;
    propertyFunctions: { pid: string; operator: string; operands: { type: string; refer: boolean; value: string }[] }[];
  } {
    return {
      oid: this.oid,
      desc: this.desc,
      propertyFunctions: this.propertyFunctions.map((e) => e.toMap()),
    };
  }

  static fromMap(map: {
    oid: string;
    desc: string;
    propertyFunctions: { pid: string; operator: string; operands: { type: string; refer: boolean; value: string }[] }[];
  }): QuestionOption {
    return new QuestionOption({
      oid: map.oid,
      desc: map.desc,
      propertyFunctions: map.propertyFunctions.map((e) => PropertyFunction.fromMap(e)),
    });
  }
}