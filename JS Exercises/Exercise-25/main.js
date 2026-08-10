// Spread Operator

const arr1 = [1, 2, 3];

const arrs = [...arr1, 4, 5, 6];

console.log(arrs);

// Spread Operator

function mult(...Numbers) {
  return Numbers.reduce((total, num) => total * num, 0);
}

console.log(mult(5, 3, 4, 40, 50));
