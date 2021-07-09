// JavaScript source code
const flatten = function (ary)
{
    if (!Array.isArray(ary))
    {
        return "Input Error";
    }
    var NewArray = [];
    for (var i = 0; i < ary.length; i++) {
        if (Array.isArray(ary[i])) {
            NewArray = NewArray.concat(flatten(ary[i]));
        } else {
            NewArray.push(ary[i]);
        }
    }
    return NewArray;
}
module.exports = { flatten };