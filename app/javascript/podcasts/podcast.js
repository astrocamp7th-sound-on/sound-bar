import Rails from "@rails/ujs"

document.addEventListener("DOMContentLoaded", function () {

  let subsbtn = document.querySelector('.subscribed-btn')
  if (subsbtn){
    subsbtn.addEventListener('click', function (e) {
      let btn = e.target
      let id = btn.dataset['id']
      Rails.ajax({
        url: `/p/${id}/subscriptions`,
        type: "post",
        success: res => {
          if (res.status === 'added'){
            btn.classList.add("bg-red-100")
          } else {
            btn.classList.remove("bg-red-100")
        }
        error: err=> {
          console.log(error)
          }
        }
      })
    })
  }
})
