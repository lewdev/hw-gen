
const rand = max => Math.floor(Math.random() * max);
const randRange = (min, max) => rand(max - min) + min;
const randArr = arr => arr[rand(arr.length)];
const singleDigits = [2,3,4,5,6,7,8,9];
const randNoOnes = () => randArr(singleDigits);
const randRangeByDigits = (digits, noOnes = false) => {
  if (noOnes && digits === 1) return randNoOnes();
  const start = Math.pow(10, digits - 1);
  const end = Math.pow(10, digits) - 1;
  console.log({start, end})
  return randRange(start, end);
};
const solution = (x, y, mathSymbol) => {
  switch (mathSymbol) {
    case "*": return x * y;
    case "/": return x / y;
    case "-": return x - y;
    default: return x + y;
  }
};
const getUrlParam = param => {
  const paramMap = {};
  const urlArr = document.location.href.split("?");
  const queryParam = urlArr.length > 1 ? urlArr[1] : false;
  if (queryParam) {
    var paramArr = queryParam.split("&");
    paramArr.map(paramSet => {
      if (paramSet.indexOf(param + "=") === 0) {
        paramMap[param] = paramSet.split("=")[1].replace(/%20/g, " ");
      }
    });
  }
  return paramMap[param] || false;
};
const genEquation = (xSize, ySize, mathSymbol, noOnes = false) => {
  const x = randRangeByDigits(xSize, noOnes);
  const y = randRangeByDigits(ySize, noOnes);
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
window.onload = () => {
  const setName = getUrlParam("set") || "addition"
    //, copies = getUrlParam("copies") || 1
    , showAnswerKey = getUrlParam("showAnswerKey") || false
    , output = document.getElementById("output")
    , answerKey = document.getElementById("answerKey")
    , titleDiv = document.getElementById("title")
    , hwSet = hwSets[setName]
    , { title, count, columns, xSize, ySize, mathSymbol, outputFunc, noOnes } = hwSet
    , arr = generate(xSize, ySize, mathSymbol, count, noOnes)
    , outputStr = arr.map((eq, i) => outputFunc(eq, i, columns)).join("")
    , answersStr = showAnswerKey ? '<div class="answer-key-table">' + arr.map(hwSet.answerKey).map((a, i) => 
      `<span class="answer-key">${i + 1}.) ${a}</span>`).join("") + '</div>' : ''
  ;
  document.title = title;
  titleDiv.innerHTML = title;
  output.innerHTML = '<tr>' + outputStr + '</tr>';
  answerKey.innerHTML = answersStr;
};