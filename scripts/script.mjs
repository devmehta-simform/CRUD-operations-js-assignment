import { startSlideShow, stopSlideShow } from "./CarouselUtil.mjs";
// import { HandleServicesPagination } from "./ServicesPaginationUtil.mjs";
import { HandlePagination } from "./PaginationUtil.mjs";
import { productsHandler } from "./HandleProducts.mjs";
window.addEventListener("DOMContentLoaded", function () {
  const curr_id = localStorage.getItem("curr_id");
  if (curr_id != null) {
    route({ currentTarget: { id: curr_id } });
  }
  if (localStorage.getItem("itemList") === null) {
    localStorage.setItem("itemList", JSON.stringify([]));
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
  function isElementVisible(element) {
    const elementTop = element.offsetTop;
    const elementBottom = elementTop + element.offsetHeight;
    const viewportTop = window.scrollY;
    const viewportBottom = viewportTop + window.innerHeight;

    return elementBottom > viewportTop && elementTop < viewportBottom;
  }
  function toggleMeters(state) {
    const skillsMeterContainer = document.querySelector(
      ".skills-meters-container"
    );
    state === "show"
      ? skillsMeterContainer.classList.replace("hide", "show")
      : skillsMeterContainer.classList.replace("show", "hide");
  }
  if (isElementVisible(document.querySelector(".skills-meters-container"))) {
    // console.log("Element is visible in viewport");
    toggleMeters("show");
  } else {
    toggleMeters("hide");

    // console.log("Element is not visible in viewport");
  }
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

  if (e.currentTarget.id === "images_link") {
    startSlideShow();
  } else {
    stopSlideShow();
  }
  if (e.currentTarget.id === "services_link") {
    HandlePagination("services", 4);
  }
  if (e.currentTarget.id === "products_link") {
    productsHandler();
  }
  document.querySelectorAll("img").forEach((img) => {
    const checkImage = function (url, cb) {
      var s = document.createElement("IMG");
      s.src = url;
      s.onerror = function () {
        cb(false);
      };
      s.onload = function () {
        cb(true);
      };
    };
    checkImage(img.src, (exists) => {
      if (!exists) img.src = "./image.png";
    });
  });
  window.scrollTo(0, 0);
}

window.addEventListener("beforeunload", () => stopSlideShow());
