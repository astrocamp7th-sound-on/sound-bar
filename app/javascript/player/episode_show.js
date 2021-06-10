import Swal from 'sweetalert2'

document.addEventListener("turbolinks:load", function () {

  let favbtn = document.querySelector(".my_fav")

// localstorage 我的最愛

  const storageFav = JSON.parse(localStorage.getItem('favor_episode'))

  document.querySelectorAll(".my_fav").forEach(e => {
    e.addEventListener("click", (e) => {
      let data = storageFav || []
      let id = e.target.dataset.id

      if (data.indexOf(id) < 0) {
        data.push(id)
        localStorage.setItem('favor_episode', JSON.stringify(data))
      }
      else {
        data.splice(data.indexOf(id), 1)
        localStorage.setItem("favor_episode", JSON.stringify(data))
      }
      console.log(storageFav)
    })
  })



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
