const hiraganaCsv = "あ,a,い,i,う,u,え,e,お,o,か,ka,き,ki,く,ku,け,ke,こ,ko,さ,sa,し,shi,す,su,せ,se,そ,so,た,ta,ち,chi,つ,tsu,て,te,と,to,な,na,に,ni,ぬ,nu,ね,ne,の,no,は,ha,ひ,hi,ふ,hu,へ,he,ほ,ho,ま,ma,み,mi,む,mu,め,me,も,mo,や,ya,ゆ,yu,よ,yo,ら,ra,り,ri,る,ru,れ,re,ろ,ro,わ,wa,を,wo,ん,n,が,ga,ぎ,gi,ぐ,gu,げ,ge,ご,go,ざ,za,じ,ji,ず,zu,ぜ,ze,ぞ,zo,だ,da,ぢ,ji,づ,zu,で,de,ど,do,ば,ba,び,bi,ぶ,bu,べ,be,ぼ,bo,ぱ,pa,ぴ,pi,ぷ,pu,ぺ,pe,ぽ,po,きゃ,kya,きゅ,kyu,きょ,kyo,しゃ,sha,しゅ,shu,しょ,sho,ちゃ,cha,ちゅ,chu,ちょ,cho,にゃ,nya,にゅ,nyu,にょ,nyo,ひゃ,hya,ひゅ,hyu,ひょ,hyo,みゃ,mya,みゅ,myu,みょ,myo,りゃ,rya,りゅ,ryu,りょ,ryo,ぎゃ,gya,ぎゅ,gyu,ぎょ,gyo,じゃ,ja,じゅ,ju,じょ,jo,びゃ,bya,びゅ,byu,びょ,byo,ぴゃ,pya,ぴゅ,pyu,ぴょ,pyo";
const katakanaCsv = "ア,a,イ,i,ウ,u,エ,e,オ,o,カ,ka,キ,ki,ク,ku,ケ,ke,コ,ko,サ,sa,シ,shi,ス,su,セ,se,ソ,so,タ,ta,チ,chi,ツ,tsu,テ,te,ト,to,ナ,na,ニ,ni,ヌ,nu,ネ,ne,ノ,no,ハ,ha,ヒ,hi,フ,hu,ヘ,he,ホ,ho,マ,ma,ミ,mi,ム,mu,メ,me,モ,mo,ヤ,ya,ユ,yu,ヨ,yo,ラ,ra,リ,ri,ル,ru,レ,re,ロ,ro,ワ,wa,ヲ,wo,ン,n,ガ,ga,ギ,gi,グ,gu,ゲ,ge,ゴ,go,ザ,za,ジ,ji,ズ,zu,ゼ,ze,ゾ,zo,ダ,da,ヂ,ji,ヅ,zu,デ,de,ド,do,バ,ba,ビ,bi,ブ,bu,ベ,be,ボ,bo,パ,pa,ピ,pi,プ,pu,ペ,pe,ポ,po,キャ,kya,キュ,kyu,キョ,kyo,シャ,sha,シュ,shu,ショ,sho,チャ,cha,チュ,chu,チョ,cho,ニャ,nya,ニュ,nyu,ニョ,nyo,ヒャ,hya,ヒュ,hyu,ヒョ,hyo,ミャ,mya,ミュ,myu,ミョ,myo,リャ,rya,リュ,ryu,リョ,ryo,ギャ,gya,ギュ,gyu,ギョ,gyo,ジャ,ja,ジュ,ju,ジョ,jo,ビャ,bya,ビュ,byu,ビョ,byo,ピャ,pya,ピュ,pyu,ピョ,pyo,イィ,yi,イェ,ye,ヴァ,va,ヴィ,vi,ヴ,vu,ヴェ,ve,ヴォ,vo,ヴャ,vya,ヴュ,vyu,ヴョ,vyo,シェ,she,ジェ,je,チェ,che,スァ,swa,スィ,swi,スゥ,swu,スェ,swe,スォ,swo,スャ,sya,スュ,syu,スョ,syo,セィ,si,ズァ,zwa,ズィ,zwi,ズゥ,zwu,ズェ,zwe,ズォ,zwo,ズャ,zya,ズュ,zyu,ズョ,zyo,ゼィ,zi,ツァ,tsa,ツィ,tsi,ツェ,tse,ツォ,tso,テァ,tha,ティ,ti,テゥ,thu,テェ,tye,テォ,tho,テャ,tya,テュ,tyu,テョ,tyo,デァ,dha,ディ,di,デゥ,dhu,デェ,dye,デォ,dho,デャ,dya,デュ,dyu,デョ,dyo,トァ,twa,トィ,twi,トゥ,tu,トェ,twe,トォ,two,ドァ,dwa,ドィ,dwi,ドゥ,du,ドェ,dwe,ドォ,dwo,ファ,fa,フィ,fi,ホゥ,hu,フェ,fe,フォ,fo,フャ,fya,フュ,fyu,フョ,fyo,リィ,ryi,リェ,rye,ウァ,(wa),ウィ,wi,ウゥ,(wu),ウェ,we,ウォ,wo,ウャ,wya,ウュ,wyu,ウョ,wyo,クァ,kwa,クィ,kwi,クゥ,kwu,クェ,kwe,クォ,kwo,グァ,gwa,グィ,gwi,グゥ,gwu,グェ,gwe,グォ,gwo,ムァ,mwa,ムィ,mwi,ムゥ,mwu,ムェ,mwe,ムォ,mwo";

