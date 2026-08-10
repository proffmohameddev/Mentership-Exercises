function operate(a, b, callback) {
  return callback(a, b);
}

// Mutiply

function multply(a, b) {
  return a * b;
}

// Divide

function divide(a, b) {
  return a / b;
}

console.log("Multiplition:", operate(5, 5, multply));

console.log("Dividetion:", operate(10, 5, divide));
