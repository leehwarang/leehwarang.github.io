"use strict";
import $ from "./mylibrary.js";

class Carousel {
  constructor(inputTags) {
    let [carouselTag, btnTags] = [...inputTags];
    this.carousel = $(carouselTag);
    this.btns = $(btnTags);

    this.width;
    this.currentPointer;
    this.items;

    this.config = {
      carouselAttr: "data-index",
      prevDirection: -1,
      nextDirection: 1,
      prevMoveValue: 1,
      nextMoveValue: -1
    };

    this.changeNotify;
  }

  render(data) {
    const result = data.reduce((acc, cur) => {
      acc += `<li class="carousel-item">
                <div class="info-img">
                  <img src="${cur.imgurl}">
                </div>
                <div class="info-text">
                  <h3>${cur.title}</h3>
                  <ul>
                    ${this.makeDescArr(cur.desc)}
                  </ul>
                </div>
              </li>`;
      return acc;
    }, "");

    this.carousel.insertAdjacentHTML("beforeend", result);
  }

  setState(obj, func) {
    this.width = obj.width;
    this.currentPointer = obj.currentPointer;
    this.items = obj.items;
    this.changeNotify = func;

    this.setCarouselAttr(this.items, this.config.carouselAttr);
    this.attchEventToBtn();
  }

  makeDescArr(arr) {
    const result = arr.reduce((acc, cur) => {
      acc += `<li>${cur}</li>`;
      return acc;
    }, "");
    return result;
  }

  setCarouselAttr(arr, attrName) {
    const _arr = [...arr];

    _arr.forEach((v, i) => {
      _arr[i].setAttribute(attrName, i);
    });
  }

  setCarouselTransition(transitionType, transformVal) {
    this.carousel.style.transition = transitionType;
    this.carousel.style.transform = `translateX(${transformVal}px)`;
  }

  moveCarousel(moveValue, navoption = false) {
    if (navoption) this.currentPointer = moveValue;
    else this.currentPointer += moveValue * this.width;
    this.setCarouselTransition(`all 1s`, this.currentPointer);
  }

  moveCloneCarousel(newPointerValue) {
    this.currentPointer = -newPointerValue;
    this.setCarouselTransition(`none`, this.currentPointer);
  }

  attchEventToBtn() {
    this.btns.addEventListener("click", e => {
      this.changeNotify(e.target.classList[1]);
    });
  }
}

export default Carousel;
