"use strict";
let productName = "Laptop";
let price = 999.99;
let discountAvailable = true;

productName = "Phone";
price = 499;
discountAvailable = false;

function getDiscount(price, discount) {
    return price - price * discount;
}
console.log(getDiscount(100, 0.2)); 

function printLength(x) {
    if (typeof x === "string" || Array.isArray(x)) {
        console.log(x.length);
    }
    else {
        console.log("This value has no length");
    }
}
printLength("Hello"); 
printLength(123); 

function printLengthSafe(x) {
    console.log(x.length);
}
printLengthSafe("Hello"); 
printLengthSafe([1, 2, 3]); 