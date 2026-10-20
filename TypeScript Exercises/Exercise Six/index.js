"use strict";
//  1. UserRole Enum
var UserRole;
(function (UserRole) {
    UserRole["SuperAdmin"] = "superadmin";
    UserRole["Moderator"] = "moderator";
    UserRole["Viewer"] = "viewer";
})(UserRole || (UserRole = {}));
function canEdit(role) {
    return role !== UserRole.Viewer;
}
console.log(canEdit(UserRole.SuperAdmin)); // true
console.log(canEdit(UserRole.Moderator)); // true
console.log(canEdit(UserRole.Viewer)); // false
//  2. Type Assertion with `as`
const btn = document.querySelector("button");
const button = document.querySelector("button");
button.disabled = true;
