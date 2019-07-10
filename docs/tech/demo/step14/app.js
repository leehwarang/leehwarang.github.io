import Carousel from "./carousel.js";
import Pagination from "./pagination.js";
import Controller from "./controller.js";

const carousel = new Carousel([".carousel", ".carousel-btn"]);
const pagination = new Pagination(".navigation-list");
const controller = new Controller({ carousel, pagination });

window.addEventListener("DOMContentLoaded", () => {
  controller.getJsonData("./resources/data/carouselData.json");
});
