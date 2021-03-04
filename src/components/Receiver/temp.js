function startKeepAlive() {
  setInterval(() => {
    axios
      .get("https://ap-webserver.glitch.me")
      .then(response => {
        console.log("make alive");
        console.log("res", response.data.data);
      })
      .catch(error => {
        console.log("err", error.response.data);
      });
  }, 4 * 60 * 1000);
}
startKeepAlive();