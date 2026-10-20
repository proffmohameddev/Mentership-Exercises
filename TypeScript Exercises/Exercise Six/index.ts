//  1. UserRole Enum
enum UserRole {
  SuperAdmin = "superadmin",
  Moderator = "moderator",
  Viewer = "viewer",
}

function canEdit(role: UserRole): boolean {
  return role !== UserRole.Viewer;
}

console.log(canEdit(UserRole.SuperAdmin)); // true
console.log(canEdit(UserRole.Moderator)); // true
console.log(canEdit(UserRole.Viewer)); // false

//  2. Type Assertion with `as`

const btn = document.querySelector("button");

const button = document.querySelector("button") as HTMLButtonElement;
button.disabled = true;
