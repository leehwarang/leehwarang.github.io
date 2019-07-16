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
    let newEl, textEl;

    arr.forEach(el => {
      newEl = document.createElement("li");
      textEl = document.createTextNode(el);
      newEl.appendChild(textEl);
      this.modal.append(newEl);
    });
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
