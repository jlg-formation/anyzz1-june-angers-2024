console.log("a: ", a);
var a = "toto";
console.log("a: ", a);

toto();

function toto() {
  console.log("a: ", a);
  {
    var a = "titi";
    console.log("a: ", a);
  }
}
