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
var result = [];             0123456789012345
while (match = XRegExp.exec('<1><2><3><4>abz<6>', /<(\d+)>/, pos, 'sticky')) {
    result.push(match[1]);
    pos = match.index + match[0].length;
}
console.log(result); // result -> ['2', '3', '4']
