import { Product } from "./ProductsUtil.mjs";

export function productsHandler() {
  if (
    document.querySelector(".products-items-container").hasChildNodes() == false
  )
    Product.getAll();
  const sortBydd = document.querySelector("#sortBy");
  //   console.log(sortBy);
  sortBydd.addEventListener("change", (e) => {
    // localStorage.setItem("sortBy", e.target.value);
    // console.log(e.target.value);
    const itemList = JSON.parse(localStorage.getItem("itemList"));
    switch (e.target.value) {
      case "idasc":
        itemList.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        break;
      case "nameasc":
        itemList.sort((a, b) => a.header.localeCompare(b.header));
        break;
      case "priceasc":
        itemList.sort((a, b) => parseFloat(a.footer) - parseFloat(b.footer));
        break;
      case "iddesc":
        itemList.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case "namedesc":
        itemList.sort((a, b) => b.header.localeCompare(a.header));
        break;
      case "pricedesc":
        itemList.sort((a, b) => parseFloat(b.footer) - parseFloat(a.footer));
        break;
    }
    Product.displayGivenList(itemList);
    // console.log(itemList);
  });
}
