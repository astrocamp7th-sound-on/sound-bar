document.addEventListener("turbolinks:load", function () {

  // localstorage 我的最愛
  const storageFav = JSON.parse(localStorage.getItem('favor_episode'))
  let data = storageFav || []
  let star = document.querySelector(".my_fav")

  storageFav.forEach((episode) => {
    console.log(episode.randomUrl)
    console.log(episode.artist)
    console.log(episode.title)
    console.log(episode.url)
  })

  if (star){
    let array = data.filter((episode) => episode.randomUrl.indexOf(star.dataset.random_url) >= 0)

    if (array.length == 1) {
      star.innerHTML = '<i class="fas fa-star"></i>'
      star.classList.add("text-yellow-300")
    }

    star.addEventListener("click", (e) => {
      let randomUrl = e.currentTarget.dataset.random_url
      let artist = e.currentTarget.dataset.artist
      let title = e.currentTarget.dataset.title
      let url = e.currentTarget.dataset.url

      if (array.length == 0) {
        data.push({randomUrl, artist, title, url})
        localStorage.setItem('favor_episode', JSON.stringify(data))
        star.innerHTML = '<i class="fas fa-star"></i>'
        star.classList.add("text-yellow-300")
      }
      else if (array.length == 1) {
        data.splice(data.indexOf(array[0]), 1)
        localStorage.setItem("favor_episode", JSON.stringify(data))
        star.innerHTML = '<i class="far fa-star"></i>'
        star.classList.remove("text-yellow-300")
      }
    })
  }
})
