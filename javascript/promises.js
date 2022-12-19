function myFunction() {
  return Promise.resolve("Hello");
}
myFunction().then(
  function (value) {
    /* code if successful */
  },
  function (error) {
    /* code if some error */
  }
);
