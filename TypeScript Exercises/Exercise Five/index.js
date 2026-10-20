"use strict";
//  1. Echo Function with Generics
function echo(input) {
    return input;
}
const a = echo("Hello");
const b = echo(42);
const c = echo([1, 2, 3]);
const d = echo({ id: 1, name: "Ahmed" });
console.log(a.toUpperCase());
console.log(b.toFixed(2));
console.log(c.map((n) => n * 2));
console.log(d.name);
const textResult = {
    status: "success",
    data: "Hello from API",
};
const userResult = {
    status: "success",
    data: { id: 1, name: "Ahmed" },
};
console.log(textResult.data.toUpperCase());
console.log(userResult.data.name);
//  3. First Element Function
function first(items) {
    return items[0];
}
const firstNum = first([10, 20, 30]);
const firstStr = first(["apple", "banana"]);
const firstObj = first([
    { id: 1, name: "Ahmed" },
    { id: 2, name: "Hodan" },
]);
console.log(firstNum.toFixed(1));
console.log(firstStr.toUpperCase());
console.log(firstObj.name);
function echo(input) {
    return input;
}
const a = echo("Hello");
const b = echo(42);
const c = echo([1, 2, 3]);
const d = echo({ id: 1, name: "Ahmed" });
console.log(a.toUpperCase());
console.log(b.toFixed(2));
console.log(c.map((n) => n * 2));
console.log(d.name);
const textResult = {
    status: "success",
    data: "Hello from API",
};
const userResult = {
    status: "success",
    data: { id: 1, name: "Ahmed" },
};
console.log(textResult.data.toUpperCase());
console.log(userResult.data.name);
// 3. First Element Function
function first(items) {
    return items[0];
}
const firstNumber = first([10, 20, 30]);
const firstString = first(["apple", "banana"]);
const firstObject = first([
    { id: 1, name: "Ahmed" },
    { id: 2, name: "Hodan" },
]);
console.log(firstNum.toFixed(1));
console.log(firstStr.toUpperCase());
console.log(firstObj.name);
