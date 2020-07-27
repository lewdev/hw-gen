const verticalEq = (eq, i, columns, mathSym) => `
  <td align="right"><span class="number">${i + 1}.)</span></td>
  <td class="pb-5">
    <div class="equation">${eq.x}</div>
    <div class="equation">${mathSym} ${eq.y}</div>
    <div class="equation"><input type="text" class="answer-input"/></div>
  </td>
  ${((i + 1) % columns) === 0 ? '</tr><tr>' : ''}`
  /**
   * Solve:
   *         z
   * mathSym x
   *       ___
   */
  , verticalEqZX_ = (eq, i, columns, mathSym) => `
    <td><span class="text-muted mr-2 number">${i + 1}.)</span></td>
    <td class="pb-5">
      <div class="equation">${eq.z}</div>
      <div class="equation">${mathSym} ${eq.x}</div>
      <div class="equation"><input type="text" class="answer-input"/></div>
    </td>
    ${((i + 1) % columns) === 0 ? '</tr><tr>' : ''}`
  , horizontalEq = (eq, i, columns, mathSym) => `
    <td class="text-right text-nowrap">
      <span class="number">${i + 1}.)</span>${eq.x} ${mathSym} ${eq.y} =
    </td>
    <td class="answer"><input type="text" class="answer-input down"/></td>
    ${((i + 1) % columns) === 0 ? '</tr><tr>' : ''}`
  /**
   * Solve:
   *   x mathSym ___ = y
   */
  , horizontalEqX_Y = (eq, i, columns, mathSym) => `
  <td><span class="text-muted mr-2 number">${i + 1}.)</span></td>
  <td class="text-right text-nowrap">
    ${eq.x} ${mathSym} <input type="text" class="answer-input down"/> =
    </td>
    <td class="answer">${eq.z}</td>
    ${((i + 1) % columns) === 0 ? '</tr><tr>' : ''}`
  /**
   * Solve:
   *   z mathSym x = ___
   */
  , horizontalEqZX_ = (eq, i, columns, mathSym) => `
  <td><span class="text-muted mr-2 number">${i + 1}.)</span></td>
  <td class="text-right text-nowrap">
    ${eq.z} ${mathSym} ${eq.x} =
      </td>
    <td class="answer"><input type="text" class="answer-input down"/></td>
    ${((i + 1) % columns) === 0 ? '</tr><tr>' : ''}`
;
const hwSets = {
  "addition": {
    title: "Addition 1-digit Equations", category: "Addition",
    count: 20, columns: 3,
    xSize: 1, ySize: 1,
    mathSymbol: "+",
    outputFunc: (eq, i, columns) => horizontalEq(eq, i, columns, "+"),
    answerKey: eq => eq.z,
  },
  "addition-find-addends": {
    title: "Addition Find Addend Equations", category: "Addition",
    count: 20, columns: 3,
    xSize: 1, ySize: 1, mathSymbol: "+",
    outputFunc: (eq, i, columns) => horizontalEqX_Y(eq, i, columns, "+"),
    answerKey: eq => eq.y,
  },
  "addition-2-1": {
    title: "Addition 2-1-digit Equations", category: "Addition",
    count: 44, columns: 4,
    xSize: 2, ySize: 1, mathSymbol: "+",
    outputFunc: (eq, i, columns) => verticalEq(eq, i, columns, "+"),
    answerKey: eq => eq.z,
  },
  "addition-2-2": {
    title: "Addition 2-digit Equations", category: "Addition",
    count: 44, columns: 4,
    xSize: 2, ySize: 2, mathSymbol: "+",
    outputFunc: (eq, i, columns) => verticalEq(eq, i, columns, "+"),
    answerKey: eq => eq.z,
  },
  "subtraction": {
    title: "Subtraction 1-digit Equations", category: "Subtraction",
    count: 64, columns: 3,
    xSize: 1, ySize: 1,
    mathSymbol: "+",
    outputFunc: (eq, i, columns) => horizontalEqZX_(eq, i, columns, "-"),
    answerKey: eq => eq.y,
  },
  "subtraction-2-1": {
    title: "Subtraction 2-1-digit Equations", category: "Subtraction",
    count: 44, columns: 4,
    xSize: 1, ySize: 2, mathSymbol: "+",
    outputFunc: (eq, i, columns) => verticalEqZX_(eq, i, columns, "-"),
    answerKey: eq => eq.y,
  },
  "subtraction-2-2": {
    title: "Subtraction 2-digit Equations", category: "Subtraction",
    count: 44, columns: 4,
    xSize: 2, ySize: 2, mathSymbol: "+",
    outputFunc: (eq, i, columns) => verticalEqZX_(eq, i, columns, "-"),
    answerKey: eq => eq.y,
  },
  "multiplication": {
    title: "Multiplication 1-digit Equations", category: "Multiplication",
    count: 64, columns: 3,
    xSize: 1, ySize: 1,
    mathSymbol: "*",
    outputFunc: (eq, i, columns) => horizontalEq(eq, i, columns, "&times;"),
    answerKey: eq => eq.z,
  },
  "multiplication-find-multiple": {
    title: "Multiplication Find Multiple Equations", category: "Multiplication",
    count: 20, columns: 3,
    xSize: 1, ySize: 1,
    mathSymbol: "*",
    outputFunc: (eq, i, columns) => horizontalEqX_Y(eq, i, columns, "&times;"),
    answerKey: eq => eq.y,
  },
  "multiplication-2-1": {
    title: "Muliplication 2 to 1-digit Equations", category: "Multiplication",
    count: 44, columns: 4,
    xSize: 2, ySize: 1,
    mathSymbol: "*",
    outputFunc: (eq, i, columns) => verticalEq(eq, i, columns, "&times;"),
    answerKey: eq => eq.y,
  },
  "multiplication-2-2": {
    title: "Muliplication 2 to 2-digit Equations", category: "Multiplication",
    count: 44, columns: 4,
    xSize: 2, ySize: 2,
    mathSymbol: "*",
    outputFunc: (eq, i, columns) => verticalEq(eq, i, columns, "&times;"),
    answerKey: eq => eq.y,
  },
  "division": {
    title: "Division 1-digit Equations", category: "Division",
    count: 64, columns: 3,
    xSize: 1, ySize: 1,
    mathSymbol: "*",
    outputFunc: (eq, i, columns) => horizontalEqZX_(eq, i, columns, "&divide;"),
    answerKey: eq => eq.y,
  },
};
