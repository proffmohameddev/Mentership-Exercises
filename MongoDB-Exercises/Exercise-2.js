//  1
db.students.find({ age: { $gt: 18 } });

// 2
db.students.find({ courses: "React" });

// 3

db.students.find({ name: { $regex: /^S/ } });

// 4

db.students.find({ age: { $in: [18, 22] } });

// 5

db.students.find({ email: { $not: /@gmail\\.com$/ } });

// 6

db.students.find({ age: { $gt: 20 }, courses: "React" });

// 7

db.students.find({ courses: ["React", "Node.js"] });

// 8

db.students.find({
  $or: [{ name: { $regex: /x/ } }, { email: { $regex: /@\.edu$/ } }],
});
