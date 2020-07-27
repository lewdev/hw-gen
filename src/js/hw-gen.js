const HwGen = (() => {
  const MODE = { MAIN: 1, WORKSHEET: 2 };
  const worksheetView = document.getElementById("worksheetView");
  const mainView = document.getElementById("mainView");
  const hwMap = {};
  let mode = MODE.MAIN;
  let selectedSet = "";
  let worksheetCount = 1;
  const genEquation = (xSize, ySize, mathSymbol) => {
    const x = randRangeByDigits(xSize);
    const y = randRangeByDigits(ySize);
    const z = solution(x, y, mathSymbol);
    return { x, y, z };
  };
  const generate = (xSize, ySize, mathSymbol, count) => {
    const arr = [];
    if (xSize === 1 && ySize === 1) {
      singleDigits.map(x => singleDigits.map(y => arr.push({ x, y, z: solution(x, y, mathSymbol) })));
      arr.sort(() => Math.random() - 0.5); //shuffle
      arr.sort(() => Math.random() - 0.5); //shuffle
    }
    else {
      for (let i = 0; i < count; i++) {
        arr.push(genEquation(xSize, ySize, mathSymbol));
      }
    }
    return arr;
  };
  const renderMain = () => {
    const output = document.getElementById("output");
    const worksheetCountSelect = document.getElementById("worksheetCount");
    const worksheetCount = worksheetCountSelect ? parseInt(worksheetCountSelect.value) : 1;
    output.innerHTML = Object.keys(hwMap).map(cat => {
      return `<tr><td colspan="4" class="text-light bg-secondary"><h4 class="mb-0">${cat}</h4></td></tr>` + hwMap[cat].map((hwSet, i) => {
        const {title, xSize, ySize, mathSymbol, outputFunc, count, name} = hwSet;
        const eq = genEquation(xSize, ySize, mathSymbol);
        const eqStr = outputFunc(eq, -1, 0);
        return `<tr>
        <td class="text-right pr-0 text-sm">
          <span class="mr-2 number">${i + 1}.</span>
        </td>
        <td>
          <a href="./?set=${name}&worksheets=${worksheetCount}" onclick="HwGen.setWs('${name}', ${worksheetCount}); return false;">${title}</a>
          <div>${xSize === 1 && ySize === 1 ? 64 : count} Problems</div.
        </td>
        <td>e.g.</td>
        <td style="width:10rem;">
          <table class="w-50"><tbody><tr class="example">${eqStr}</tr></tbody></table>
        </td>
        </tr>`}).join("");
    }).join("");
    document.title = "HW Gen: Math Homework Generator";
  };
  const renderWorksheet = () => {
    const worksheetsDiv = document.querySelector(".worksheets")
      , answerKeyDiv = document.querySelector(".answerKey")
      , hwSetInfoDiv = document.querySelector(".hw-set-info")
      , worksheetOrig = document.querySelector(".worksheet").cloneNode(true)
      , worksheetCountSelect = document.getElementById("worksheetCount")
      , hwSet = hwSets[selectedSet]
      , allAnswerKeys = []
      , { title, count, columns, xSize, ySize, mathSymbol, outputFunc, answerKey } = hwSet
    ;
    worksheetCount = worksheetCountSelect ? parseInt(worksheetCountSelect.value) : 1
    worksheetsDiv.innerHTML = "";
    for (let i = 0; i < worksheetCount; i++) {
      const worksheet = worksheetOrig.cloneNode(true)
        , output = worksheet.querySelector(".output")
        , arr = generate(xSize, ySize, mathSymbol, count)
        , titleDiv = worksheet.querySelector(".title")
        , outputStr = arr.map((eq, i) => outputFunc(eq, i, columns)).join("")
        , emoji = randArr(emojis)
      ;
      allAnswerKeys.push(`<div class="answer-key-table col-4">
        <div class="font-weight-bold">${emoji} ${title} #${i + 1}</div>
        <div class="row">${arr.map(answerKey).map((a, i) => 
      `<div class="text-nowrap col-${Math.floor(12 / columns)}">${i + 1}.) ${a}</div>`).join("")}</div></div>`);
      titleDiv.innerHTML = `${emoji} ${title} #${i + 1}`;
      output.innerHTML = '<tr>' + outputStr + '</tr>';
      worksheetsDiv.appendChild(worksheet);
    }
    hwSetInfoDiv.innerHTML = `${worksheetCount} worksheets *Answer key on last page.`;
    answerKeyDiv.innerHTML = allAnswerKeys.join("");
    document.title = title;
  };
  const init = () => {
    selectedSet = getUrlParam("set");
    worksheetCount = parseInt(getUrlParam("worksheets")) || 3;
    if (selectedSet) {
      mode = MODE.WORKSHEET;
    }
    //map sets by Category.
    Object.keys(hwSets).map(a => {
      const hwSet = hwSets[a];
      if (!hwSet.category) alert(`"${a}" does not have a category!`);
      hwSet.name = a;
      if (!hwMap[hwSet.category]) {
        hwMap[hwSet.category] = [];
      }
      hwMap[hwSet.category].push(hwSet);
    });
    HwGen.render();
  }
  window.onload = init;
  return {
    render: () => {
      mainView.style.display = mode === MODE.MAIN ? "" : "none";
      worksheetView.style.display = mode === MODE.WORKSHEET ? "" : "none";
      switch (mode) {
        case MODE.WORKSHEET: renderWorksheet(); break;
        case MODE.MAIN:
        default: renderMain();
      }
      window.scrollTo(0, 0);
      twemoji.parse(document.body);
    },
    setWs: (hwSetName, worksheetCount) => {
      if (hwSetName) {
        setUrlParam(`set=${hwSetName}&worksheets=${worksheetCount}`);
        mode = MODE.WORKSHEET;
        selectedSet = hwSetName;
      }
      else {
        mode = MODE.MAIN;
        selectedSet = "";
        setUrlParam("");
      }
      HwGen.render();
      return false;
    }
  };
})();