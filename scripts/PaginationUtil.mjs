let pagOffset = localStorage.getItem("pagOffset")
  ? parseInt(localStorage.getItem("pagOffset"))
  : (() => {
      localStorage.setItem("pagOffset", 1);
      return 1;
    })();
let currbtn = 1;
let className;
document.querySelector("#pagination-input")?.addEventListener("change", (e) => {
  pagOffset = parseInt(e.target.value);
  localStorage.setItem("pagOffset", pagOffset);
  window.location.reload();
});
export function HandlePagination(
  classNameArg,
  pagOffset = parseInt(localStorage.getItem("pagOffset"))
) {
  className = classNameArg;
  document.querySelector(`.${className}-pagination-btns-container`).innerHTML =
    "";
  initPagBtns(
    document.querySelector(`.${className}-pagination-btns-container`),
    document.querySelectorAll(
      `.${className}-items-container .${className}-item`
    ).length,
    pagOffset
  );
  // }
  handleProducts(currbtn, pagOffset);
}

function initPagBtns(parentEle, nitems, pagOffset) {
  const nbtns = Math.ceil(parseFloat(nitems) / parseFloat(pagOffset));
  // console.log("initPagBtns nbtns", nbtns);
  for (let i = 1; i <= nbtns; i++) {
    const btn = document.createElement("button");
    btn.id = `btn-${i}`;
    btn.classList.add("pagination-btn", `${className}-pag-btn`);
    btn.textContent = i;
    btn.addEventListener("click", (e) => {
      handleProducts(e.target.id.split("-")[1], pagOffset);
    });
    parentEle.appendChild(btn);
  }
  //   <button class="pagination-btn" id="btn-1">1</button><button class="pagination-btn" id="btn-2">2</button><button class="pagination-btn" id="btn-3">3</button><button class="pagination-btn" id="btn-4">4</button><button class="pagination-btn" id="btn-5">5</button>
}

function handleProducts(btnid, pagOffset) {
  // console.log("handlePagination btnid", btnid);
  // console.log("handlePagination pageOffset", btnid);
  // console.log("init", btnid);
  const items = document.querySelectorAll(
    `.${className}-items-container .${className}-item`
  );

  if (btnid > Math.ceil(parseFloat(items.length) / parseFloat(pagOffset))) {
    btnid = 1;
  }
  //   5 10 15 20
  //   1 -> 1-5
  //   2 -> 6-10
  //   3 -> 11-15
  //   4 -> 16
  items.forEach((item, i) => {
    // const itemId = parseInt(item.id.split("-")[2]);
    const tmpval = btnid * pagOffset - i;
    // console.log(
    //   "btnid",
    //   btnid,
    //   "pageoffset",
    //   pagOffset,
    //   "i",
    //   i,
    //   "tmpval",
    //   tmpval
    // );

    if (tmpval > 0 && tmpval <= pagOffset) {
      // console.clear();
      // console.log(i, tmpval);
      //   if (tmpval == 0 || i == items.length - 1) {
      //     item.style.borderBottom = "2px solid gray";
      //   }
      item.classList.contains("hide")
        ? item.classList.replace("hide", "show")
        : item.classList.add("show");
      //   if (tmpval == 0) item.style.border = "none";
    } else {
      // console.clear();
      // console.log(i, tmpval);
      //   item.style.display = "none";
      item.classList.contains("show")
        ? item.classList.replace("show", "hide")
        : item.classList.add("hide");
    }
  });
  document
    .querySelector(`.pagination-btn.${className}-pag-btn#btn-${currbtn}`)
    ?.classList.remove("current-pag-btn");
  document
    .querySelector(`.pagination-btn.${className}-pag-btn#btn-${btnid}`)
    ?.classList.add("current-pag-btn");
  window.scrollTo(0, 0);
  currbtn = btnid;
}
