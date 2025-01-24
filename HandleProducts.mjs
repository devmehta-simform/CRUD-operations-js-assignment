import { Product } from "./ProductsUtil.mjs";

export function productsHandler() {
  if (
    document.querySelector(".products-items-container").hasChildNodes() == false
  )
    Product.getAll();
}
