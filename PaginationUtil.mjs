const pagOffset = 4;
let currbtn = 1;
let className;
export function HandlePagination(classNameArg) {
  className = classNameArg;
  if (
    !document
      .querySelector(`.${className}-pagination-btns-container`)
      .hasChildNodes()
  ) {
    initPagBtns(
      document.querySelector(`.${className}-pagination-btns-container`),
      document.querySelectorAll(
        `.${className}-items-container .${className}-item`
      ).length,
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

  const items = document.querySelectorAll(
    `.${className}-items-container .${className}-item`
  );
  //   5 10 15 20
  //   1 -> 1-5
  //   2 -> 6-10
  //   3 -> 11-15
  //   4 -> 16
  items.forEach((item, i) => {
    // const itemId = parseInt(item.id.split("-")[2]);
    const tmpval = btnid * pagOffset - i;

    if (tmpval > 0 && tmpval <= pagOffset) {
      console.clear();
      console.log(i, tmpval);
      //   if (tmpval == 0 || i == items.length - 1) {
      //     item.style.borderBottom = "2px solid gray";
      //   }
      item.classList.contains("hide")
        ? item.classList.replace("hide", "show")
        : item.classList.add("show");
      //   if (tmpval == 0) item.style.border = "none";
    } else {
      console.clear();
      console.log(i, tmpval);
      //   item.style.display = "none";
      item.classList.contains("show")
        ? item.classList.replace("show", "hide")
        : item.classList.add("hide");
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
