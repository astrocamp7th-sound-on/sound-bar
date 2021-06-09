import Rails from "@rails/ujs"
import Swal from 'sweetalert2'

document.addEventListener("turbolinks:load", function () {

  let subsbtn = document.querySelector(".subscribed-btn")
  let favbtn = document.querySelector(".my_fav")

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
        },
        error: (res) => {
          console.log(res)
        },
      })
    })

  }

// localstorage 我的最愛
  function savefav(e){
    var star = document.querySelector('.my_fav').status;
      localStorage.setItem('favortie', star);
      // key = podcast id // 1_2_favortie
  }

  if (favbtn) {
    favbtn.addEventListener("click", function (){
      favbtn.innerHTML = '<i class="fas fa-star"></i>'
      favbtn.classList.add("text-yellow-300")

        Swal.fire({
        icon: 'success',
        title: '已加到我的最愛！',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }


})
