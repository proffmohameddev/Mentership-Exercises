function fullName(first: string, last: string): string {
  return first + " " + last;
}

console.log(fullName("Amina", "Hassan"));
function registerUser(
  username: string,
  isAdmin?: boolean,
  language: string = "en",
): void {
  console.log("Username:", username);
  console.log("Admin:", isAdmin ?? false);
  console.log("Language:", language);
}

registerUser("amina");
registerUser("omar", true);
registerUser("sahra", false, "so");

function average(...scores: number[]): number {
  if (scores.length === 0) return 0;
  const total = scores.reduce((sum, score) => sum + score, 0);
  return total / scores.length;
}

console.log(average(80, 90, 100));
console.log(average(70, 85, 90, 95, 60));
console.log(average());
