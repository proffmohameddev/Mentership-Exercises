async function fechUdata() {
  console.log("Starting Fetch Data");

  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  const data = await response.json();

  console.log("Response :", data[0].title);
  console.log("Response :", data[0].body);
  console.log("Response :", data);
}

fechUdata();
