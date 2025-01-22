import { startSlideShow, stopSlideShow } from "./CarouselUtil.mjs";
window.addEventListener("DOMContentLoaded", function () {
  const curr_id = localStorage.getItem("curr_id");
  if (curr_id != null) {
    route({ currentTarget: { id: curr_id } });
  }
});

let scrollPos = 0;
document.addEventListener("scroll", (e) => {
  //   const height = window.scrollY;
  //   if (height >= 15) {
  //     document.querySelector("header").className = "hide"; /*  = "-30vh"; */
  //   } else if (height < 30) {
  //     document.querySelector("header").className = "show";
  //   }
  let newScrollPos = window.scrollY;
  if (scrollPos < newScrollPos) {
    // down
    document.querySelector("header").className = "hide";
  } else {
    // up
    document.querySelector("header").className = "show";
  }
  scrollPos = newScrollPos;
});

// const section = document.querySelector("section");
document.querySelectorAll("nav li").forEach((liEle) => {
  liEle.addEventListener("click", (e) => {
    e.preventDefault();
    route(e);
  });
});

function route(e) {
  const currlink = document.querySelector(".current_link");
  const newlink = document.querySelector("#" + e.currentTarget.id);
  currlink.classList &&= "";
  newlink.classList = "current_link";
  const currele = document.querySelector(".current_page");
  const newele = document.querySelector(
    "#" + e.currentTarget.id.split("_link")[0]
  );
  currele.className &&= "";
  newele.className = "current_page";
  localStorage.setItem("curr_id", e.currentTarget.id);
  if (e.currentTarget.id == "images_link") {
    startSlideShow();
  } else {
    stopSlideShow();
  }
}

window.addEventListener("beforeunload", () => stopSlideShow());
