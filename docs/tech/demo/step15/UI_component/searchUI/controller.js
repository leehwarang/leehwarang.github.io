class Controller {
  constructor(obj) {
    this.data;
    this.filterdData = [];
    this.searchView = obj.searchView;
    this.autoCompleteView = obj.autoCompleteView;
    this.recentSearchView = obj.recentSearchView;

    this.currentMode;
    this.modeType = {
      focusing: "focusing",
      blured: "blured",
      pending: "pending",
      entering: "entering",
      completing: "completing"
    };
  }

  getData(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.data = data;

        this.initController();
        this.initSearchView();
        this.initAutoCompleteView();
        this.initRecentSearchView();
      });
  }

  setCurrentMode(changedmode) {
    this.currentMode = changedmode;
  }

  initController() {
    this.setCurrentMode(this.modeType.pending);

    //keydown Event를 autoCompleteView, recentSearchView에 모두 다는 것 보다 Controller에 다는게 더 낫다고 판단
    document.addEventListener("keydown", e => {
      if (this.currentMode === this.modeType.focusing) {
        this.recentSearchView.setHighlightStatus(e.code);
      } else if (this.currentMode === this.modeType.entering) {
        this.autoCompleteView.setHighlightStatus(e.code);
      }
    });
  }

  initSearchView() {
    this.searchViewHandler = this.searchViewHandler.bind(this);
    this.searchView.init(this.searchViewHandler, this.modeType);
  }

  initAutoCompleteView() {
    this.autoCompleteHandler = this.autoCompleteHandler.bind(this);
    this.autoCompleteView.init(this.autoCompleteHandler);
  }

  initRecentSearchView() {
    this.recentSearchViewHandler = this.recentSearchViewHandler.bind(this);
    this.recentSearchView.init(this.recentSearchViewHandler);
  }

  makeFilterdData(inputStr) {
    const targetLength = inputStr.length;
    const baseData = [...this.data.product];

    return baseData.filter(data => data.slice(0, targetLength) === inputStr);
  }

  isEmptyArr(arr) {
    return arr.length === 0;
  }

  searchViewHandler(changedmode, inputStr = "") {
    this.setCurrentMode(changedmode);

    const mapFunc = {
      entering: inputStr => {
        this.recentSearchView.hideModalWindow();

        this.filterdData = this.makeFilterdData(inputStr);
        if (this.isEmptyArr(this.filterdData)) return;
        else this.autoCompleteView.makeModalContent(this.filterdData);
      },

      completing: () => {
        this.autoCompleteView.initHighlightIndex();
        this.recentSearchView.saveRecentKeyword(inputStr);
      },

      pending: () => {
        this.autoCompleteView.hideModalWindow();
      },

      focusing: () => {
        this.recentSearchView.makeModalContent();
      },

      blured: () => {
        this.autoCompleteView.hideModalWindow();
        this.recentSearchView.hideModalWindow();
      }
    };

    mapFunc[changedmode](inputStr);
  }

  autoCompleteHandler(selectedKeyword) {
    this.searchView.updateSearchKeyword(selectedKeyword);
  }

  recentSearchViewHandler(selectedKeyword = "") {
    if (!selectedKeyword) {
      this.setCurrentMode(this.modeType.pending);
      this.autoCompleteView.hideModalWindow();
      this.searchView.removeSearchKeyword();
    } else {
      this.searchView.updateSearchKeyword(selectedKeyword);
    }
  }
}

export default Controller;
