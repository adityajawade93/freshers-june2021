// JavaScript source code

const dublicate = function (arr)
{
    var i;
    var j;
    var f;
    f = 0;
    for (i = 0; i <= 8; ++i) {

        for (j = i + 1; j <= 8; ++j) {

            if (arr[i] === arr[j])
            {
                f++;
               return "true";
                break;
            }
            
        }

    }
    if (f == 0) { return "false";}
}


module.exports = { dublicate };