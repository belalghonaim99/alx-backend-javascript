function getResponseFromAPI() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Response from the API");
      
    }, 1000);
});
}
