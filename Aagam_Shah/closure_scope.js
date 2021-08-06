const ab = 20;
function outer() {
    const abc = 20;
    const b = 20;
    function inner() {
        if(true){
            let a = 10;
            console.log(a);
        }
        console.log(b, abc);
        console.log(ab);
    }
    return inner;
}

function abcd (){
    const innerFun = outer();
    innerFun();
    innerFun();
}
// abcd();

const innerFun = outer();
innerFun();
innerFun();
console.log(ab);

// scope
// global 
// function 
// block // if, for, while .... let, const are block
// var, let, const


// top level abc 
        // outer execution abc, b
                // inner
// innerFub decalred has a ref inner                
// innerFun execution 
                        // if block a
                    // a  not accessable



//interview que
// x() //100
// x() //100
// x(200) //200
// x() //200
// x(300) //300
// x() //300

function outer() {
  var a = 100;
  function inner(b) {
    a = b ? b : a
    console.log(a)
  }
  return inner
}

x = outer()
x()
x()
x(200)
x()
x(300)
x()