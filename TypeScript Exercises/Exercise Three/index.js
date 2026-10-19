"use strict";
function fullName(first, last) {
    return first + " " + last;
}
console.log(fullName("Amina", "Hassan"));
function registerUser(username, isAdmin, language = "en") {
    console.log("Username:", username);
    console.log("Is admin:", isAdmin ?? false);
    console.log("Language:", language);
}
registerUser("amina");
registerUser("omar", true);
registerUser("hodan", false, "so");
function average(...scores) {
    if (scores.length === 0)
        return 0;
    const total = scores.reduce((sum, s) => sum + s, 0);
    return total / scores.length;
}
console.log(average(80, 90, 70));
console.log(average(60, 75, 90, 85));
console.log(average(100, 95, 85, 70, 90));
console.log(average());
