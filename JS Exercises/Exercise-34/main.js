const list = document.querySelector("#list");

function addItem() {
  const additem = document.createElement("li");

  additem.textContent = "New Item";
  list.appendChild(additem);
}

// removeItem()

function removeItem() {
  if (list.lastChild) {
    list.removeChild(list.lastChild);
  } else {
    alert("Waa Dhamaatay");
  }
}
