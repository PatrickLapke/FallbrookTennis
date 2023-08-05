const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Do you have the correct connection string? (yes/no) ",
  (answer) => {
    if (answer.toLowerCase() !== "yes") {
      console.log("Tests cancelled.");
      process.exit(1); // Exit with an error code to prevent tests from running
    }
    console.log("Starting tests...");
    rl.close();
  }
);
