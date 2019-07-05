import Carousel from "./carousel.js";
import Pagination from "./pagination.js";

class Manager {
  constructor(obj) {
    this.carousel = obj.carousel;
    this.pagination = obj.pagination;
    this.jsonData;

    this.mapData = {
      initDataCnt: 0,
      currentShowingIndex: 1,
      active: "active",
      clone: "clone",
      flex: "flex",
      scale: "scale",
      carouselAttr: "data-index",
      paginationAttr: "data-nav-index"
    };
  }

  getJsonData(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.initManager(data);
        this.initComponent();
      });
  }

  initManager(data) {
    this.jsonData = data;
    this.mapData["initDataCnt"] = this.jsonData.length;
  }

  initComponent() {
    this.carousel.initData(this.jsonData);
    this.pagination.initData(this.jsonData);

    this.carousel.initSetting(this.mapData, this.notify.bind(this));
    this.pagination.initSetting(this.mapData, this.notify.bind(this));
  }

  notify(el, newActiveIndex) {
    if (el.classList.contains("btn-prev")) {
      this.updateDisplay(newActiveIndex, 1);
    } else if (el.classList.contains("btn-next")) {
      this.updateDisplay(newActiveIndex, -1);
    } else {
      //pagination에서 알림이 온 경우
      const navPointer = -(this.carousel.width * newActiveIndex);
      const currentActiveIndex = this.carousel.getActiveItem();
      this.carousel.updateActiveItem(currentActiveIndex, newActiveIndex, true);

      this.updateDisplay(newActiveIndex, navPointer, true);
    }
  }

  updateDisplay(newActiveIndex, moveValue, navoption = false) {
    this.pagination.scaleUp(newActiveIndex - 1);
    if (navoption) this.carousel.moveCarousel(moveValue, navoption);
    else this.carousel.moveCarousel(moveValue);
  }
}

const carousel = new Carousel([".carousel", ".btn-prev", ".btn-next"]);
const pagination = new Pagination(".navigation-list");
const manager = new Manager({ carousel, pagination });

window.addEventListener("DOMContentLoaded", () => {
  manager.getJsonData("./resources/data/carouselData.json");
});
