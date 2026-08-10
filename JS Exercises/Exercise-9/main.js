let Car = {
  Make: "Mc Hamuda",
  type: "Car",
  Model: 13,
  year: 2020,
  start: function () {
    console.log("The", this.type, "Has Been Started!");
  },
};

console.log(Car.start());
