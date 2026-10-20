"use strict";
function fullName(first, last) {
    return first + " " + last;
}
console.log(fullName("Amina", "Hassan"));
function registerUser(username, isAdmin, language = "en") {
    console.log("Username:", username);
    console.log("Admin:", isAdmin ?? false);
    console.log("Language:", language);
}
registerUser("amina");
registerUser("omar", true);
registerUser("sahra", false, "so");
function average(...scores) {
    if (scores.length === 0)
        return 0;
    const total = scores.reduce((sum, score) => sum + score, 0);
    return total / scores.length;
}
console.log(average(80, 90, 100));
console.log(average(70, 85, 90, 95, 60));
console.log(average());
