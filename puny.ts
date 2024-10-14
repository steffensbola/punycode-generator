/* eslint-disable dot-notation */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-extend-native */
/*
  Homoglyps are characters that resemble each other.
  Unicode characters can look the same to the naked eye but actually, have a different web address.
  Some letters in the Roman alphabet, used by the majority of modern languages, are the same shape
  as letters in Greek, Cyrillic, and other alphabets, so it’s easy for an attacker to launch a
  domain name that replaces some ASCII characters with Unicode characters.
*/
const replaceAt = (s: string, pos: number, ch: string) => `${s.slice(0, pos)}${ch}${s.slice(pos + 1)}`;

/* map for homoglyphs */
const homos = new Array();
homos[' '] = ' ᅟᅠ         　ㅤ';
homos['!'] = '!ǃ！';
homos['"'] = '"״″＂';
homos['$'] = '$＄';
homos['%'] = '%％';
homos['&'] = '&＆';
homos["'"] = "'＇";
homos['('] = '(﹝（';
homos[')'] = ')﹞）';
homos['*'] = '*⁎＊';
homos['+'] = '+＋';
homos[','] = ',‚，';
homos['-'] = '-‐𐆑－';
homos['.'] = '.٠۔܁܂․‧。．｡';
homos['/'] = '/̸⁄∕╱⫻⫽／ﾉ';
homos['0'] = "0OoΟοОоՕ𐒆Ｏｏ";
homos['o'] = 'Oo0ΟοОоՕ𐒆Ｏｏ';
homos['1'] = '1Iا１';
homos['2'] = '2２';
homos['3'] = '3３';
homos['4'] = '4４';
homos['5'] = '5５';
homos['6'] = '6６';
homos['7'] = '7𐒇７';
homos['8'] = '8Ց８';
homos['9'] = '9９';
homos[':'] = ':։܃܄∶꞉：';
homos[';'] = ';;；';
homos['<'] = '<‹＜';
homos['='] = '=𐆐＝';
homos['>'] = '>›＞';
homos['?'] = '?？';
homos['@'] = '@＠';
homos['['] = '[［';
homos['\\'] = '\\＼';
homos[']'] = ']］';
homos['^'] = '^＾';
homos['_'] = '_＿';
homos['`'] = '`｀';
homos['a'] = 'AaÀÁÂÃÄÅàáâãäåɑΑαаᎪＡａ';
homos['b'] = 'BbßʙΒβВЬᏴᛒＢｂ';
homos['c'] = 'CcϲϹСсᏟⅭⅽ𐒨Ｃｃ';
homos['d'] = 'DdĎďĐđԁժᎠḍⅮⅾＤｄ';
homos['e'] = 'EeÈÉÊËéêëĒēĔĕĖėĘĚěΕЕеᎬＥｅ';
homos['f'] = 'FfϜＦｆ';
homos['g'] = 'GgɡɢԌնᏀＧｇ';
homos['h'] = 'HhʜΗНһᎻＨｈ';
homos['i'] = 'IilɩΙІіاᎥᛁⅠⅰ𐒃Ｉｉ';
homos['j'] = 'JjϳЈјյᎫＪｊ';
homos['k'] = 'KkΚκКᏦᛕKＫｋ';
homos['l'] = 'LlʟιاᏞⅬⅼＬｌ';
homos['m'] = 'MmΜϺМᎷᛖⅯⅿＭｍ';
homos['n'] = 'NnɴΝＮｎ';
homos['0'] = "0OoΟοОоՕ𐒆Ｏｏ";
homos['o'] = 'Oo0ΟοОоՕ𐒆Ｏｏ';
homos['p'] = 'PpΡρРрᏢＰｐ';
homos['q'] = 'QqႭႳＱｑ';
homos['r'] = 'RrʀԻᏒᚱＲｒ';
homos['s'] = 'SsЅѕՏႽᏚ𐒖Ｓｓ';
homos['t'] = 'TtΤτТᎢＴｔ';
homos['u'] = 'UuμυԱՍ⋃Ｕｕ';
homos['v'] = 'VvνѴѵᏙⅤⅴＶｖ';
homos['w'] = 'WwѡᎳＷｗ';
homos['x'] = 'XxΧχХхⅩⅹＸｘ';
homos['y'] = 'YyʏΥγуҮＹｙ';
homos['z'] = 'ZzΖᏃＺｚ';
homos['{'] = '{｛';
homos['|'] = '|ǀا｜';
homos['}'] = '}｝';
homos['~'] = '~⁓～';
homos['ß'] = 'ßӧ';
homos['ä'] = 'ÄӒ';
homos['ö'] = 'ÖӦ';

/*
  Generate an array of candidate domains using homoglyphs.
  Time and number of results grow exponentially with the lenght of the input string.
  Something like O(n^8).
*/
const puny = (domain: string): string[] => {
  const input = domain.split('');
  const output = [domain];
  let index = 0;
  for (const l of input) {
    const homo = homos[l];
    const tmpout = output.slice();
    for (const out of tmpout) {
      for (const variation of homo ?? []) {
        output.push(replaceAt(out, index, variation));
      }
    }
    index += 1;
  }
  return output;
};


const isPunycodeDomain = (domain: string): boolean => {
  const input = domain.split('');
  for (const char of input) {
    if (!homos[char]?.length) {
      return true;
    }
  }
  return false;
};


// test
let o: string[] = [];
console.time('punycode-amazon');
for (let i = 0; i < 10; i++) {
  o = puny('amazon'); // 3.415.104 possible variations
}
console.timeEnd('punycode-amazon');
console.log('output ', o.length, o);

console.time('punycode-itau');
o = puny('itau'); // .99ms give or take -- 31.680 possible variations
console.timeEnd('punycode-itau');
console.log('output ', o.length, o);

let isPuny = false;
for(const domain of ["amazon","Àmazon",  "ÀΜazon", "ÀϺazon", "ÀМazon", "ÀᎷazon", "Àᛖazon",  "ÀⅯazon", "Àⅿazon", "ÀＭazon", "Àｍazon", "ÁMazon", "Ámazon"]){
  isPuny = isPunycodeDomain(domain);
  console.log(domain, isPuny);
}