function fechUdata() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const Success = true;

      if (Success) {
        resolve({ id: 1, name: "Proff" });
      } else {
        reject("User Data Error");
      }
    }, 2000);
  });
}

fechUdata()
  .then((data) => console.log("User Data", data))
  .catch((err) => console.log(err));
