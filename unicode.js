var XRegExp = require('xregexp');

// Categories
let r = XRegExp('\\p{Sc}\\pN+'); // Sc: currency symbol, N: number

console.log(r.test("€32")); // true

// Scripts
console.log(XRegExp('\\p{Cyrillic}').test("Б")); // true
console.log(XRegExp('[\\p{Latin}\\p{Common}]').test("ñ❦")); // Floral heart u2766

// Blocks (use 'In' prefix)
XRegExp('\\p{InLatinExtended-A}');
XRegExp('\\P{InPrivateUseArea}'); // Uppercase \P for negation
console.log("Mongolian "+XRegExp('\\p{^InMongolian}').test("ᠠ")); // False: Alternate negation syntax Unicode Character 'MONGOLIAN LETTER A' (U+1820)

// Properties
XRegExp('\\p{ASCII}');
XRegExp('\\p{Assigned}');

// In action...

var unicodeWord = XRegExp("^\\pL+$"); // L: Letter
console.log(unicodeWord.test("Русский")); // true
console.log(unicodeWord.test("日本語")); // true
console.log(unicodeWord.test("العربية")); // true

console.log(XRegExp("^\\p{Katakana}+$").test("カタカナ")); // true

/*
By default, \p{…} and \P{…} support the Basic Multilingual Plane (i.e. code points up to U+FFFF). You can opt-in to full 21-bit Unicode support (with code points up to U+10FFFF) on a per-regex basis by using flag A. In XRegExp, this is called astral mode. You can automatically add flag A for all new regexes by running XRegExp.install('astral'). When in astral mode, \p{…} and \P{…} always match a full code point rather than a code unit, using surrogate pairs for code points above U+FFFF.
*/

// Using flag A to match astral code points
XRegExp('^\\pS$').test('💩'); // -> false
XRegExp('^\\pS$', 'A').test('💩'); // -> true
XRegExp('(?A)^\\pS$').test('💩'); // -> true
// Using surrogate pair U+D83D U+DCA9 to represent U+1F4A9 (pile of poo)
XRegExp('(?A)^\\pS$').test('\uD83D\uDCA9'); // -> true

// Implicit flag A
XRegExp.install('astral');
XRegExp('^\\pS$').test('💩'); // -> true
/*
Opting in to astral mode disables the use of \p{…} and \P{…} within character classes. In astral mode, use e.g. (\pL|[0-9_])+ instead of [\pL0-9_]+.
*/