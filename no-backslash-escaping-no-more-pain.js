var XRegExp = require('xregexp');

var parts = '/2015/09/xregexp.html'.match(XRegExp(`
    ^ # match at start of string only
    / (?<year> [^/]+ ) # capture top dir name as year
    / (?<month> [^/]+ ) # capture subdir name as month
    / (?<title> [^/]+ ) # capture base name as title
    \.html? $ # .htm or .html file ext at end of path
`, 'x'));

console.log(parts);
