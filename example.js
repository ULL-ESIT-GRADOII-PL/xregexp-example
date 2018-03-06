var XRegExp = require('xregexp');

// Using named capture and flag x (free-spacing and line comments)
var date = XRegExp(`(?<year>  \\d{4} ) -?  # year 
                    (?<month> \\d{2} ) -?  # month 
                    (?<day>   \\d{2} )     # day   `, 'x');

// XRegExp.exec gives you named backreferences on the match result
var match = XRegExp.exec('2015-02-22', date);
console.log(match); // -> [ '2015-02-22', '2015', '02', '22', index: 0, input: '2015-02-22', 
                    //       year: '2015', month: '02', day: '22' ]

// XRegExp.replace allows named backreferences in replacements
var format = XRegExp.replace('2005-01-22', date, '${day}/${month}/${year}');
console.log(format); // -> '22/01/2005'

var formatf = XRegExp.replace('2005-01-22', date, function(match) {
    return `${match.day}/${match.month}/${match.year}`;
});
console.log(formatf); // -> '22/01/2005'

// It also includes optional pos and sticky arguments
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky
var pos = 3;
var result = [];           //0123456789012345
while (match = XRegExp.exec('<1><2><3><4>abz<6>', /<(\d+)>/, pos, 'sticky')) {
    result.push(match[1]);
    pos = match.index + match[0].length;
}
console.log(result); // result -> ['2', '3', '4']

// In fact, XRegExps compile to RegExps and work perfectly with native methods
var result = date.test('2015-02-22');
console.log(result); // -> true


// The only caveat is that named captures must be referenced using numbered
// backreferences if used with native methods
result = '2005-01-22'.replace(date, '$3/$2/$1');
console.log(result); // -> '22/01/2005'

// Extract every other digit from a string using XRegExp.forEach
var evens = [];
XRegExp.forEach('1a2345', /\d/, function(match, i) {
    if (i % 2) evens.push(+match[0]);
});
console.log(evens); // evens -> [2, 4]


// Get numbers within <b> tags using XRegExp.matchChain
// mathChain returns an array (global style)
result = XRegExp.matchChain('1 <B>2</B> 3 <b>4 a\n56</b>', [
    XRegExp('(?is)<b>.*?</b>'), // options (?is) inside XRegExp i= ignore case s=  . matches every character 
    /\d+/
]);
console.log(result); // -> ['2', '4', '56']

// You can also pass forward and return specific backreferences
// http://xregexp.com/api/#matchChain
var html = '<a href="http://xregexp.com/">XRegExp</a>' +
           '<a href="http://www.google.com/">Google</a>';
result = XRegExp.matchChain(html, [
    {regex: /<a href="([^"]+)">/i, backref: 1},
]);
console.log(result); // -> [ 'http://xregexp.com/', 'http://www.google.com/' ]

result = XRegExp.matchChain(html, [
    {regex: XRegExp('(?i)https?://(?<domain>[^/"?#]+)'), backref: 'domain'}
]);
console.log(result); // -> ['xregexp.com', 'www.google.com']

// Merge strings and regexes into a single pattern with updated backreferences
// http://xregexp.com/api/#union
var merge = XRegExp.union(['a+b*c', /(dog)\1/, /(cat)\1/], 'i');
// Patterns can be provided as regex objects or strings. 
// Metacharacters are escaped in patterns provided as strings.
// Backreferences in provided regex objects are automatically renumbered 
// to work correctly within the larger combined pattern. 
// Native flags used by provided regexes are ignored in favor of the flags argument.
console.log(merge); // -> /a\+b\*c|(dog)\1|(cat)\2/i

result = XRegExp.match('... catcat ...', merge);
console.log(result); // catcat
result = XRegExp.match('dogDOG', merge);
console.log(result); // dogDOG
result = XRegExp.match('... a+b*c ...', merge);
console.log(result); // a+b*c

// http://xregexp.com/api/#matchRecursive
var str = '(t((e))s)t()(ing)';
result = XRegExp.matchRecursive(str, '\\(', '\\)', 'g');
console.log(result); // -> ['t((e))s', '', 'ing']

// Extended information mode with valueNames
str = 'Here is <div> <div>an</div></div> example <div > and </div> more';
result = XRegExp.matchRecursive(str, '<div\\s*>', '</div>', 'gi', {
  valueNames: ['between', 'left', 'match', 'right']
});
console.log(result); 
/* -> [ 
  { name: 'between', value: 'Here is ', start: 0, end: 8 },
  { name: 'left', value: '<div>', start: 8, end: 13 },
  { name: 'match', value: ' <div>an</div>', start: 13, end: 27 },
  { name: 'right', value: '</div>', start: 27, end: 33 },
  { name: 'between', value: ' example ', start: 33, end: 42 },
  { name: 'left', value: '<div >', start: 42, end: 48 },
  { name: 'match', value: ' and ', start: 48, end: 53 },
  { name: 'right', value: '</div>', start: 53, end: 59 },
  { name: 'between', value: ' more', start: 59, end: 64 } 
] */

// Omitting unneeded parts with null valueNames, and using escapeChar
//     012345678901234567890123456789012345678
str = `...{1};

// los bloques se abren con %{
{function(x,y){return {y:x}}}

`;
result = XRegExp.matchRecursive(str, '{', '}', 'g', {
  valueNames: ['literal', null, 'value', null],
  escapeChar: '%'
});
console.log(result); 
/* -> [
{name: 'literal', value: '...',  start: 0, end: 3},
{name: 'value',   value: '1',    start: 4, end: 5},
{name: 'literal', value: '.\\{', start: 6, end: 9},
{name: 'value',   value: 'function(x,y){return {y:x}}', start: 10, end: 37}
] */

// Sticky mode via flag y
str = '<1><<<2>>><3>4<5>';
result = XRegExp.matchRecursive(str, '<', '>', 'gy');
console.log(result); 
// -> ['1', '<<2>>', '3']
