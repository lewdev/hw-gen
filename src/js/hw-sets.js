const verticalEq = (eq, i, columns, mathSym, long, answerSpace) => `
  <td class="text-muted number text-right">${i + 1}.)</td>
  <td class="pb-5 pt-3">
    <div class="vert-equation">${eq.x}</div>
    <div class="vert-equation">${mathSym} ${eq.y}</div>
    <div class="vert-equation md" ${answerSpace ? `style="margin-bottom:${answerSpace}rem;"`:''}><input type="text" class="answer-input"/></div>
  </td>
  ${((i + 1) % columns) === 0 ? `</tr><tr${long ? ' class="long"' : ''}>` : ''}`
  /**
   * Solve:
   *         z
   * mathSym x
   *       ___
   */
  , verticalEqZX_ = (eq, i, columns, mathSym, long) => `
    <td class="text-muted number"><span class="mr-2">${i + 1}.)</span></td>
    <td class="pb-5">
      <div class="vert-equation">${eq.z}</div>
      <div class="vert-equation">${mathSym} ${eq.x}</div>
      <div class="vert-equation"><input type="text" class="answer-input"/></div>
    </td>
    ${((i + 1) % columns) === 0 ? `</tr><tr${long ? ' class="long"' : ''}>` : ''}`
  , horizontalEq = (eq, i, columns, mathSym) => `
    <td class="text-right text-nowrap">
      <span class="number">${i + 1}.)</span>${eq.x} ${mathSym} ${eq.y} =
    </td>
    <td class="answer"><input type="text" class="answer-input down"/></td>
    ${((i + 1) % columns) === 0 ? '</tr><tr>' : ''}`
  , longDivEq = (eq, i, columns, longer) => `
    <td class="text-muted number"><span class="mr-2">${i + 1}.)</span></td>
    <td>
      <div class="row long-div${longer ? ' er' : ''}">
        <div class="col-4"></div>
        <div class="col-8 text-left"><input type="text" class="answer-input"/></div>
        <div class="col-4 long-div-divisor">${eq.x}</div>
        <div class="col-8 long-div-numerator">${eq.z}</div>
      </div>
    </td>
    ${((i + 1) % columns) === 0 ? '</tr><tr>' : ''}`
  , visualMultiEq = (eq, i, columns) => `
    <td class="text-muted number"><span class="mr-2">${i + 1}.)</span></td>
    <td>
      <table class="grid-tbl"><tbody>${repeat(`<tr>${repeat(`<td></td>`, 8)}`, 8)}</tbody></table>
      <div class="equation mt-2 mb-2">
        ${eq.x} &times; ${eq.y} = <input type="text" class="answer-input down"/>
      </div>
    </td>
    ${((i + 1) % columns) === 0 ? '</tr><tr style="border-top: 3px dotted gray;">' : ''}`
  , visualEmojiMultiEq = (eq, i, columns) => `
    <td class="text-muted number"><span class="mr-2">${i + 1}.)</span></td>
    <td class="text-center multi-vis-emoji">
      <div class="row" style="width: 28rem; height: 10rem;">
        ${repeat(`<div class="col-${12 / eq.x} text-center">${repeat(randArr(emojis), eq.y)}</div>`, eq.x)}
      </div>
      <div class="equation mt-4 mb-4">
        ${eq.x} &times; ${eq.y} = <input type="text" class="answer-input down"/>
      </div>
    </td>
    ${((i + 1) % columns) === 0 ? '</tr><tr>' : ''}`
  , multiAddEq = (eq, i, columns) => `
    <td class="text-muted number"><span class="mr-2">${i + 1}.)</span></td>
    <td class="text-center multi-vis-emoji">
      <div class="grid"></div>
      <div class="equation mt-2 mb-2">
        ${eq.x} &times; ${eq.y} = <input type="text" class="answer-input down"/>
      </div>
    </td>
    ${((i + 1) % columns) === 0 ? '</tr><tr>' : ''}`
  , visualAddition = (eq, i, columns, mathSym, emoji) => `
    <td rowspan="2" style="height: 10rem;"><div class="number" style="height: 12rem;">${i + 1}.)</div></td>
    <td class="text-center align-middle">${strXTimes(`<span class="emoji mr-2 text-lg">${emoji}</span>`, eq.x)}</td>
    <td class="text-center align-middle" rowspan="2">+</td>
    <td class="text-center align-middle">${strXTimes(`<span class="emoji mr-2 text-lg">${emoji}</span>`, eq.y)}</td>
    <td class="text-center align-middle" rowspan="2">=</td>
    <td class="answer align-bottom" rowspan="2"><input type="text" class="answer-input down"/></td>
    </tr><tr>
    <td class="text-center align-bottom" style="border-top:0;"><input type="text" class="answer-input down"/></td>
    <td class="text-center align-bottom" style="border-top:0;"><input type="text" class="answer-input down"/></td>
    ${((i + 1) % 5) === 0 ? `</tr></tbody><div class="page-break"></div><table><tbody><tr>` : '</tr><tr style="border-top: 3px dotted gray;">'}`
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
    useAllPossible1Digit: true,
    xSize: 1, ySize: 1,
    mathSymbol: "+",
    outputFunc: (eq, i, columns) => horizontalEq(eq, i, columns, "+"),
  },
  "addition-visual-1": {
    title: "Addition Visual Equations Level 1 (1-6)", category: "Addition",
    count: 10, columns: 1,
    xSize: .6, ySize: .6,
    mathSymbol: "+",
    outputFunc: (eq, i) => visualAddition(eq, i, 0, "+", randArr(countable)),
  },
  "addition-visual-2": {
    title: "Addition Visual Equations Level 2", category: "Addition",
    count: 10, columns: 1,
    xSize: 1, ySize: 1,
    mathSymbol: "+",
    outputFunc: (eq, i) => visualAddition(eq, i, 0, "+", randArr(countable)),
  },
  "addition-find-addends": {
    title: "Addition Find Addend Equations", category: "Addition",
    count: 20, columns: 3,
    useAllPossible1Digit: true,
    xSize: 1, ySize: 1, mathSymbol: "+",
    outputFunc: (eq, i, columns) => horizontalEqX_Y(eq, i, columns, "+"),
  },
  "addition-2-1": {
    title: "Addition 2-1-digit Equations", category: "Addition",
    count: 44, columns: 4,
    xSize: 2, ySize: 1, mathSymbol: "+",
    outputFunc: (eq, i, columns) => verticalEq(eq, i, columns, "+"),
  },
  "addition-2-2": {
    title: "Addition 2-digit Equations", category: "Addition",
    count: 44, columns: 4,
    xSize: 2, ySize: 2, mathSymbol: "+",
    outputFunc: (eq, i, columns) => verticalEq(eq, i, columns, "+"),
  },
  "addition-3-3": {
    title: "Addition 3-digit Equations", category: "Addition",
    count: 44, columns: 4, long: true,
    xSize: 3, ySize: 3, mathSymbol: "+",
    outputFunc: (eq, i, columns, long) => verticalEq(eq, i, columns, "+", long),
  },
  "addition-4-4": {
    title: "Addition 4-digit Equations", category: "Addition",
    count: 44, columns: 4, long: true,
    xSize: 4, ySize: 4, mathSymbol: "+",
    outputFunc: (eq, i, columns, long) => verticalEq(eq, i, columns, "+", long),
  },
  "addition-5-5": {
    title: "Addition 5-digit Equations", category: "Addition",
    count: 44, columns: 4, long: true,
    xSize: 5, ySize: 5, mathSymbol: "+",
    outputFunc: (eq, i, columns, long) => verticalEq(eq, i, columns, "+", long),
  },
  "subtraction": {
    title: "Subtraction 1-digit Equations", category: "Subtraction",
    count: 64, columns: 3,
    xSize: 1, ySize: 1,
    useAllPossible1Digit: 1,
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
  "subtraction-3-3": {
    title: "Subtraction 3-digit Equations", category: "Subtraction",
    count: 44, columns: 4, long: true,
    xSize: 3, ySize: 3, mathSymbol: "+",
    outputFunc: (eq, i, columns, long) => verticalEqZX_(eq, i, columns, "-", long),
    answerKey: eq => eq.y,
  },
  "subtraction-4-4": {
    title: "Subtraction 4-digit Equations", category: "Subtraction",
    count: 44, columns: 4, long: true,
    xSize: 4, ySize: 4, mathSymbol: "+",
    outputFunc: (eq, i, columns, long) => verticalEqZX_(eq, i, columns, "-", long),
    answerKey: eq => eq.y,
  },
  "subtraction-5-5": {
    title: "Subtraction 5-digit Equations", category: "Subtraction",
    count: 44, columns: 4, long: true,
    xSize: 5, ySize: 5, mathSymbol: "+",
    outputFunc: (eq, i, columns, long) => verticalEqZX_(eq, i, columns, "-", long),
    answerKey: eq => eq.y,
  },
  "multiplication-vis-emoji": {
    title: "Muliplication Visual Emoji Equations", category: "Multiplication",
    count: 16, columns: 2,
    xSize: 1, ySize: 1,
    myGenEq: () => {
      const x = randArr([2,3,4]);
      const y = randArr([1,2,3,4,5]);
      const z = x * y;
      return { x, y, z };
    },
    outputFunc: (eq, i, columns) => visualEmojiMultiEq(eq, i, columns),
  },
  "multiplication-vis-1": {
    title: "Muliplication Visual Lvl 1 Equations", category: "Multiplication",
    count: 16, columns: 2,
    xSize: 1, ySize: 1,
    myGenEq: () => {
      const x = randArr([2,3,4,5,6]);
      const y = randArr([2,3,4,5,6]);
      const z = x * y;
      return { x, y, z };
    },
    outputFunc: (eq, i, columns) => visualMultiEq(eq, i, columns, 6),
  },
  "multiplication-vis-2": {
    title: "Muliplication Visual Lvl 2 Equations", category: "Multiplication",
    count: 16, columns: 2,
    xSize: 1, ySize: 1,
    outputFunc: (eq, i, columns) => visualMultiEq(eq, i, columns, 8),
  },
  "multiplication-add-2": {
    title: "Muliplication Add Equations", category: "Multiplication",
    count: 16, columns: 2,
    xSize: 1, ySize: 1,
    outputFunc: (eq, i, columns) => multiAddEq(eq, i, columns, 8),
  },
  "multiplication": {
    title: "Multiplication 1-digit Equations", category: "Multiplication",
    count: 64, columns: 3,
    xSize: 1, ySize: 1,
    useAllPossible1Digit: 1,
    mathSymbol: "*",
    outputFunc: (eq, i, columns) => horizontalEq(eq, i, columns, "&times;"),
  },
  "multiplication-find-multiple": {
    title: "Multiplication Find Multiple Equations", category: "Multiplication",
    count: 20, columns: 3,
    xSize: 1, ySize: 1,
    useAllPossible1Digit: 1,
    mathSymbol: "*",
    outputFunc: (eq, i, columns) => horizontalEqX_Y(eq, i, columns, "&times;"),
  },
  "multiplication-11-13": {
    title: "Multiplication with 11 to 13 Equations", category: "Multiplication",
    count: 64, columns: 3,
    mathSymbol: "*",
    myGenEq: () => {
      const x = randRange(11, 14);
      const y = randNoOnes();
      const z = x * y;
      return { x, y, z };
    },
    outputFunc: (eq, i, columns) => horizontalEq(eq, i, columns, "&times;"),
  },
  "multiplication-2-1": {
    title: "Muliplication 2 to 1-digit Equations", category: "Multiplication",
    count: 44, columns: 4,
    xSize: 2, ySize: 1,
    mathSymbol: "*",
    outputFunc: (eq, i, columns) => verticalEq(eq, i, columns, "&times;"),
  },
  "multiplication-2-2": {
    title: "Muliplication 2-digit Equations", category: "Multiplication",
    count: 28, columns: 4, long: true, answerSpace: 6,
    xSize: 2, ySize: 2,
    mathSymbol: "*",
    outputFunc: (eq, i, columns, long, answerSpace) => verticalEq(eq, i, columns, "&times;", long, answerSpace),
  },
  "multiplication-3": {
    title: "Muliplication 3-digit Equations", category: "Multiplication",
    count: 24, columns: 4, long: true, answerSpace: 10,
    xSize: 3, ySize: 3,
    mathSymbol: "*",
    outputFunc: (eq, i, columns, long, answerSpace) => verticalEq(eq, i, columns, "&times;", long, answerSpace),
  },
  "division": {
    title: "Division 1-digit Equations", category: "Division",
    count: 64, columns: 3,
    xSize: 1, ySize: 1,
    useAllPossible1Digit: 1,
    mathSymbol: "*",
    outputFunc: (eq, i, columns) => horizontalEqZX_(eq, i, columns, "&divide;"),
    answerKey: eq => eq.y,
  },
  "division-box": {
    title: "Division Box Format Equations", category: "Division",
    count: 36, columns: 4,
    xSize: 1, ySize: 1,
    useAllPossible1Digit: 1,
    mathSymbol: "*",
    outputFunc: (eq, i, columns) => longDivEq(eq, i, columns),
    answerKey: eq => eq.y,
  },
  "division-box-remainders": {
    title: "Division Box Format w/Remainders Equations", category: "Division",
    count: 27, columns: 3,
    myGenEq: () => {
      const x = randNoOnes();
      const y = randNoOnes();
      const remainder = rand(x - 1) + 1;
      const z = (x * y) + remainder;
      return { x, y, z, remainder};
    },
    outputFunc: (eq, i, columns) => longDivEq(eq, i, columns),
    answerKey: eq => `${eq.y} r. ${eq.remainder}`,
  },
  "division-long": {
    title: "Long Division Equations", category: "Division",
    count: 27, columns: 3,
    myGenEq: () => {
      const x = randNoOnes();
      const y = randRangeByDigits(2);
      const z = x * y;
      return { x, y, z };
    },
    outputFunc: (eq, i, columns) => longDivEq(eq, i, columns),
    answerKey: eq => eq.y,
  },
  "division-longer": {
    title: "Longer Division Equations", category: "Division",
    count: 24, columns: 3,
    myGenEq: () => {
      const x = randNoOnes();
      const y = randRangeByDigits(3);
      const z = x * y;
      return { x, y, z };
    },
    outputFunc: (eq, i, columns) => longDivEq(eq, i, columns, true),
    answerKey: eq => eq.y,
  },
  "division-long-remainders": {
    title: "Long Division w/Remainders Equations", category: "Division",
    count: 27, columns: 3,
    myGenEq: () => {
      const x = randNoOnes();
      const y = randRangeByDigits(2);
      const remainder = rand(x - 1) + 1;
      const z = (x * y) + remainder;
      return { x, y, z, remainder};
    },
    outputFunc: (eq, i, columns) => longDivEq(eq, i, columns),
    answerKey: eq => `${eq.y} r. ${eq.remainder}`,
  },
  "division-longer-remainders": {
    title: "Longer Division w/Remainders Equations", category: "Division",
    count: 24, columns: 3,
    mathSymbol: "*",
    myGenEq: () => {
      const x = randNoOnes();
      const y = randRangeByDigits(3);
      const remainder = rand(x - 1) + 1;
      const z = (x * y) + remainder;
      return { x, y, z, remainder};
    },
    outputFunc: (eq, i, columns) => longDivEq(eq, i, columns, true),
    answerKey: eq => `${eq.y} r. ${eq.remainder}`,
  },
};
