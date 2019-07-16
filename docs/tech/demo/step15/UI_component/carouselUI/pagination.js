"use strict";
import $ from "../../Utills/mylibrary.js";

class Pagination {
  constructor(inputTag) {
    this.navList = $(inputTag);
    this.navItems;
    this.config = {
      scale: "scale",
      paginationAttr: "data-nav-index",
      direction: 1,
      moveValue: -1
    };
    this.changeNotify;
  }

  render(data) {
    const result = data.reduce((acc, cur) => {
      acc += `<li class="item${cur.id}">${cur.title}</li>`;
      return acc;
    }, "");

    this.navList.insertAdjacentHTML("beforeend", result);
  }

  setState(showingIndex, func) {
    const currentShowingIndex = showingIndex;
    this.changeNotify = func;

    this.navItems = this.navList.children;
    this.setPaginationAttr(this.navItems, this.config.paginationAttr);
    this.navItems[currentShowingIndex - 1].classList.add(this.config.scale);
    this.attachEventToPagination();
  }

  scaleUp(navIndex) {
    const currentScale = $(`.${this.config.scale}`);
    currentScale.classList.remove(this.config.scale);
    this.navItems[navIndex].classList.add(this.config.scale);
  }

  setPaginationAttr(arr, attrName) {
    const _arr = [...arr];

    _arr.forEach((v, i) => {
      _arr[i].setAttribute(attrName, i + 1);
    });
  }

  attachEventToPagination() {
    this.navList.addEventListener("click", e => {
      let navIndex = e.target.dataset.navIndex;
      this.changeNotify(navIndex);
    });
  }
}

export default Pagination;
