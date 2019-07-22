import $ from "../../Utills/mylibrary.js";
import ModalView from "./modalView.js";

class AutoCompleteView extends ModalView {
  constructor(inputTag) {
    super(inputTag);
  }

  init(func) {
    super.init(func);
    this.config.attrName = "autoIndex";
  }

  makeliTemplate(arr) {
    const result = arr.reduce((acc, cur) => {
      acc += `<li>${cur}</li>`;
      return acc;
    }, "");

    this.modal.insertAdjacentHTML("beforeend", result);
  }

  makeModalContent(arr) {
    this.removeChildAll();
    this.makeliTemplate(arr);
    this.showModalWindow();
    this.setAttribute();
    this.initHighlight();
  }
}

export default AutoCompleteView;
