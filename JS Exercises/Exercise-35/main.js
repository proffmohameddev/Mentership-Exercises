function changeImage() {
  const image = document.querySelector("#image");

  const url = prompt("Please enter your image url");
  const border = prompt("Please enter your Border Color");
  const width = prompt("Please enter your Width");
  const high = prompt("Please enter your hight");
  const borderRadius = prompt("Please enter your border Radius");

  image.setAttribute("src", url);
  image.style.border = `3px solid ${border}`;
  image.setAttribute("width", width);
  image.setAttribute("height", high);
  image.style.borderRadius = `${borderRadius}px`;
}
