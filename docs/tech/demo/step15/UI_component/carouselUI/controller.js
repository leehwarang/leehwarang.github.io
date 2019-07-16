"use strict";
import Carousel from "./carousel.js";
import Pagination from "./pagination.js";
import $ from "../../Utills/mylibrary.js";

class Controller {
  constructor(obj) {
    this.carousel = obj.carousel;
    this.pagination = obj.pagination;

    this.jsonData;
    this.initDataCnt;
    this.currentShowingIndex = 1;
    this.carouselItems;
    this.carouselWidth;
    this.currentPointer;
    this.flag = false;

    this.config = {
      active: "active",
      clone: "clone",
      flex: "flex"
    };
  }

  getJsonData(url) {
    fetch(url)
      .then(response => response.json())
      .then(jsonData => {
        this.initController(jsonData);
        this.initCarousel(jsonData);
        this.initPagination(jsonData);
      });
  }

  initController(jsonData) {
    this.jsonData = jsonData;
    this.initDataCnt = this.jsonData.length;
  }

  initCarousel(jsonData) {
    this.carousel.render(jsonData);
    const carousel = this.carousel.carousel;

    this.carouselItems = carousel.children;
    this.carouselWidth = carousel.offsetWidth;
    this.currentPointer = -this.carouselWidth;

    this.setCarouselItem(this.initDataCnt);
    this.setCarouselFullWidth(this.carouselItems.length);
    this.setCarouselPosition();

    this.carousel.setState(
      {
        width: this.carouselWidth,
        currentPointer: this.currentPointer,
        items: this.carouselItems
      },
      this.carouselNotify.bind(this)
    );
  }

  initPagination(jsonData) {
    this.pagination.render(jsonData);
    this.pagination.setState(
      this.currentShowingIndex,
      this.paginationNotify.bind(this)
    );
  }

  setCarouselItem(initDataCnt) {
    this.appendCloneItem(
      this.carousel.carousel,
      this.carouselItems[0],
      this.carouselItems[initDataCnt - 1]
    );
  }

  appendCloneItem(parentNode, firstItem, lastItem) {
    const firstCloneItem = firstItem.cloneNode(true);
    const lastCloneItem = lastItem.cloneNode(true);

    parentNode.prepend(lastCloneItem);
    parentNode.appendChild(firstCloneItem);

    this.addElementToClass(firstCloneItem, this.config.clone);
    this.addElementToClass(lastCloneItem, this.config.clone);
  }

  addElementToClass(elementName, className) {
    elementName.classList.add(className);
  }

  setCarouselFullWidth(itemsCnt) {
    const carousel = this.carousel.carousel;
    const fullWidth = this.carouselWidth * itemsCnt;

    carousel.style.width = `${fullWidth}px`;
    this.addElementToClass(carousel, this.config.flex);
  }

  setCarouselPosition() {
    const carousel = this.carousel.carousel;

    carousel.style.transform = `translateX(${this.currentPointer}px)`;
    carousel.style.transition = `all 0s`;
    this.addElementToClass(
      this.carouselItems[this.currentShowingIndex],
      this.config.active
    );
  }

  getActiveIndex() {
    const active = $(`.${this.config.active}`);
    return active.dataset.index;
  }

  getActiveNavIndex(newActiveItem) {
    let navIndex = Number(newActiveItem.dataset.index);
    if (navIndex === 0) {
      navIndex = this.initDataCnt;
    } else if (navIndex === this.initDataCnt + 1) {
      navIndex = 1;
    }
    return navIndex;
  }

  updateActiveItem(activeIndex, direction, navoption = false) {
    this.carouselItems[Number(activeIndex)].classList.remove(
      this.config.active
    );

    if (navoption) {
      this.carouselItems[direction].classList.add(this.config.active);
    } else {
      this.addElementToClass(
        this.carouselItems[Number(activeIndex) + direction],
        this.config.active
      );
    }

    const newActiveItem = $(`.${this.config.active}`);
    return newActiveItem;
  }

  updateCloneActiveItem(newActiveItem, value) {
    newActiveItem.classList.remove(this.config.active);
    this.carouselItems[value].classList.add(this.config.active);
    return this.carouselItems[value];
  }

  checkCloneItem(newActiveItem) {
    return newActiveItem.classList.contains(this.config.clone);
  }

  btnClickHandler(direction) {
    const activeIndex = this.getActiveIndex();
    const newActiveItem = this.updateActiveItem(activeIndex, direction);
    const newActiveNavIndex = this.getActiveNavIndex(newActiveItem);

    return [newActiveItem, newActiveNavIndex];
  }

  cloneItemHandler(newActiveItem, calculateValue) {
    this.flag = true;
    newActiveItem = this.updateCloneActiveItem(newActiveItem, calculateValue);
    const newPointerValue = this.carouselWidth * calculateValue;
    setTimeout(() => {
      this.carousel.moveCloneCarousel(newPointerValue);
      this.flag = false;
    }, 1000);
  }

  carouselNotify(btnName) {
    const funcMap = {
      "btn-prev": () => {
        if (this.flag === true) {
          return;
        }

        let [newActiveItem, newActiveNavIndex] = this.btnClickHandler(
          this.carousel.config.prevDirection
        );

        this.updateDisplay(
          newActiveNavIndex,
          this.carousel.config.prevMoveValue
        );

        if (this.checkCloneItem(newActiveItem))
          this.cloneItemHandler(newActiveItem, this.initDataCnt);
      },
      "btn-next": () => {
        if (this.flag === true) {
          return;
        }

        let [newActiveItem, newActiveNavIndex] = this.btnClickHandler(
          this.carousel.config.nextDirection
        );

        this.updateDisplay(
          newActiveNavIndex,
          this.carousel.config.nextMoveValue
        );

        if (this.checkCloneItem(newActiveItem))
          this.cloneItemHandler(newActiveItem, 1);
      }
    };

    funcMap[btnName]();
  }

  paginationNotify(newActiveIndex) {
    const navPointer = -(this.carouselWidth * newActiveIndex);
    const currentActiveIndex = this.getActiveIndex();
    this.updateActiveItem(currentActiveIndex, newActiveIndex, true);
    this.updateDisplay(newActiveIndex, navPointer, true);
  }

  updateDisplay(newActiveNavIndex, moveValue, navoption = false) {
    this.pagination.scaleUp(newActiveNavIndex - 1);
    if (navoption) this.carousel.moveCarousel(moveValue, navoption);
    else this.carousel.moveCarousel(moveValue);
  }
}

export default Controller;
