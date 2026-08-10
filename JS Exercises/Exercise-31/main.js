async function getUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response) {
      throw new Error(`HTTP Error ${response.status}`);
    }

    const data = await response.json();

    console.log(data);
  } catch (error) {
    (console, console.log(error));
  }
}

getUsers();
