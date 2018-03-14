var XRegExp = require('xregexp');

// Categories
let r = XRegExp('\\p{Sc}\\pN+'); // Sc: currency symbol, N: number

console.log(r.test("€32")); // true
console.log("€६ (Devanagari 6) matches ", r.test("€६")); // ६ (Devanagari 6) true

// Scripts
console.log(XRegExp('\\p{Cyrillic}').test("Б")); // true

let id = XRegExp('[_\\pL][_\\pL\\pN]+'); // L: Letter, N: number
console.log("is id Русский६?: ",id.exec("Русский६")); // Russian and Devanagari
                                  // [ 'Русский६', index: 0, input: 'Русский६' ]
console.log("is id _Русский६?: ",id.exec("_Русский६")); // and underscore
                                  // [ '_Русский६', index: 0, input: '_Русский६' ]
console.log("is id ;_Русск:ий६?: ",id.exec(";_Русск:ий६")); 
                                 // [ '_Русск', index: 1, input: ';_Русск:ий६' ]

let number = XRegExp('\\pN+', "g"); // N: number
console.log("numbers in ६६७ (667)?: ",number.exec("६६७")); 
                                  // [ '६६७', index: 0, input: '६६७' ]
console.log("numbers in ६६७+६७*2?: ","६६७+६७*2".match(number)); 
                                  // [ '६६७', '६७', '2' ]
/*
 In Unicode, a *script* is a collection of letters and other written
 signs used to represent textual information in one or more writing
 systems.

 Some *scripts* support one and only one writing system
 and language, for example, Armenian. 
 
 Other scripts support many different writing systems; for example, the Latin script supports
 English, French, German, Italian, Vietnamese, Latin itself, and
 several other languages. Some languages make use of multiple
 alternate writing systems, thus also use several scripts.

 Unicode can assign a character in the UCS to a single script only.
 However, many characters — those that are not part of a formal
 natural language writing system or are unified across many writing
 systems may be used in more than one script. For example, currency
 signs, symbols, numerals and punctuation marks. In these cases
 Unicode defines them as belonging to the "common" script
 */
console.log("ñ❦".match(XRegExp('[\\p{Latin}\\p{Common}]', "g"))); // Floral heart u2766
                                                                  // [ 'ñ', '❦' ]

// Blocks (use 'In' prefix)
console.log("ĦƜ".match(XRegExp('\\p{InLatinExtended-A}', "g"))); // [ 'Ħ' ]

/*
   In Unicode, a Private Use Area (PUA) is a range of code points
   that, by definition, will not be assigned characters by the Unicode
   Consortium. 
   Currently, three private use areas are defined: one
   in the Basic Multilingual Plane (U+E000–U+F8FF), and one each in,
   and nearly covering, planes 15 and 16 (U+F0000–U+FFFFD,
   U+100000–U+10FFFD).
 */
console.log(XRegExp('\\P{InPrivateUseArea}').test("\u{F8FF}")); // Uppercase \P for negation

console.log("Mongolian "+XRegExp('\\p{^InMongolian}').test("ᠠ")); // False: Alternate negation syntax Unicode Character 'MONGOLIAN LETTER A' (U+1820)

// Properties
XRegExp('\\p{ASCII}');

console.log("\\u{0378} \u{0378} is unicode assigned? ", XRegExp('\\p{Assigned}').test("\u{0378}"));

// In action...

var unicodeWord = XRegExp("^\\pL+$"); // L: Letter
console.log(unicodeWord.test("Русский")); // true
console.log(unicodeWord.test("日本語")); // true
console.log(unicodeWord.test("العربية")); // true

console.log(XRegExp("^\\p{Katakana}+$").test("カタカナ")); // true

/*
  By default, \p{…} and \P{…} support the Basic Multilingual Plane
  (i.e. code points up to U+FFFF). 
  
  You can opt-in to full 21-bit Unicode support (with code points
  up to U+10FFFF) on a per-regex basis by using flag A. 
  
  In XRegExp, this is called astral mode. 
  
  You can automatically add flag A for all new regexes by running
  XRegExp.install('astral'). 
  
  When in astral mode, \p{…} and \P{…} always match a full code point rather than a code unit, using
  surrogate pairs for code points above U+FFFF.
*/

// Using flag A to match astral code points

console.log("Astral option");

// \p{S} or \p{Symbol}: math symbols, currency signs, dingbats, box-drawing characters, etc.
console.log(XRegExp('^\\pS$').test('💩')); // -> false
console.log(XRegExp('^\\pS$', 'A').test('💩')); // -> true
console.log(XRegExp('^\\pS$', 'A').test('A')); // -> false
console.log(XRegExp('^\\pS$', 'A').test('∰')); // -> true

// Setting the option A inside the regexp
XRegExp('(?A)^\\pS$').test('💩'); // -> true
//
// Using surrogate pair U+D83D U+DCA9 to represent U+1F4A9 (pile of poo)
XRegExp('(?A)^\\pS$').test('\uD83D\uDCA9'); // -> true

// Implicit flag A
XRegExp.install('astral');
XRegExp('^\\pS$').test('💩'); // -> true
/*
  Opting in to astral mode disables the use of \p{…} and \P{…} within
  character classes. 
  
  In astral mode, use e.g. (\pL|[0-9_])+ instead of [\pL0-9_]+.
*/
