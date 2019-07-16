import $ from "../../Utills/mylibrary.js";
import ModalView from "./modalView.js";

class RecentSearchView extends ModalView {
  constructor(inputTag) {
    super(inputTag);
    this.recentKeyword = [];
  }

  init(func) {
    super.init(func);
    this.config.attrName = "recentIndex";
  }

  makeliTemplate() {
    let newEl, textEl;
    const arr = [...this.recentKeyword];

    if (arr.length === 0) {
      newEl = document.createElement("li");
      textEl = document.createTextNode(`최근 검색어 없음`);
      newEl.appendChild(textEl);
      this.modal.append(newEl);
    } else {
      arr.forEach(el => {
        newEl = document.createElement("li");
        textEl = document.createTextNode(el);
        newEl.appendChild(textEl);
        this.modal.append(newEl);
      });
    }
  }

  makeModalContent() {
    this.removeChildAll();
    this.makeliTemplate();
    this.showModalWindow();
    this.setAttribute();
    this.initHighlight();
  }

  saveRecentKeyword(inputValue) {
    const maxLength = 5;

    if (
      this.recentKeyword.length === maxLength ||
      this.recentKeyword.length > maxLength
    ) {
      this.recentKeyword.pop();
    }

    this.recentKeyword.unshift(inputValue);
    this.notify();
  }
}

export default RecentSearchView;
