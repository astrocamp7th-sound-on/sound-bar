import "./info"
import "./show"
import "./podcasts_index"
import "./episodes_index"
import "./navbar"

document.addEventListener("turbolinks:load", function () {
// 使用者登入後的節目列表搜尋框
  let searchForm = document.querySelector('.search-form')
  let createPodcastBtn = document.querySelector('.create-podcast-btn')
  let closeCreatePodcast = document.querySelector('.close-create-podcast')
  let createEpisodeBtn = document.querySelectorAll('.create-episode-btn')
  let closeCreateEpisode = document.querySelector('#close-create-episode')
  let createEpisodeForm = document.querySelector('#createEpisodeFrom')

  // Episode 燈箱內容切換(主要/更多)
  if (createEpisodeForm){
    createEpisodeForm.addEventListener('click', function(e){
      for(let i = 0; i < createEpisodeForm.children.length; i++){
        createEpisodeForm.children[i].classList.remove('text-blue-500')
        createEpisodeForm.children[i].classList.remove('border-b-2')
        createEpisodeForm.children[i].classList.remove('border-blue-400')
        document.querySelector(`.${createEpisodeForm.children[i].id}_content`).classList.add('hidden')
      }
      e.target.classList.add('text-blue-500')
      e.target.classList.add('border-b-2')
      e.target.classList.add('border-blue-400')
      document.querySelector(`.${e.target.id}_content`).classList.remove('hidden')
    })
  }

  // 建立 Episode 燈箱
  if (createEpisodeBtn){
    createEpisodeBtn.forEach(btn =>
      btn.addEventListener('click', function(){
        document.querySelector('.create-episode').classList.remove('hidden')
      })
    )
  }

  // 關閉 Episode 燈箱
  if (closeCreateEpisode){
    closeCreateEpisode.addEventListener('click', function(){
      document.querySelector('.create-episode').classList.add('hidden')
    })
    document.querySelector('#close-create-episode').addEventListener('click', function(){
      document.querySelector('.create-episode').classList.add('hidden')
    })
  }

  // 建立 Podcast 燈箱
  if (createPodcastBtn){
    createPodcastBtn.addEventListener('click', function(){
      document.querySelector('.create-podcast').classList.remove('hidden')
    })
  }

  // 關閉 Podcast 燈箱
  if (closeCreatePodcast){
    closeCreatePodcast.addEventListener('click', function(){
      document.querySelector('.create-podcast').classList.add('hidden')
    })
    document.querySelector('#close-create-podcast').addEventListener('click', function(){
      document.querySelector('.create-podcast').classList.add('hidden')
    })
  }

  // 使用者登入後的節目列表搜尋框
  if (searchForm){
    searchForm.addEventListener('focusin', (e) => {
      e.target.parentElement.classList.add('search-bar-ring');
    })
    searchForm.addEventListener("focusout", (e) => {
      e.target.parentElement.classList.remove("search-bar-ring")
    })
  }
})



