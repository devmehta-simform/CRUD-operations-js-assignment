document.addEventListener("scroll", (e) => {
  const height = window.scrollY;
  if (height >= 15) {
    document.querySelector("header").style.marginTop = "-30vh";
  } else if (height < 30) {
    document.querySelector("header").style.marginTop = "0";
  }
});
const section = document.querySelector("section");
document.querySelectorAll("a").forEach((aEle) => {
  aEle.addEventListener("click", (e) => {
    e.preventDefault();
    route(e);
  });
});
function route(e) {
  const currlink = document.querySelector(".current_link");
  const newlink = document.querySelector("#" + e.target.id);
  currlink.classList = "";
  newlink.classList = "current_link";
  const currele = section.querySelector(".current_page");
  const newele = section.querySelector("#" + e.target.id.split("_link")[0]);
  currele.className = "";
  newele.className = "current_page";
}
