document.addEventListener("scroll", (e) => {
  const height = window.scrollY;
  if (height >= 15) {
    document.querySelector("header").style.marginTop = "-30vh";
  } else if (height < 30) {
    document.querySelector("header").style.marginTop = "0";
  }
});
const section = document.querySelector("section");
document.querySelectorAll("nav li").forEach((liEle) => {
  liEle.addEventListener("click", (e) => {
    e.preventDefault();
    route(e);
  });
});
function route(e) {
  const currlink = document.querySelector(".current_link");
  console.log(e.currentTarget.id);

  const newlink = document.querySelector("#" + e.currentTarget.id);
  currlink.classList = "";
  newlink.classList = "current_link";
  const currele = document.querySelector(".current_page");
  const newele = document.querySelector(
    "#" + e.currentTarget.id.split("_link")[0]
  );
  currele.className = "";
  newele.className = "current_page";
}
