const pagOffset = 5;
let currbtn = 1;

export function HandleServicesPagination() {
  if (
    !document
      .querySelector(".services-pagination-btns-container")
      .hasChildNodes()
  ) {
    initPagBtns(
      document.querySelector(".services-pagination-btns-container"),
      document.querySelectorAll(".services-items-container .services-item")
        .length,
      pagOffset
    );
  }
  handlePagination(currbtn);
}

function initPagBtns(parentEle, nitems, offset) {
  const nbtns = Math.ceil(parseFloat(nitems) / parseFloat(offset));
  //   console.log(nbtns);
  for (let i = 1; i <= nbtns; i++) {
    const btn = document.createElement("button");
    btn.id = `btn-${i}`;
    btn.classList.add("pagination-btn");
    btn.textContent = i;
    btn.addEventListener("click", (e) => {
      handlePagination(e.target.id.split("-")[1]);
    });
    parentEle.appendChild(btn);
  }
  //   <button class="pagination-btn" id="btn-1">1</button><button class="pagination-btn" id="btn-2">2</button><button class="pagination-btn" id="btn-3">3</button><button class="pagination-btn" id="btn-4">4</button><button class="pagination-btn" id="btn-5">5</button>
}

function handlePagination(btnid) {
  //   console.log(btnid);

  const servicesItems = document.querySelectorAll(
    ".services-items-container .services-item"
  );
  //   5 10 15 20
  //   1 -> 1-5
  //   2 -> 6-10
  //   3 -> 11-15
  //   4 -> 16
  servicesItems.forEach((servicesItem, i) => {
    const servicesItemId = parseInt(servicesItem.id.split("-")[2]);
    const tmpval = btnid * pagOffset - servicesItemId;

    if (tmpval >= 0 && tmpval < pagOffset) {
      if (tmpval == 0 || i == servicesItems.length - 1) {
        servicesItem.style.borderBottom = "2px solid gray";
      }
      servicesItem.classList.contains("hide")
        ? servicesItem.classList.replace("hide", "show")
        : servicesItem.classList.add("show");
      //   if (tmpval == 0) servicesItem.style.border = "none";
    } else {
      //   servicesItem.style.display = "none";
      servicesItem.classList.contains("show")
        ? servicesItem.classList.replace("show", "hide")
        : servicesItem.classList.add("hide");
    }
  });
  document
    .querySelector(`.pagination-btn#btn-${currbtn}`)
    ?.classList.remove("current-pag-btn");
  document
    .querySelector(`.pagination-btn#btn-${btnid}`)
    ?.classList.add("current-pag-btn");
  window.scrollTo(0, 0);
  currbtn = btnid;
}
