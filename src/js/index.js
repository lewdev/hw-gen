let answerKeyCbx = document.getElementById("answerKeyCbx");
let answerKey = answerKeyCbx.checked;
const toggleAnswerKey = elem => {
  answerKey = elem.checked;
  render();
};
window.onload = () => render();
const render = () => {
  const output = document.getElementById("output");
  output.innerHTML = Object.keys(hwSets).map((a, i) => {
    const {title, xSize, ySize, mathSymbol, outputFunc, count} = hwSets[a];
    const eq = genEquation(xSize, ySize, mathSymbol);
    const eqStr = outputFunc(eq, -1, 0);
    return `<tr>
    <td class="text-right pr-0 text-sm">
      <span class="mr-2 number">${i + 1}.</span>
    </td>
    <td>
      <a href="worksheet.html?set=${a}${answerKey ? '&showAnswerKey=1' : ''}" target="_blank">${title}</a>
      ${answerKey ? '<div class="text-muted">w/answer key</div>' : ''}
      ${xSize === 1 && ySize === 1 ? 64 : count} Problems
    </td>
    <td>e.g.</td>
    <td style="width:10rem;">
      <table class="w-50"><tbody><tr class="example">${eqStr}</tr></tbody></table>
    </td>
  </tr>`}).join("");
};