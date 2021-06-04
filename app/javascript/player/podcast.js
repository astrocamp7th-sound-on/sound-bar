import Rails from "@rails/ujs"

// 訂閱功能
document.addEventListener("turbolinks:load", function () {
  let subsbtn = document.querySelector(".subscribed-btn")
  if (subsbtn) {
    subsbtn.addEventListener("click", function (e) {
      let btn = e.target
      let id = btn.dataset["id"]
      Rails.ajax({
        url: `/p/${id}/subscriptions`,
        type: "post",
        success: (res) => {
          if (res.status === "added") {
            btn.classList.add("bg-red-400")
            btn.innerHTML = '已訂閱 <i class="far fa-grin-hearts"></i>'
          } else {
            btn.classList.add("bg-gray-400")
            btn.innerHTML = '未訂閱 <i class="far fa-sad-cry"></i>'
          }
          error: (res) => {
            console.log(res)
          }
        },
      })
    })
  }
})
