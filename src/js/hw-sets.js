const hwSets = {
  "addition": {
    title: "Addition 1-digit Equations",
    count: 20,
    columns: 3,
    xSize: 1,
    ySize: 1,
    mathSymbol: "+",
    outputFunc: (eq, i, columns) => `
      <td class="inline-equation text-nowrap">
        <span class="number">${i + 1}.)</span>${eq.x} + ${eq.y} =
      </td>
      <td class="answer"><input type="text" class="answer-input-d"/></td>
    ${((i + 1) % columns) === 0 ? '</tr><tr>' : ''}`,
    answerKey: eq => eq.z,
  },
  "addition-find-addends": {
    title: "Addition Find Addends 1-digit Equations",
    count: 20,
    columns: 3,
    xSize: 1, ySize: 1, mathSymbol: "+",
    outputFunc: (eq, i, columns) => `
    <td class="inline-equation text-nowrap">
      <span class="text-muted mr-2 number">${i + 1}.)</span>
      ${eq.x} + <input type="text" class="answer-input-d"/> =
    </td>
    <td class="answer">${eq.z}</td>
    ${((i + 1) % columns) === 0 ? '</tr><tr>' : ''}`,
    answerKey: eq => eq.y,
  },
  "addition-2-1": {
    title: "Addition 2-1-digit Equations",
    count: 40, columns: 4,
    xSize: 2, ySize: 1, noOnes: true, mathSymbol: "+",
    outputFunc: (eq, i, columns) => `
    <td><span class="number">${i + 1}.)</span></td>
    <td class="pb-5">
      <div class="equation">${eq.x}</div>
      <div class="equation">+ ${eq.y}</div>
      <div class=" equation"><input type="text" class="answer-input"/></div>
    </td>
    ${((i + 1) % columns) === 0 ? '</tr><tr>' : ''}`,
    answerKey: eq => eq.z,
  },
  "addition-2-2": {
    title: "Addition 2-2-digit Equations",
    count: 40, columns: 4,
    xSize: 2, ySize: 2, noOnes: true, mathSymbol: "+",
    outputFunc: (eq, i, columns) => `
    <td><span class="number">${i + 1}.)</span></td>
    <td class="pb-5">
      <div class="equation">${eq.x}</div>
      <div class="equation">+ ${eq.y}</div>
      <div class=" equation"><input type="text" class="answer-input"/></div>
    </td>
    ${((i + 1) % columns) === 0 ? '</tr><tr>' : ''}`,
    answerKey: eq => eq.z,
  },
  "multiplication": {
    title: "Multiplication 1-digit Equations",
    count: 64,
    columns: 3,
    xSize: 1,
    ySize: 1,
    mathSymbol: "*",
    outputFunc: (eq, i, columns) => `
    <td class="inline-equation text-nowrap">
      <span class="number">${i + 1}.)</span> ${eq.x} &times; ${eq.y} = 
    </td>
    <td class="answer">
      <input type="text" class="answer-input-d"/>
    </td>
    ${((i + 1) % columns) === 0 ? '</tr><tr>' : ''}`,
    answerKey: eq => eq.z,
  },
  "multiplication-find-multiple": {
    title: "Multiplication Find Multiple 1-1-digit Equations",
    count: 20,
    columns: 3,
    xSize: 1,
    ySize: 1,
    mathSymbol: "*",
    outputFunc: (eq, i, columns) => `
    <td class="inline-equation text-nowrap">
      <span class="number">${i + 1}.)</span> ${eq.x} &times; 
      <input type="text" class="answer-input-d"/> = 
    </td>
    <td class="answer">
      ${eq.z}
    </td>
    ${((i + 1) % columns) === 0 ? '</tr><tr>' : ''}`,
    answerKey: eq => eq.y,
  },
  "multiplication-2-1": {
    title: "Muliplication 2 to 1-digit Equations",
    count: 40,
    columns: 4,
    xSize: 2,
    ySize: 1,
    mathSymbol: "*",
    noOnes: true,
    outputFunc: (eq, i, columns) => `
    <td><span class="number">${i + 1}.)</span></td>
    <td class="pb-5">
      <div class="equation">${eq.x}</div>
      <div class="equation">&times; ${eq.y}</div>
      <div class=" equation"><input type="text" class="answer-input"/></div>
    </td>
    ${((i + 1) % columns) === 0 ? '</tr><tr>' : ''}`,
    answerKey: eq => eq.y,
  },
};
