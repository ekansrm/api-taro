export enum PropertyType {
  STRING = "STRING",
  INTEGER = "INTEGER",
}

export enum PropertyComparator {
  EMPTY = "EMPTY",
  NOT_EMPTY = "NOT_EMPTY",
  EQUAL = "EQUAL",
  NOT_EQUAL = "NOT_EQUAL",
  INTERSECT = "INTERSECT",
  IN = "IN",
  NOT_IN = "NOT_IN",
  CONTAIN = "CONTAIN",
  NOT_CONTAIN = "NOT_CONTAIN",
  LESS = "LESS",
  LESS_EQUAL = "LESS_EQUAL",
  GREATER = "GREATER",
  GREATER_EQUAL = "GREATER_EQUAL",
  BETWEEN = "BETWEEN",
  NOT_BETWEEN = "NOT_BETWEEN",
}

export enum PropertyOperator {
  APPEND = "APPEND",
  REMOVE = "REMOVE",
  UNIQUE = "UNIQUE",
  ADD = "ADD",
}

export class PropertyLabel {
  /*
  属性ID
   */
  pid: string;

  /*
  属性名称
   */
  name: string;

  /*
  属性类型
   */
  type: PropertyType;

  constructor({ pid, name, type }: { pid: string; name: string; type: PropertyType }) {
    this.pid = pid;
    this.name = name;
    this.type = type;
  }

  toMap(): { pid: string; name: string; type: string } {
    return {
      pid: this.pid,
      name: this.name,
      type: this.type,
    };
  }

  static fromMap(map: { pid: string; name: string; type: string }): PropertyLabel {
    return new PropertyLabel({
      pid: map.pid,
      name: map.name,
      type: PropertyType[map.type as keyof typeof PropertyType],
    });
  }
}

export class PropertyValue {
  /// 属性类型
  type: PropertyType;

  /// 是否是引用
  refer: boolean;

  /// 值
  value: string;

  constructor(type: PropertyType, refer: boolean, value: string) {
    this.type = type;
    this.refer = refer;
    this.value = value;
  }

  static literalValue({ type, value }: { type: PropertyType; value: string }): PropertyValue {
    return new PropertyValue(type, false, value);
  }

  toMap(): { type: string; refer: boolean; value: string } {
    return {
      type: this.type,
      refer: this.refer,
      value: this.value,
    };
  }

  static fromMap(map: { type: string; refer: boolean; value: string }): PropertyValue {
    return new PropertyValue(PropertyType[map.type as keyof typeof PropertyType], map.refer, map.value);
  }
}

export class PropertyEvaluator {
  /// 属性ID
  pid: string;

  /// 操作符
  operator: PropertyComparator;

  /// 操作数
  operands: PropertyValue[];

  /// 权重
  weight: number;

  constructor({ pid, operator, operands, weight }: { pid: string; operator: PropertyComparator; operands: PropertyValue[]; weight: number }) {
    this.pid = pid;
    this.operator = operator;
    this.operands = operands;
    this.weight = weight;
  }

  toMap(): { pid: string; operator: string; operands: { type: string; refer: boolean; value: string }[]; weight: number } {
    return {
      pid: this.pid,
      operator: this.operator,
      operands: this.operands.map((e) => e.toMap()),
      weight: this.weight,
    };
  }

  static fromMap(map: { pid: string; operator: string; operands: { type: string; refer: boolean; value: string }[]; weight: number }): PropertyEvaluator {
    return new PropertyEvaluator({
      pid: map.pid,
      operator: PropertyComparator[map.operator as keyof typeof PropertyComparator],
      operands: map.operands.map((e) => PropertyValue.fromMap(e)),
      weight: map.weight,
    });
  }
}

export class PropertyFunction {
  /// 属性ID
  pid: string;

  operator: PropertyOperator;

  operands: PropertyValue[];

  constructor({ pid, operator, operands }: { pid: string; operator: PropertyOperator; operands: PropertyValue[] }) {
    this.pid = pid;
    this.operator = operator;
    this.operands = operands;
  }

  toMap(): { pid: string; operator: string; operands: { type: string; refer: boolean; value: string }[] } {
    return {
      pid: this.pid,
      operator: this.operator,
      operands: this.operands.map((e) => e.toMap()),
    };
  }

  static fromMap(map: { pid: string; operator: string; operands: { type: string; refer: boolean; value: string }[] }): PropertyFunction {
    return new PropertyFunction({
      pid: map.pid,
      operator: PropertyOperator[map.operator as keyof typeof PropertyOperator],
      operands: map.operands.map((e) => PropertyValue.fromMap(e)),
    });
  }
}
