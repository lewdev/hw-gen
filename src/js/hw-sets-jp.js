const jpOutput = ({x, y}, i, columns) => `
<td class="text-muted number"><span class="mr-2">${i + 1}.)</span></td>
<td>
  <div class="text-nowrap text-center${x.match(/\w/) ? " font-italic" : ""}">${x}</div>
  <div class="mx-auto mt-2 mb-2 text-center">
    <input type="text" class="answer-input box"/>
  </div>
</td>
${((i + 1) % columns) === 0 ? '</tr><tr>' : ''}`;

const ro2ja = jpSet => jpSet.map(({ ja, ro }) => ({ x: ro, z: ja }));
const ja2ro = jpSet => jpSet.map(({ ja, ro }) => ({ x: ja, z: ro }));

const shuffleEqSetRo2Ja = jpSet => shuffle(ro2ja(jpSet));
const shuffleEqSetJa2Ro = jpSet => shuffle(ja2ro(jpSet));


// Japanese Homework sets
hwSets["hiragana-ro2ja-a-na"] = {
  title: "Hiragana Romanized to Kana (A to NA)", category: "Japanese", columns: 5,
  myGenEqList: () => shuffleEqSetRo2Ja(hiraganaSets["A-NA"]), outputFunc: jpOutput,
};
hwSets["hiragana-ro2ja-ha-wa"] = {
  title: "Hiragana Romanized to Kana (HA to WA)", category: "Japanese", columns: 5,
  myGenEqList: () => shuffleEqSetRo2Ja(hiraganaSets["HA-WA"]), outputFunc: jpOutput,
};
hwSets["hiragana-ro2ja-digraphs"] = {
  title: "Hiragana Digraphs Romanized to Kana", category: "Japanese", columns: 5,
  myGenEqList: () => shuffleEqSetRo2Ja(hiraganaSets["Digraphs"]), outputFunc: jpOutput,
};
hwSets["hiragana-ja2ro-a-na"] = {
  title: "Hiragana Kana to Romanized (A to NA)", category: "Japanese", columns: 5,
  myGenEqList: () => shuffleEqSetJa2Ro(hiraganaSets["A-NA"]), outputFunc: jpOutput,
};
hwSets["hiragana-ja2ro-ha-wa"] = {
  title: "Hiragana Kana to Romanized (HA to WA)", category: "Japanese", columns: 5,
  myGenEqList: () => shuffleEqSetJa2Ro(hiraganaSets["HA-WA"]), outputFunc: jpOutput,
};
hwSets["hiragana-ja2ro-digraphs"] = {
  title: "Hiragana Digraphs Kana to Romanized", category: "Japanese", columns: 5,
  myGenEqList: () => shuffleEqSetJa2Ro(hiraganaSets["Digraphs"]), outputFunc: jpOutput,
};

hwSets["katakana-ro2ja-a-na"] = {
  title: "Katakana Romanized to Kana (A to NA)", category: "Japanese", columns: 5,
  myGenEqList: () => shuffleEqSetRo2Ja(katakanaSets["A-NA"]), outputFunc: jpOutput,
};
hwSets["katakana-ro2ja-ha-wa"] = {
  title: "Katakana Romanized to Kana (HA to WA)", category: "Japanese", columns: 5,
  myGenEqList: () => shuffleEqSetRo2Ja(katakanaSets["HA-WA"]), outputFunc: jpOutput,
};
hwSets["katakana-ro2ja-digraphs"] = {
  title: "Katakana Digraphs Romanized to Kana", category: "Japanese", columns: 5,
  myGenEqList: () => shuffleEqSetRo2Ja(katakanaSets["Digraphs"]), outputFunc: jpOutput,
};
hwSets["katakana-ja2ro-a-na"] = {
  title: "Katakana Kana to Romanized(A to NA)", category: "Japanese", columns: 5,
  myGenEqList: () => shuffleEqSetJa2Ro(katakanaSets["A-NA"]), outputFunc: jpOutput,
};
hwSets["katakana-ja2ro-ha-wa"] = {
  title: "Katakana Kana to Romanized (HA to WA)", category: "Japanese", columns: 5,
  myGenEqList: () => shuffleEqSetJa2Ro(katakanaSets["HA-WA"]), outputFunc: jpOutput,
};
hwSets["katakana-ja2ro-digraphs"] = {
  title: "Katakana Digraphs Kana to Romanizeda", category: "Japanese", columns: 5,
  myGenEqList: () => shuffleEqSetJa2Ro(katakanaSets["Digraphs"]), outputFunc: jpOutput,
};