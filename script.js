document.addEventListener("scroll", (e) => {
  const height = window.scrollY;
  if (height >= 20) {
    document.querySelector("header").style.marginTop = "-10.5rem";
  }
  if (height < 20) {
    document.querySelector("header").style.marginTop = "0";
  }
  console.log(height);
});
