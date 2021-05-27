import "./donate"

// 使用者登入後的節目列表搜尋框
let searchForm = document.querySelector(".search-form")

if (searchForm) {
  document.addEventListener("turbolinks:load", function () {
    searchForm.addEventListener("focusin", (e) => {
      e.target.parentElement.classList.add("search-bar-ring")
    })
    searchForm.addEventListener("focusout", (e) => {
      e.target.parentElement.classList.remove("search-bar-ring")
    })
  })
}
