import Rails from "@rails/ujs"

document.addEventListener("turbolinks:load", function () {

  let subsbtn = document.querySelector(".subscribed-btn")

// 訂閱功能
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
            btn.classList.add("bg-red-400")
            btn.innerHTML = '訂閱 <i class="far fa-heart"></i>'
          }
          error: (res) => {
            console.log(res)
          }
        },
      })
    })
  }
})
