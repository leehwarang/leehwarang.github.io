class MyPromise {
  constructor(func) {
    this.callbackQueue = [];
    this.argumentQueue = [];
    this.promiseStatus;
    this.promiseValue;
    this.catchFunc;
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    func(this.resolve, this.reject);
  }

  resolve(argument) {
    this.exec(0, "resolved", argument);
  }

  reject(argument) {
    this.exec(1, "rejected", argument);
  }

  then(thenfirstCB, thensecondCB) {
    this.callbackQueue.push([thenfirstCB, thensecondCB]);
    return this;
  }

  catch(func) {
    this.catchFunc = func;
  }

  exec(val, str, argument) {
    let arg, targetFunc, result;
    this.argumentQueue.push(argument);

    while (this.argumentQueue.length > 0 && this.callbackQueue.length > 0) {
      arg = this.argumentQueue.shift();
      targetFunc = this.callbackQueue.shift();

      this.promiseValue = targetFunc[val](arg);
      this.promiseStatus = str;

      if (this.promiseStatus === "rejected") {
        return this.catchFunc(this.promiseValue);
      } else if (this.callbackQueue.length > 0) {
        this.argumentQueue.push(this.promiseValue);
      }
    }
  }
}

module.exports = MyPromise;
