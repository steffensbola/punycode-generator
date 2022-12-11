/* 
  Homoglyps are characters that resemble each other.
  Unicode characters can look the same to the naked eye but actually, have a different web address. 
  Some letters in the Roman alphabet, used by the majority of modern languages, are the same shape as letters in Greek, 
  Cyrillic, and other alphabets, so it’s easy for an attacker to launch a domain name that replaces some ASCII 
  characters with Unicode characters.
*/
String.prototype.replaceAt = function (pos, ch) {
    return [this.substr(0, pos), ch, this.substr(pos + 1)].join('');
};

/* map for homoglyphs */
var homos = new Array();
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
  Time and numer of results grow exponentially with the lenght of the input string. 
  Something like O(n^8).
/*
const puny = (domain: string): string[] => {
    let input = domain.split('')
    let output = [domain]
    index = 0
    for (const l of input) {
        console.log(l)
        let homo = homos[l]
        let tmpout = output.slice()
        for (const out of tmpout) {
            for (const variation of homo ?? []) {
                output.push(out.replaceAt(index, variation))
            }
        }
        index++
    }
    return output
}

# test
o = puny('ama')
console.log('output ', o.length, o)

