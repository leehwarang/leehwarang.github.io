const MyPromise = require("./mypromise");

// async success test case
let myFirstPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve({ name: "Success!", id: 123123 });
  }, 1000);
});

myFirstPromise
  .then(successMessage => {
    return successMessage.name;
  })
  .then(data => {
    console.log(`data is ${data}`);
  });

// async fail test case
let myFirstPromise2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    let data = { name: "michelle", id: 7067 };
    if (data.name === "michelleeee") resolve("Right!");
    else reject("Error!");
  }, 2000);
});

myFirstPromise2
  .then(
    successMessage => {
      return successMessage;
    },
    error => {
      return error;
    }
  )
  .then(result => console.log(`본인 인증 성공 ${result}`))
  .catch(result => console.log(`본인 인증 실패 ${result}`));
