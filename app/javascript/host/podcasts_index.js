import Rails from "@rails/ujs"


document.addEventListener("turbolinks:load", function () {

  let searchForm = document.querySelector('.search-form')
  let createPodcastBtn = document.querySelector('.create-podcast-btn')
  let closeCreatePodcast = document.querySelector('.close-create-podcast')
  let createEpisodeBtn = document.querySelectorAll('.create-episode-btn')
  let closeCreateEpisode = document.querySelector('.close-create-episode')
  let createEpisodeForm = document.querySelector('#createEpisodeFrom')
  let searchPodcastInput = document.querySelector('#searchPodcastInput')
  let newPodcastForm = document.querySelector('#new_podcast')
  let editPodcastForm = document.querySelector('[id^="edit_podcast"]')
  let fPodcastName = document.querySelector('#podcast_name')
  let fPodcastArtist = document.querySelector('#podcast_artist')
  let fPodcastEmail = document.querySelector('#podcast_email')
  let fPodcastLanguage = document.querySelector('#podcast_language')
  let fPodcastSlug = document.querySelector('#podcast_slug')
  let fPodcastGenres = document.querySelector('#podcast_genres')
  let fPodcastDescription = document.querySelector('#podcast_description')
  let fPodcastCopyright = document.querySelector('#podcast_copyright')

  // 建立 Podcast & 編輯 Podcast 表單驗證
  if (newPodcastForm || editPodcastForm){

    function validateInputPresence (e) {
      let fErrorSpan = document.createElement('SPAN')
      fErrorSpan.classList.add('error')
      fErrorSpan.textContent = '必填'
      if (e.target.value == '' && e.target.classList.toString().indexOf('border-red-400') == -1){
        e.target.classList.add('border-red-400')
        e.target.parentElement.appendChild(fErrorSpan)
      } else if (e.target.value != '' && e.target.classList.contains('border-red-400')) {
        e.target.classList.remove('border-red-400')
        e.target.parentElement.removeChild(e.target.parentElement.lastElementChild)
      }
    }

    function validateInputEmail (e) {
      let emailReg = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)
      let fEmailErrorSpan = document.createElement('SPAN')
      fEmailErrorSpan.classList.add('error')
      fEmailErrorSpan.textContent = '請輸入正確的Email格式'
      if (emailReg.test(e.target.value) == false && e.target.classList.toString().indexOf('border-red-400') == -1){
        e.target.classList.add('border-red-400')
        e.target.parentElement.appendChild(fEmailErrorSpan)
      } else if (emailReg.test(e.target.value) == true && e.target.classList.contains('border-red-400')){
        e.target.classList.remove('border-red-400')
        e.target.parentElement.removeChild(e.target.parentElement.lastElementChild)
      }
    }

    fPodcastName.addEventListener('blur', (e) => validateInputPresence(e))
    fPodcastArtist.addEventListener('blur', (e) => validateInputPresence(e))
    fPodcastLanguage.addEventListener('blur', (e) => validateInputPresence(e))
    fPodcastGenres.addEventListener('blur', (e) => validateInputPresence(e))
    fPodcastDescription.addEventListener('blur', (e) => validateInputPresence(e))
    fPodcastCopyright.addEventListener('blur', (e) => validateInputPresence(e))
    fPodcastEmail.addEventListener('blur', (e) => {
      validateInputPresence(e)
      validateInputEmail(e)
    })
    fPodcastSlug.addEventListener('blur', (e) => {
      validateInputPresence(e)
      let fSlugErrorSpan = document.createElement('SPAN')
      fSlugErrorSpan.classList.add('error')
      fSlugErrorSpan.textContent = '這組短網址已被使用了，請改用其它字串'
      if (e.target.value != ''){
        Rails.ajax({
          url: '/api/v1/podcasts/slug',
          type: 'get',
          success: function(res){
            let result = res.findIndex(function(podcast){
              return podcast.slug == e.target.value
            })
            if (result > -1 && e.target.classList.toString().indexOf('border-red-400') == -1){
              e.target.classList.add('border-red-400')
              e.target.parentElement.appendChild(fSlugErrorSpan)
            } else if (result == -1 && e.target.classList.contains('border-red-400')){
              e.target.classList.remove('border-red-400')
              e.target.parentElement.removeChild(e.target.parentElement.lastElementChild)
            }
          },
          failure: function(res){
            console.log(res)
          }
        })
      }
    })
  }

  // 搜尋功能
  if (searchPodcastInput){
    let timeout = null
    searchPodcastInput.addEventListener('keyup', function(e){
      let searchValue = e.target.value
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        Rails.ajax({
          url: '/api/v1/podcasts',
          type: 'get',
          success: function(res){
            let result = res.filter(function(podcast){
              return podcast.name.indexOf(searchValue) > -1
            })
            let content = result.map(function(podcast){
              return `
              <div class="cursor-pointer relative bg-white mt-8 border border-gray-300 hover:border-gray-400 rounded ">
                <div class="flex border-b border-gray-200 items-center">
                  <div class="m-3">
                    <img src="${podcast.cover.url}" width="80" height="80">
                  </div>
                  <div class="w-full">
                    <h3 class="font-semibold text-gray-800 pt-5">
                      <a class="block" href="/podcasts/${podcast.random_url}/dashboard">${podcast.name}</a>
                    </h3>
                    <a class="block font-thin text-sm text-gray-600 pb-5" href="/podcasts/${podcast.random_url}/dashboard">${podcast.artist}</a>
                  </div>
                </div>
                <div class="flex justify-between">
                  <span class="create-episode-btn py-3 px-5 text-gray-400 hover:text-blue-400" data-random-url="${podcast.random_url}"> ＋ 新增單集</span>
                  <a class="py-3 px-5 text-gray-400 hover:text-blue-400" target="_blank" href="http://player.localhost:3000/p/${podcast.random_url}"><i class="far fa-caret-square-right"></i></a>
                </div>
              </div>
              `
            })
            document.querySelector('#podcastsContent').innerHTML = content.join('')
            document.querySelectorAll('.create-episode-btn').forEach(btn =>
              btn.addEventListener('click', function(){
                document.querySelector('.create-episode').classList.remove('hidden')
              })
            )
          },
          failure: function(res){
            console.log(res)
          }
        })
      }, 1000);
    })
  }

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
