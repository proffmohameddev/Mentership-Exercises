db.students.insertMany([
  { name: "proff", age: 21, email: "proff.com", couses: ["React", "JS"] },
  { name: "Moha", age: 21, email: "moha.com", couses: ["HTML", "Next"] },
  { name: "alex", age: 21, email: "alex.com", couses: ["CSS", "JS"] },
]);

db.students.find();

db.students.updateOne(
  { email: "alex.com" },

  { $set: { age: 22 } },
);

db.students.deleteOne({ name: "alex" });

db.students.insertMany([
  {
    name: "Alex",
    age: 21,
    email: "Alex.com",
    address: ["Somalia", "Mogadishu", "Banadir"],
    couses: ["CSS", "JS"],
  },
]);
