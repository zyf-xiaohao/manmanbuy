var sj=localStorage.getItem('obj');
// console.log(sj);
sj1 = JSON.parse(sj)
console.log(sj1)

var productName = sj1.productName;
var productPrice = sj1.productPrice;
var src = sj1.src;

document.getElementById('img').src = src;
document.getElementById('one').innerText= productName;
document.getElementById('two').innerText= productPrice;






