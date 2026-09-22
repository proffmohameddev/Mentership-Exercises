//  1
db.students.insertMany([
  { name: "proff", point: 100, email: "proff.com", couses: ["React", "JS"] },
  { name: "Moha", point: 80, email: "moha.com", couses: ["HTML", "Next"] },
  { name: "alex", point: 90, email: "alex.com", couses: ["CSS", "JS"] },
]);

// 2

db.students.updateOne(
  { name: "proff" },
  { $set: { email: "proff@dugsiiye.com" } },
);

// 3

db.students.updateOne({ name: "Moha" }, { $inc: { points: 85 } });

// 4

db.students.updateOne({ name: "alex" }, { $push: { courses: "MongoDB" } });

// 5

db.students.updateOne({ name: "alex" }, { $pull: { courses: "JS" } });

// 6

db.students.updateOne(
  { name: "proff" },
  {
    $set: { email: "proff.com" },
    $inc: { points: 98 },
    $push: { courses: "SQL" },
  },
);
