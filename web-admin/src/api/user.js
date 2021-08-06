const user = {
  getUserId: function () {
    return localStorage.getItem("userId") ?? "";
  },
  setUserId: function (userId) {
    localStorage.setItem("userId", userId);
  },
  clear: function () {
    this.setUserId("");
  },
};

export { user };
