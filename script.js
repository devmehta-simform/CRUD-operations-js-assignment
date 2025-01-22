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
  }
}

const carousel = document.querySelector(".carousel");
for (let i = 0; i < 3; i++) {
  const imgele = document.createElement("img");
  imgele.setAttribute(
    "src",
    `https://picsum.photos/seed/${Math.random() * 100}/1280/720`
  );
  if (i != 0) {
    imgele.style.opacity = "0";
    imgele.style.visibility = "hidden";
  }
  carousel.appendChild(imgele);
}
const carouselNextBtn = document.querySelector(".carousel-next");
const carouselPrevBtn = document.querySelector(".carousel-prev");

carouselNextBtn.addEventListener("click", (e) => {
  const firstChild = carousel.firstChild;
  firstChild.style.opacity = "0";
  firstChild.style.visibility = "hidden";
  // firstChild.style.marginRight = "slideOut 1s ease-in-out;";
  carousel.removeChild(firstChild);
  const secondChild = carousel.firstChild;
  carousel.appendChild(firstChild);
  secondChild.offsetHeight; // kinda forcing browser to apply styling after dom is loaded
  secondChild.style.opacity = "1";
  secondChild.style.visibility = "visible";
  // secondChild.style.marginRight = "slideIn 1s ease-in-out;";
});

carouselPrevBtn.addEventListener("click", (e) => {
  const firstChild = carousel.firstChild;
  firstChild.style.opacity = "0";
  firstChild.style.visibility = "hidden";
  const lastChild = carousel.lastChild;
  carousel.removeChild(lastChild);
  carousel.insertBefore(lastChild, firstChild);
  lastChild.offsetHeight; // kinda forcing browser to apply styling after dom is loaded
  lastChild.style.opacity = "1";
  lastChild.style.visibility = "visible";
});
let slideShowInterval = null;
function startSlideShow() {
  slideShowInterval = setInterval(() => carouselNextBtn.click(), 5000);
}

window.addEventListener("beforeunload", function () {
  clearInterval(slideShowInterval);
});
