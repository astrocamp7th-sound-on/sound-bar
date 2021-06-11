document.addEventListener("turbolinks:load", function () {

// localstorage 我的最愛
  const storageFav = JSON.parse(localStorage.getItem('favor_episode'))

  document.querySelectorAll(".my_fav").forEach(star => {
      let data = storageFav || []

      if (data.indexOf(star.dataset.random_url) >= 0) {
        star.innerHTML = '<i class="fas fa-star"></i>'
        star.classList.add("text-yellow-300")
      }

    star.addEventListener("click", (e) => {
      let id = e.currentTarget.dataset.random_url

      if (data.indexOf(id) < 0) {
        data.push(id)
        localStorage.setItem('favor_episode', JSON.stringify(data))
        star.innerHTML = '<i class="fas fa-star"></i>'
        star.classList.add("text-yellow-300")
      }
      else {
        data.splice(data.indexOf(id), 1)
        localStorage.setItem("favor_episode", JSON.stringify(data))
        star.innerHTML = '<i class="far fa-star"></i>'
        star.classList.remove("text-yellow-300")
      }
    })
  })
})
