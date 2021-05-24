const HwGen = (() => {
  const MODE = { INTRO: 1, CATEGORIES: 2, WORKSHEET_SELECT: 3, PRINT_CONFIG: 4, PREVIEW: 5, PREVIEW: 6 };
  const myNavbar = document.getElementById("myNavbar");
  const introView = document.getElementById("introView");
  const breadcrumbView = document.getElementById("breadcrumbView");
  const breadcrumb = document.getElementById("breadcrumb");
  const screenshotRotation = document.getElementById("screenshotRotation");
  const tipsView = document.getElementById("tipsView");
  const tipScroller = document.querySelector(".tip-scroller");
  const tipElemList = tipScroller.querySelectorAll("li");
  const categoriesView = document.getElementById("categoriesView");
  const worksheetSelectView = document.getElementById("worksheetSelectView");
  const worksheetCountSelect = document.getElementById("worksheetCount");
  const answerKeyChkbx = document.getElementById("answerKeyChkbx");
  const printConfigView = document.getElementById("printConfigView");
  const worksheetView = document.getElementById("worksheetView");
  const categorySelectView = document.getElementById("categorySelectView");
  const footer = document.getElementById("footer");
  const hwMap = {};
  const data = {
    "mode": MODE.INTRO,
    "selectedCat": "",
    "selectedSet": "",
    "selectedCount": 6,
    "showAnswerKey": true,
  };
  let screenshotInterval = null;
  let screenshotNum = 2;
  let tipScrollInterval = null;
  let tipNum = 0;
  const genEquation = (xSize, ySize, mathSymbol) => {
    const x = randRangeByDigits(xSize);
    const y = randRangeByDigits(ySize);
    const z = solution(x, y, mathSymbol);
    return { x, y, z };
  };
  const generate = (xSize, ySize, mathSymbol, count, useAllPossible1Digit, myGenEq) => {
    const arr = [];
    if (useAllPossible1Digit) {
      SINGLE_DIGITS.map(x => SINGLE_DIGITS.map(y => arr.push({ x, y, z: solution(x, y, mathSymbol) })));
      arr.sort(() => Math.random() - 0.5); //shuffle
      arr.sort(() => Math.random() - 0.5); //shuffle
    }
    else {
      for (let i = 0; i < count; i++) {
        arr.push(myGenEq ? myGenEq() : genEquation(xSize, ySize, mathSymbol));
      }
    }
    return arr;
  };
  const selectCat = cat => {
    if (cat !== data["selectedCat"]) data["selectedSet"] = "";
    data["selectedCat"] = cat;
    data['mode'] = MODE.WORKSHEET_SELECT;
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
  const addBreadcrumb = (arr, action, label, selected) => 
    arr.push(`<li class="breadcrumb-item">${selected ? label :  `<a href="#" onclick="${action} return false;">${label}</a>`}</li>`);
  const renderBreadcrumb = () => {
    const arr = [];
    addBreadcrumb(arr, "HwGen.intro();", "🏠 Home", data['mode'] === MODE.INTRO);
    addBreadcrumb(arr, "HwGen.start();", "⚖ Categories", data['mode'] === MODE.CATEGORIES);
    if (data['mode'] !== MODE.CATEGORIES)
      addBreadcrumb(arr, `HwGen.selectCat('${data['selectedCat']}');`, `🔢 ${data['selectedCat']}`, data['mode'] === MODE.WORKSHEET_SELECT);
    if ((data['mode'] !== MODE.CATEGORIES  && data['mode'] !== MODE.WORKSHEET_SELECT) && data['selectedSet'])
      addBreadcrumb(arr, `HwGen.printConfig();`, "🖨 Print Config", data['mode'] === MODE.PRINT_CONFIG);
    if ((data['mode'] !== MODE.CATEGORIES  && data['mode'] !== MODE.WORKSHEET_SELECT) && data['selectedSet'])
      addBreadcrumb(arr, `HwGen.preview();`, `📄 ${hwSets[data['selectedSet']].title}`, data['mode'] === MODE.PREVIEW);
    breadcrumb.innerHTML = arr.join("");
  };
  const getIcon = cat => {
    switch(cat) {
      case 'Addition': return '➕';
      case 'Subtraction': return '➖';
      case 'Multiplication': return '✖';
      case 'Division': return '➗';
    }
    return '🔢';
  };
  const renderCategories = () => {
    const categories = Object.keys(hwMap);
    if (!data["selectedCat"]) data["selectedCat"] = categories.length > 0 ? categories[0] : "";
    categorySelectView.innerHTML = categories.map(cat => {
      return `
      <div class="col-md-6 p-2">
        <div class="card">
          <div class="card-header">
            <h3 class="text-nowrap mb-0">${getIcon(cat)} ${cat}</h3>
          </div>
          <div class="card-body p-3">
          ${hwMap[cat].length} worksheets
            <button class="btn btn-primary d-block w-100 mt-2" onclick="HwGen.selectCat('${cat}'); return false;">🔍 View</button>
          </div>
        </div>
      </div>`}).join("");
  };
  const renderWorksheetList = () => {
    const worksheetList = document.getElementById("worksheetList");
    const answerKey = true;
    if (!data["selectedCat"]) {
      worksheetList.innerHTML = `<div>No selected tab</div>`;
      return;
    }
    worksheetList.innerHTML = `<h3>Select ${data["selectedCat"]} Worksheet</h3>` +
      hwMap[data["selectedCat"]].map((hwSet, i) => {
        const {title, xSize, ySize, mathSymbol, outputFunc, count, name, long, useAllPossible1Digit, myGenEq} = hwSet;
        const eq = myGenEq ? myGenEq() : genEquation(xSize, ySize, mathSymbol);
        const eqStr = outputFunc(eq, -1, 0, long);
        return `${i === 0 ? '' : '<hr/>'}<div class="row">
        <div class="col-1 text-right pr-0 text-sm">
          <span class="mr-2 number">${i + 1}.</span>
        </div>
        <div class="col-md-5">
          <a href="./?set=${name}" onclick="HwGen.setWs('${name}'); return false;">${title}</a>
          <div>${useAllPossible1Digit ? 64 : count} Problems</div>
          ${answerKey ? '<div class="text-muted">w/answer key</div>' : ''}
        </div>
        <div class="col-1">e.g.</div>
        <div class="col-md-5" style="width:10rem;">
          <table><tbody><tr class="example${long ? ' long' : ''}">${eqStr}</tr></tbody></table>
        </div>
      </div>`;
      }).join("");
    document.title = `Math Homework Generator | ${data["selectedCat"]}`;
  };
  const renderPreview = () => {
    const worksheetsDiv = document.querySelector(".worksheets")
      , answerKeyDiv = document.querySelector(".answerKey")
      , hwSetInfoDiv = document.querySelector(".hw-set-info")
      , worksheetOrig = document.querySelector(".worksheet").cloneNode(true)
      , hwSet = hwSets[data['selectedSet']]
      , allAnswerKeys = []
      ;
    if (!hwSet) {
      alert(`Worksheet set doesn't exist ${data['selectedSet']} `);
      return;
    }
    const { title, count, columns, xSize, ySize, mathSymbol, outputFunc, answerKey, long, answerSpace, useAllPossible1Digit, myGenEq } = hwSet;
    worksheetsDiv.innerHTML = "";
    for (let i = 0; i < data['selectedCount']; i++) {
      const worksheet = worksheetOrig.cloneNode(true)
        , output = worksheet.querySelector(".output")
        , arr = generate(xSize, ySize, mathSymbol, count, useAllPossible1Digit, myGenEq)
        , titleDiv = worksheet.querySelector(".title")
        , outputStr = arr.map((eq, i) => outputFunc(eq, i, columns, long, answerSpace)).join("")
        , emoji = randArr(emojis)
      ;
      allAnswerKeys.push(`<div class="answer-key-table col-${long ? 6 : 4}">
        <div class="font-weight-bold">${emoji} ${title} #${i + 1}</div>
        <div class="row">${arr.map(answerKey || function(eq) {return eq.z}).map((a, i) =>
      `<div class="text-nowrap col-${Math.floor(12 / columns)}">${i + 1}.) ${a}</div>`).join("")}</div></div>`);
      titleDiv.innerHTML = `${emoji} ${title} #${i + 1}`;
      output.innerHTML = `<tr${long ? ' class="long"' : ''}>${outputStr}</tr>`;
      worksheetsDiv.appendChild(worksheet);
    }
    hwSetInfoDiv.innerHTML = `${data['selectedCount']} worksheets. ${data['showAnswerKey'] ? '' : 'No '}Answer Key on last page.`;
    answerKeyDiv.innerHTML = data['showAnswerKey'] ? allAnswerKeys.join("") : '';
    document.title = title;
  };
  const render = () => {
    window.scrollTo();
    if (!data['mode']) data['mode'] = MODE.INTRO;
    if (screenshotInterval) clearInterval(screenshotInterval);
    const displayNavView = [MODE.CATEGORIES, MODE.WORKSHEET_SELECT, MODE.PRINT_CONFIG].includes(data['mode']) ? "" : "none";
    const displayFooter = [MODE.CATEGORIES, MODE.WORKSHEET_SELECT, MODE.PRINT_CONFIG, MODE.INTRO].includes(data['mode']) ? "" : "none";
    breadcrumbView.style.display = myNavbar.style.display = tipsView.style.display = displayNavView;
    footer.style.display = displayFooter;
    introView.style.display = data['mode'] === MODE.INTRO ? "" : "none";
    categoriesView.style.display = data['mode'] === MODE.CATEGORIES ? "" : "none";
    worksheetSelectView.style.display = data['mode'] === MODE.WORKSHEET_SELECT ? "" : "none";
    printConfigView.style.display = data['mode'] === MODE.PRINT_CONFIG ? "" : "none";
    worksheetView.style.display = data['mode'] === MODE.PREVIEW ? "" : "none";
    handleParams();
    switch (data['mode']) {
      case MODE.INTRO: renderIntro(); break;
      case MODE.CATEGORIES: renderCategories(); break;
      case MODE.WORKSHEET_SELECT: renderWorksheetList(); break;
      case MODE.PREVIEW: renderPreview(); break;
      default:
    }
    renderBreadcrumb();
    window.scrollTo(0, 0);
    twemoji && twemoji.parse(document.body);
  };
  const handleParams = () => {
    if (data['selectedSet'] && hwSets[data['selectedSet']]) {
      setUrlParam(`set=${data['selectedSet']}`);
    }
    else {
      setUrlParam("");
    }
    data['selectedCount'] = worksheetCountSelect ? parseInt(worksheetCountSelect.value) : 1;
    data['showAnswerKey'] = answerKeyChkbx.checked ? true : false;
  };
  const init = () => {
    const hwSetName = getUrlParam("set");
    if (hwSetName && hwSets[hwSetName]) {
      data['selectedSet'] = hwSetName;
      data['selectedCat'] = hwSets[hwSetName].category;
      data['mode'] = MODE.PRINT_CONFIG;
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
  const setWs = hwSetName => {
    data['selectedSet'] = hwSetName;
    data['mode'] = MODE.PRINT_CONFIG
    HwGen.render();
    return false;
  };
  const intro = () => { data['mode'] = MODE.INTRO; HwGen.render(); };
  const start = () => { data['mode'] = MODE.CATEGORIES; HwGen.render(); };
  const printConfig = () => { data['mode'] = MODE.PRINT_CONFIG; HwGen.render(); };
  const preview = () => { data['mode'] = MODE.PREVIEW; HwGen.render(); };
  return {
    intro,
    start,
    printConfig,
    preview,
    render,
    selectCat, nextTip,
    setWs
  };
})();