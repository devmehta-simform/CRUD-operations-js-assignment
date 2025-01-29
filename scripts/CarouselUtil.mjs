// handling carousel
const carousel = document.querySelector(".carousel");
for (let i = 0; i < 3; i++) {
  const imgele = document.createElement("img");
  imgele.setAttribute(
    "src",
    `https://picsum.photos/seed/${Math.random() * 100}/1280/720`
  );
  if (i == 0) {
    imgele.className = "current_img";
  }
  carousel.appendChild(imgele);
}
const carouselNextBtn = document.querySelector(".carousel-next");
const carouselPrevBtn = document.querySelector(".carousel-prev");

carouselNextBtn.addEventListener("click", (e) => {
  const firstChild = carousel.firstChild;
  firstChild.className = "";
  carousel.removeChild(firstChild);
  const secondChild = carousel.firstChild;
  carousel.appendChild(firstChild);
  secondChild.offsetHeight; // kinda forcing browser to apply styling after dom is loaded
  secondChild.className = "current_img";
});

carouselPrevBtn.addEventListener("click", (e) => {
  const firstChild = carousel.firstChild;
  firstChild.className = "";
  const lastChild = carousel.lastChild;
  carousel.removeChild(lastChild);
  carousel.insertBefore(lastChild, firstChild);
  lastChild.offsetHeight; // kinda forcing browser to apply styling after dom is loaded
  lastChild.className = "current_img";
});
let slideShowInterval = null;
export function startSlideShow() {
  slideShowInterval = setInterval(() => carouselNextBtn.click(), 5000);
}
export function stopSlideShow() {
  clearInterval(slideShowInterval);
}
