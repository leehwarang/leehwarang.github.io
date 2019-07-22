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
    const arr = [...this.recentKeyword];
    let result = "";
    if (arr.length === 0) {
      result = `<li>최근 검색어 없음</li>`;
    } else {
      result = arr.reduce((acc, cur) => {
        acc += `<li>${cur}</li>`;
        return acc;
      }, "");
    }
    this.modal.insertAdjacentHTML("beforeend", result);
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
