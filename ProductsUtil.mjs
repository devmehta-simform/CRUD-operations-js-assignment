export class Product {
  static #i = JSON.parse(localStorage.getItem("itemList")).length;
  static getAll() {
    const itemList = JSON.parse(localStorage.getItem("itemList"));
    itemList.forEach(({ header, link, body, footer }, i) =>
      this.#createHtmlElement(header, link, body, footer, i + 1)
    );
  }
  static create(
    header = "my item",
    link = "#",
    body = "this is my item",
    footer = "200$"
  ) {
    this.#i = this.#i + 1;
    this.#storeItemInLocalStorage({ header, link, body, footer });
  }
  static #createHtmlElement(header, link, body, footer, i) {
    const itemWrapper = document.createElement("div");
    itemWrapper.id = `services-item-${i}`;
    itemWrapper.classList.add("services-item");
    const itemContent = document.createElement("div");
    itemContent.classList.add("services-item-content");
    const itemHeader = document.createElement("h4");
    itemHeader.classList.add("services-item-header");
    const itemLink = document.createElement("a");
    itemLink.classList.add("services-link");
    const itemBody = document.createElement("p");
    const itemFooter = document.createElement("span");
    itemFooter.classList.add("services-item-footer");
    itemLink.innerHTML = header;
    itemLink.href = link;
    itemBody.innerHTML = body;
    itemFooter.innerHTML = footer;
    itemContent.appendChild(itemHeader.appendChild(itemLink));
    itemContent.appendChild(itemBody);
    itemContent.appendChild(itemFooter);
    itemWrapper.appendChild(itemContent);
    this.#container.appendChild(itemWrapper);
    // return itemWrapper;
  }

  static #storeItemInLocalStorage(item) {
    const itemList = JSON.parse(localStorage.getItem("itemList"));
    itemList.push(item);
    localStorage.setItem("itemList", JSON.stringify(itemList));
  }

  static get #container() {
    return document.querySelector(".services-items-container");
  }
}
/*     <div class="services-item" id="serices-item-4">
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
