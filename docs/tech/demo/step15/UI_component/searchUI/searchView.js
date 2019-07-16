import $ from "../../Utills/mylibrary.js";

class SearchView {
  constructor(inputTags) {
    let [searchformTag, findbtnTag] = [...inputTags];
    this.searchForm = $(searchformTag);
    this.findBtn = $(findbtnTag);
    this.notify;
    this.modeType;
  }

  init(func, obj) {
    this.notify = func;
    this.modeType = obj;

    this.attachSearchFormEvent();
    this.attachFindBtnEvent();
  }

  attachSearchFormEvent() {
    this.searchForm.addEventListener("focus", e => {
      this.notify(this.modeType.focusing);
    });

    this.searchForm.addEventListener("blur", e => {
      this.notify(this.modeType.blured);
    });

    this.searchForm.addEventListener("input", e => {
      setTimeout(() => {
        const target = e.srcElement;
        if (target.value === "") this.notify(this.modeType.pending);
        else this.notify(this.modeType.entering, target.value);
      }, 1000);
    });
  }

  attachFindBtnEvent() {
    this.findBtn.addEventListener("click", e => {
      this.notify(this.modeType.completing, this.searchForm.value);
    });
  }

  removeSearchKeyword() {
    this.searchForm.value = "";
  }

  updateSearchKeyword(selectedKeyword) {
    this.removeSearchKeyword();
    this.searchForm.value = selectedKeyword;
  }
}

export default SearchView;
