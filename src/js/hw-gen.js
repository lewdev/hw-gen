const HwGen = (() => {
  const MODE = { INTRO: 1, CATEGORIES: 2, WORKSHEET_SELECT: 3, WORKSHEETS: 4, };
  const myNavbar = document.getElementById("myNavbar");
  const introView = document.getElementById("introView");
  const screenshotRotation = document.getElementById("screenshotRotation");
  const tipScroller = document.querySelector(".tip-scroller");
  const tipElemList = tipScroller.querySelectorAll("li");
  const categoriesView = document.getElementById("categoriesView");
  const worksheetSelectView = document.getElementById("worksheetSelectView");
  const worksheetView = document.getElementById("worksheetView");
  const categoryTabs = document.getElementById("categoryTabs");
  const hwMap = {};
  const data = {
    "selectedCat": "",
    "selectedWs": "",
    "selectedCount": 6,
  };
  let screenshotInterval = null;
  let screenshotNum = 2;
  let tipScrollInterval = null;
  let tipNum = 0;
  let mode = MODE.INTRO;
  let selectedSet = "";
  let worksheetCount = 1;
  const genEquation = (xSize, ySize, mathSymbol) => {
    const x = randRangeByDigits(xSize);
    const y = randRangeByDigits(ySize);
    const z = solution(x, y, mathSymbol);
    return { x, y, z };
  };
  const generate = (xSize, ySize, mathSymbol, count, useAllPossible1Digit) => {
    const arr = [];
    if (useAllPossible1Digit) {
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
    renderWorksheetList();
  };
  const selectCat = cat => {
    data["selectedCat"] = cat;
    view = MODE.WORKSHEET_SELECT;
    render();
  };
  const renderIntro = () => {
    const wsCount = document.getElementById("wsCount");
    let sum = 0;
    Object.keys(hwMap).forEach(a => sum += hwMap[a].length);
    if (wsCount) wsCount.innerHTML = sum;
    //go through all screenshots
    if (screenshotInterval) clearInterval(screenshotInterval);
    screenshotInterval = setInterval(() => {
      screenshotRotation.innerHTML = `<img src="img/screenshot-${screenshotNum}.png" class="my-img rounded fade-in" />`;
      screenshotNum++;
      if (screenshotNum > 5) screenshotNum = 1;
    }, 2000);
  };
  const renderCategories = () => {
    const categories = Object.keys(hwMap);
    if (!data["selectedCat"]) data["selectedCat"] = categories.length > 0 ? categories[0] : "";
    categoryTabs.innerHTML = categories.map(cat => {
      const selected = data["selectedCat"] === cat;
      // class="${selected ? 'selected bg-secondary' : 'bg-primary'}"
      return `<li class="btn btn-${selected ? 'info' : 'dark'}" onclick="HwGen.selectCat('${cat}'); return false;">
        ${cat} <span class="badge badge-secondary">${hwMap[cat].length}</span>
    </li>`}).join("");
  };
  const renderWorksheetList = () => {
    const output = document.getElementById("output");
    const worksheetCountSelect = document.getElementById("worksheetCount");
    const worksheetCount = worksheetCountSelect ? parseInt(worksheetCountSelect.value) : 1;
    if (!data["selectedCat"]) {
      output.innerHTML = `<tr><td colspan="99">No selected tab</td></tr>`;
      return;
    }
    output.innerHTML = //`<tr><td colspan="4" class="text-light bg-secondary"><h4 class="mb-0">${data["selectedCat"]}</h4></td></tr>` +
      hwMap[data["selectedCat"]].map((hwSet, i) => {
        const {title, xSize, ySize, mathSymbol, outputFunc, count, name, long, useAllPossible1Digit} = hwSet;
        const eq = genEquation(xSize, ySize, mathSymbol);
        const eqStr = outputFunc(eq, -1, 0, long);
        return `<div class="row">
        <div class="col-md-1 text-right pr-0 text-sm">
          <span class="mr-2 number">${i + 1}.</span>
        </div>
        <div class="col-md-5>
          <a href="worksheet.html?set=${a}${answerKey ? '&showAnswerKey=1' : ''}" target="_blank">${title}</a>
          ${answerKey ? '<div class="text-muted">w/answer key</div>' : ''}
          ${xSize === 1 && ySize === 1 ? 64 : count} Problems
        </div>
        <div>e.g.</div>
        <div class="col-md-6" style="width:10rem;">
          <table class="w-50"><tbody><tr class="example">${eqStr}</tr></tbody></table>
        </div>
      </div>`;
        // return `<tr>
        // <td class="text-right pr-0 text-sm">
        //   <span class="mr-2 number">${i + 1}.</span>
        // </td>
        // <td>
        //   <a href="./?set=${name}&worksheets=${worksheetCount}" onclick="HwGen.setWs('${name}', ${worksheetCount}); return false;">${title}</a>
        //   <div>${useAllPossible1Digit ? 64 : count} Problems</div.
        // </td>
        // <td class="pr-0">e.g.</td>
        // <td style="width:10rem;">
        //   <table><tbody><tr class="example${long ? ' long' : ''}">${eqStr}</tr></tbody></table>
        // </td>
        // </tr>`;
      }).join("");
    document.title = `Math Homework Generator | ${data["selectedCat"]}`;
  };
  const renderWorksheet = () => {
    const worksheetsDiv = document.querySelector(".worksheets")
      , answerKeyDiv = document.querySelector(".answerKey")
      , hwSetInfoDiv = document.querySelector(".hw-set-info")
      , worksheetOrig = document.querySelector(".worksheet").cloneNode(true)
      , worksheetCountSelect = document.getElementById("worksheetCount")
      , hwSet = hwSets[selectedSet]
      , allAnswerKeys = []
      , { title, count, columns, xSize, ySize, mathSymbol, outputFunc, answerKey, long, answerSpace, useAllPossible1Digit } = hwSet
    ;
    worksheetCount = worksheetCountSelect ? parseInt(worksheetCountSelect.value) : 1
    worksheetsDiv.innerHTML = "";
    for (let i = 0; i < worksheetCount; i++) {
      const worksheet = worksheetOrig.cloneNode(true)
        , output = worksheet.querySelector(".output")
        , arr = generate(xSize, ySize, mathSymbol, count, useAllPossible1Digit)
        , titleDiv = worksheet.querySelector(".title")
        , outputStr = arr.map((eq, i) => outputFunc(eq, i, columns, long, answerSpace)).join("")
        , emoji = randArr(emojis)
      ;
      allAnswerKeys.push(`<div class="answer-key-table col-${long ? 6 : 4}">
        <div class="font-weight-bold">${emoji} ${title} #${i + 1}</div>
        <div class="row">${arr.map(answerKey).map((a, i) =>
      `<div class="text-nowrap col-${Math.floor(12 / columns)}">${i + 1}.) ${a}</div>`).join("")}</div></div>`);
      titleDiv.innerHTML = `${emoji} ${title} #${i + 1}`;
      output.innerHTML = `<tr${long ? ' class="long"' : ''}>${outputStr}</tr>`;
      worksheetsDiv.appendChild(worksheet);
    }
    hwSetInfoDiv.innerHTML = `${worksheetCount} worksheets *Answer key on last page.`;
    answerKeyDiv.innerHTML = allAnswerKeys.join("");
    document.title = title;
  };
  const render = () => {
    window.scrollTo();
    if (screenshotInterval) clearInterval(screenshotInterval);
    myNavbar.style.display = mode === MODE.CATEGORIES ? "" : "none";
    introView.style.display = mode === MODE.INTRO ? "" : "none";
    categoriesView.style.display = mode === MODE.CATEGORIES ? "" : "none";
    worksheetSelectView.style.display = mode === MODE.WORKSHEET_SELECT ? "" : "none";
    worksheetView.style.display = mode === MODE.WORKSHEETS ? "" : "none";
    switch (mode) {
      case MODE.INTRO: renderIntro(); break;
      case MODE.CATEGORIES: renderCategories(); break;
      case MODE.WORKSHEETS: renderWorksheet(); break;
      default: renderMain();
    }
    window.scrollTo(0, 0);
    twemoji && twemoji.parse(document.body);
  };
  const init = () => {
    selectedSet = getUrlParam("set");
    worksheetCount = parseInt(getUrlParam("worksheets")) || 3;
    if (selectedSet) mode = MODE.WORKSHEET;
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
    initTipScroller();
    HwGen.render();
  };
  const initTipScroller = () => {showTip(); tipScrollInterval = setInterval(() => showTip(), 10000);};
  const nextTip = () => {
    clearInterval(tipScrollInterval);
    initTipScroller();
  }
  const showTip = () => {
    tipElemList.forEach((a, i) => {
      a.style.display = tipNum === i ? '' : 'none';
      a.className = "fade-in";
    });
    tipNum++;
    if (tipNum >= tipElemList.length) tipNum = 0;
  };
  window.onload = init;
  return {
    intro: () => { mode = MODE.INTRO; HwGen.render(); },
    start: () => { mode = MODE.CATEGORIES; HwGen.render(); },
    render,
    selectCat, nextTip,
    setWs: (hwSetName, worksheetCount) => {
      if (hwSetName) {
        setUrlParam(`set=${hwSetName}&worksheets=${worksheetCount}`);
        mode = MODE.WORKSHEET;
        selectedSet = hwSetName;
      }
      else {
        mode = MODE.CATEGORIES;
        selectedSet = "";
        setUrlParam("");
        HwGen.render();
      }
      HwGen.render();
      return false;
    }
  };
})();