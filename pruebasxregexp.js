// Using named capture and flag x (free-spacing and line comments)
var date = XRegExp('(?<year>  [0-9]{4} ) -?  # year  \n\
                    (?<month> [0-9]{2} ) -?  # month \n\
                    (?<day>   [0-9]{2} )     # day   ', 'x');

// XRegExp.exec gives you named backreferences on the match result
var match = XRegExp.exec('2015-02-22', date);
console.log(match.year); // -> '2015'

// It also includes optional pos and sticky arguments
var pos = 3;
var result = [];
while (match = XRegExp.exec('<1><2><3><4>5<6>', /<(\d+)>/, pos, 'sticky')) {
    result.push(match[1]);
    pos = match.index + match[0].length;
}
console.log(result); // result -> ['2', '3', '4']

// XRegExp.replace allows named backreferences in replacements
result = XRegExp.replace('2015-02-22', date, '${month}/${day}/${year}');
console.log(result); // -> '02/22/2015'
result = XRegExp.replace('2015-02-22', date, function(match) {
    return match.month + '/' + match.day + '/' + match.year;
});
console.log(result); // -> '02/22/2015'

// In fact, XRegExps compile to RegExps and work perfectly with native methods
result = date.test('2015-02-22');
console.log(result); // -> true

// The only caveat is that named captures must be referenced using numbered
// backreferences if used with native methods
result = '2015-02-22'.replace(date, '$2/$3/$1');
console.log(result); // -> '02/22/2015'

// Extract every other digit from a string using XRegExp.forEach
var evens = [];
XRegExp.forEach('1a2345', /\d/, function(match, i) {
    if (i % 2) evens.push(+match[0]);
});
console.log(evens); // evens -> [2, 4]

// Get numbers within <b> tags using XRegExp.matchChain
result = XRegExp.matchChain('1 <b>2</b> 3 <b>4 a 56</b>', [
    XRegExp('(?is)<b>.*?</b>'),
    /\d+/
]);
console.log(result); // -> ['2', '4', '56']

// You can also pass forward and return specific backreferences
var html = '<a href="http://xregexp.com/">XRegExp</a>' +
           '<a href="http://www.google.com/">Google</a>';
result = XRegExp.matchChain(html, [
    {regex: /<a href="([^"]+)">/i, backref: 1},
    {regex: XRegExp('(?i)^https?://(?<domain>[^/?#]+)'), backref: 'domain'}
]);
console.log(result); // -> ['xregexp.com', 'www.google.com']

// Merge strings and regexes into a single pattern with updated backreferences
result = XRegExp.union(['a+b*c', /(dog)\1/, /(cat)\1/], 'i');
console.log(result); // -> /a\+b\*c|(dog)\1|(cat)\2/i
