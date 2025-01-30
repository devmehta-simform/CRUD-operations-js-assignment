// import { HandleProductsPagination } from "./ProductsPaginationUtil.mjs";
import { HandlePagination } from "./PaginationUtil.mjs";
export class Product {
  static #nextId = parseInt(JSON.parse(localStorage.getItem("nextId"))) || 100;
  static getAll() {
    const itemList = this.#itemList;
    // console.log(this.#container);

    itemList.forEach(({ header, link, body, footer, imgLink, id }) =>
      this.#createHtmlElement(header, link, body, footer, imgLink, id)
    );
    HandlePagination(
      "products",
      parseInt(document.querySelector("#pagination-input input")?.value) || 1
    );
  }
  static displayGivenList(list) {
    this.#container.innerHTML = null;
    list.forEach(({ header, link, body, footer, imgLink, id }) =>
      this.#createHtmlElement(header, link, body, footer, imgLink, id)
    );
    HandlePagination(
      "products",
      parseInt(document.querySelector("#pagination-input input")?.value) || 1
    );
  }
  static create({
    id = this.#nextId,
    header = "my item",
    link = "#",
    body = "this is my item",
    footer = "200$",
    imgLink = `https://picsum.photos/seed/${Math.random() * 100}/360/240`,
  }) {
    this.#nextId = this.#nextId + 1;
    this.#storeItemInLocalStorage({ id, header, link, body, footer, imgLink });
  }
  static update(item) {
    console.log(item);

    const ind = this.#itemList.findIndex((a) => a.id == item.id);
    const itemList = this.#itemList;
    itemList[ind] = item;
    // debugger;
    localStorage.setItem("itemList", JSON.stringify(itemList));
    // this.displayGivenList(itemList);
  }
  static #createHtmlElement(header, link, body, footer, imgLink, i) {
    const itemWrapper = document.createElement("div");
    itemWrapper.id = `products-item-${i}`;
    itemWrapper.classList.add("products-item");
    const itemContent = document.createElement("div");
    itemContent.classList.add("products-item-content");
    const itemHeader = document.createElement("h4");
    itemHeader.classList.add("products-item-header");
    const itemLink = document.createElement("a");
    itemLink.classList.add("products-link");
    const itemBody = document.createElement("p");
    const itemFooter = document.createElement("span");
    itemFooter.classList.add("products-item-footer");
    const linksContainer = document.createElement("div");
    linksContainer.classList.add("products-item-links-container");
    const linkEdit = document.createElement("a");
    linkEdit.innerHTML = "edit";
    linkEdit.href = `create-update-item.html?id=${i}&header=${header}&body=${body}&footer=${footer}&imgLink=${imgLink}`;
    const linkDelete = document.createElement("a");
    linkDelete.innerHTML = "delete";
    linkDelete.href = "#";
    linkDelete.onclick = (e) => {
      e.preventDefault();
      if (confirm(`about to delete the item "${header}"`)) {
        const itemList = this.#itemList;
        const ind = itemList.findIndex((item) => item.id == i);
        itemList.splice(ind, 1);
        localStorage.setItem("itemList", JSON.stringify(itemList));
      }
      window.location.reload();
    };
    itemLink.innerHTML = header;
    itemLink.href = `products-view.html?id=${i}&header=${header}&body=${body}&footer=${footer}&imgLink=${imgLink}`;

    itemBody.innerHTML = body;
    itemFooter.innerHTML = footer;
    const carouselContainer = document.createElement("div");
    carouselContainer.classList.add("products-item-img-carousel");
    imgLink.split(" ").forEach((link) => {
      if (link != "") {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("products-item-img-container");
        const img = document.createElement("img");
        img.src = link;
        imgContainer.appendChild(img);
        carouselContainer.appendChild(imgContainer);
      }
    });
    itemContent.appendChild(itemHeader.appendChild(itemLink));
    itemContent.appendChild(itemBody);
    itemContent.appendChild(itemFooter);
    linksContainer.appendChild(linkEdit);
    linksContainer.appendChild(linkDelete);
    itemContent.appendChild(linksContainer);
    itemWrapper.appendChild(itemContent);
    itemWrapper.appendChild(carouselContainer);
    this.#container.appendChild(itemWrapper);
  }

  static #storeItemInLocalStorage(item) {
    const itemList = this.#itemList;
    itemList.push(item);
    localStorage.setItem("itemList", JSON.stringify(itemList));
    localStorage.setItem("nextId", this.#nextId);
  }
  static get #itemList() {
    return JSON.parse(localStorage.getItem("itemList"));
  }
  static get #container() {
    const container = document.querySelector(".products-items-container");
    // container.children = null;
    return container;
  }
}
/*     <div class="products-item" id="serices-item-4">
            <div class="services-item-content">
              <h4 class="services-item-header">
                <a class="services-link" href="#"
                  >Does business need design? A talk at Scout Studio
                </a>
              </h4>
              <p>
                I recently gave a talk on the topic of measuring the ROI and
                impact of design practices in business for Scout Studio at
                Northeastern University. Here are some post-talk thoughts.
              </p>
              <span class="services-item-footer"> 3 minute read</span>
            </div>
            <!--optional-->
            <div class="service-item-image-container">
              <img
                src="https://www.turnwall.com/wp-content/uploads/2018/03/Screen-Shot-2021-05-06-at-11.50.14-PM-e1623952859495-360x240.jpg"
                alt=""
              />
            </div>
          </div> */
/* const products = [
    {
      id: 1,
      header: 'Laptop Backpack',
      footer: 109.95,
      body: 'A cool laptop backpack',
      imageLink: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      rating: 3.9,
      link: '#',
    },
    {
      id: 2,
      header: 'Casual T-Shirt for Men',
      footer: 22.3,
      body: 'Slim-fitting style, t-shoty for men',
      imageLink:
        'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      rating: 4.1,
      link: '#',
    },
    {
      id: 3,
      header: 'Mens Cotton Jacket',
      footer: 55.99,
      body: 'Great outerwear jackets for spring, autumn, or winter.',
      imageLink: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
      rating: 4.7,
      link: '#',
    },
    {
      id: 4,
      header: 'Mens Casual Slim Fit',
      footer: 15.99,
      body: 'An aweome shirt for men',
      imageLink: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
      link: '#',
    },
    {
      id: 5,
      header: "Women's Gold & Silver Bracelet",
      footer: 695,
      body: 'A very cool bracelet.',
      imageLink:
        'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
      rating: 400,
      link: '#',
    },
    {
      id: 6,
      header: 'Solid Gold Petite Micropave',
      footer: 168,
      body: 'A very cool jewlery for women',
      imageLink:
        'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
      rating: 3.9,
      link: '#',
    },
    {
      id: 7,
      header: 'White Gold Plated Princess',
      footer: 9.99,
      body: 'A great diamond engagement ring for her.',
      imageLink:
        'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
      rating: 3,
      link: '#',
    },
    {
      id: 8,
      header: 'Gold-plated Earrings',
      footer: 10.99,
      body: 'Rose Gold Plated Double Flared Tunnel Plug Earrings.',
      imageLink:
        'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg',
      rating: 1.9,
      link: '#',
    },
  ]; */
