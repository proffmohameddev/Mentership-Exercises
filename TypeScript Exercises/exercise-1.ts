let productName: string = "Laptop";
let price: number = 999.99;
let discountAvailable: boolean = true;



productName = "Phone";
price = 499;
discountAvailable = false;

function getDiscount(price: number, discount: number): number {
  return price - price * discount;
}

console.log(getDiscount(100, 0.2)); // 80


function printLength(x: unknown): void {
  if (typeof x === "string" || Array.isArray(x)) {
    console.log(x.length);
  } else {
    console.log("This value has no length");
  }
}

printLength("Hello"); 
printLength(123);    

function printLengthSafe(x: { length: number }): void {
  console.log(x.length);
}

printLengthSafe("Hello");   
printLengthSafe([1, 2, 3]); 
