"use strict";
// ===== 1. Doorsoomayaal leh nooc cad =====
let productName = "Laptop";
let price = 999.99;
let discountAvailable = true;
// Qalad (ka saar // si aad error u aragto):
// productName = 42;          // ❌ 'number' lama gelin karo 'string'
// price = "cheap";           // ❌ 'string' lama gelin karo 'number'
// discountAvailable = "yes"; // ❌ 'string' lama gelin karo 'boolean'
// Sixitaan:
productName = "Phone";
price = 499;
discountAvailable = false;
// ===== 2. Function-ka JS oo loo beddelay TypeScript =====
function getDiscount(price, discount) {
    return price - price * discount;
}
console.log(getDiscount(100, 0.2)); // 80
// getDiscount("100", 0.2);         // ❌ 'string' lama gelin karo 'number'
// ===== 3. `any` halis ah =====
// Nooca halista ah:
// function printLength(x: any) {
//   console.log(x.length);
// }
// printLength("Hello"); // 5
// printLength(123);     // undefined (qalad aamusan)
// printLength(null);    // 💥 TypeError
// Xalka A: `unknown` + type guard (waa ammaan wakhtiga socodka)
function printLength(x) {
    if (typeof x === "string" || Array.isArray(x)) {
        console.log(x.length);
    }
    else {
        console.log("This value has no length");
    }
}
printLength("Hello"); // 5
printLength(123); // "This value has no length"
// Xalka B: nooc xaddidan (waa ammaan wakhtiga compile-ka)
function printLengthSafe(x) {
    console.log(x.length);
}
printLengthSafe("Hello"); // ✅ 5
printLengthSafe([1, 2, 3]); // ✅ 3
// printLengthSafe(123);    // ❌ 'number' ma laha 'length'
