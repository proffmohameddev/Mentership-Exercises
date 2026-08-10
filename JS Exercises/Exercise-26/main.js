// --  Blocking= synchronous

function fetchsys() {
  alert("Fetching User Data");
  return { id: 1, name: "Proff" };
}

console.log("Starting fetching ");

const user = fetchsys();

console.log("User data");

console.log("This Message Is Blocking");

//  -Non Blocking

function getUdata(callback) {
  setTimeout(() => {
    const user = { id: 1, name: "Proff" };
    callback(user);
  }, 2000);
}

getUdata(function (user) {
  console.log(user);
});
