let peaople = [
  { name: "Proff", age: 18, year: 2020 },
  { name: "Moha", age: 20, year: 2028 },
  { name: "Alex", age: 15, year: 2024 },
];

for (const person of peaople) {
  for (const key in person) {
    console.log(key + " : " + person[key]);
  }

  console.log("---");
}