const csvToJaRo = csvStr => {
  const arr = csvStr.split`,`;
  return arr.reduce((prev, curr, i) => {
    if (i % 2) prev.push({ja: arr[i - 1], ro: curr});
    return prev;
  }, []);
};

const hiragana = csvToJaRo(hiraganaCsv);
const katakana = csvToJaRo(katakanaCsv);

const hiraganaSets = {
  "A-NA": hiragana.filter(({ro}) => ro === "chi" || (
    "aiueokstn".includes(ro[0]) && ro[1] !== "y"
    && !"sha,shu,sho,n".split`,`.includes(ro)
  )),
  "HA-WA": hiragana.filter(({ro}) => "hmyrw".includes(ro[0]) && ro[1] !== "y" || ro === "n"),
  //"Non-Digraphs": hiragana.filter(({ro}) => ro[1] !== "y"),
  "Digraphs": hiragana.filter(({ro}) => ro[1] === "y"),
};

const katakanaSets = {
  "A-NA": katakana.filter(({ro, ja}) => ro === "chi" || (
    "aiueokstnc".includes(ro[0])
    && !"yw".includes(ro[1])
    && !(ro.length === 2 && ja[0] === "ウ")
    && !"n,she,si,tsa,tsi,tse,tso,tha,ti,thu,tho,tu,sha,shu,sho,cha,chu,cho,che".split`,`.includes(ro)
  )),
  "HA-WA": katakana.filter(({ro}) => ro === "n" || ("hmyrw".includes(ro[0]) && ro[1] !== "y"
    && !"yi,ye,hu,wi,we,mwa,mwi,mwu,mwe,mwo".split`,`.includes(ro))),
  //"Non-Digraphs": katakana.filter(({ro}) => ro[1] !== "y"),
  "Digraphs": katakana.filter(({ro}) => ro[1] === "y"),
};

console.log(hiragana);


const printAllSets = set => {
  printSet(set, "A-NA")
  printSet(set, "HA-WA")
  printSet(set, "Digraphs")
};
const printSet = (set, name) => {
  console.log("===================", name)
  console.log(set[name].length, set[name])
  console.log(set[name].map(a => a.ro).join(","))
};
printAllSets(hiraganaSets);
printAllSets(katakanaSets);
