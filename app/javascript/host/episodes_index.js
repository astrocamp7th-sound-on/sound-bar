import Swal from 'sweetalert2'
import Rails from "@rails/ujs"

// 佈署前須將localhost修改成domain

document.addEventListener("turbolinks:load", function () {

  let openEpisodeBtnAll = document.querySelectorAll('#openEpisodeBtnAll')
  let closeEpisodebtn = document.querySelector('#closeEpisodebtn')
  let episodeLinkAll = document.querySelectorAll('#episodeLinkAll')
  let copyEpisodeLinkAll = document.querySelectorAll('.copy-episode-link-all')
  let copyEpisodeSpanAll = document.querySelectorAll('#copyEpisodeSpanAll')
  let copyEpisodeSlugLinkAll = document.querySelectorAll('.copy-episode-slug-link-all')
  let copyEpisodeSlugSpanAll = document.querySelectorAll('#copyEpisodeSlugSpanAll')
  let playerEpisodeLinkInputAll = document.querySelectorAll('#playerEpisodeLinkInputAll')
  let playerEpisodeSlugLinkInputAll = document.querySelectorAll('#playerEpisodeSlugLinkInputAll')
  let searchEpisodeInput = document.querySelector('#searchEpisodeInput')

  // 搜尋功能
  if(searchEpisodeInput){
    let timeout = null
    searchEpisodeInput.addEventListener('keyup', function(e){
      let podcastCover = e.target.dataset['podcastCover']
      let podcastUrl = e.target.dataset['podcastUrl']
      let searchValue = e.target.value
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        Rails.ajax({
          url: `/api/v1/podcasts/${podcastUrl}/episodes`,
          type: "get",
          success: function(res){
            let result = res.filter(function(episode){
              return episode.title.indexOf(searchValue) > -1
            })
            let content = result.map(function(episode){
              return `
              <tr>
                  <td class="p-2 w-24">
                    <img src="${(episode.cover.url) ? episode.cover.url : (podcastCover) ? podcastCover : 'https://picsum.photos/300/300/?random=1'}" />
                  </td>
                  <td class="w-10">
                    <a class="block py-4 px-2" href="/podcasts/${podcastUrl}/episodes/${episode.random_url}">S${(episode.season) ? episode.season : ''}E${(episode.episode) ? episode.episode : ''}</a>
                  </td>
                  <td class="text-left">
                    <a class="block py-4 px-2" href="/podcasts/${podcastUrl}/episodes/${episode.random_url}">${episode.title}</a>
                  </td>
                  <td class="w-40 text-right text-sm">
                    <a class="block p-2" href="/podcasts/${podcastUrl}/episodes/${episode.random_url}">${episode.created_at.slice(5,7)}月${episode.created_at.slice(8,10)}日 ${episode.created_at.slice(11,16)}<br>${episode.created_at.slice(0,4)}年</a>
                  </td>
                  <td class="p-2 text-center w-20 relative ">
                    <span id="openEpisodeBtnAll" class="cursor-pointer border border-gray-200 text-gray-400 hover:border-blue-400 hover:text-blue-400 rounded-full py-1 px-2"><i class="fas fa-link"></i></span>
                    <!-- 網頁播放器燈箱 -->
                    <div id="episodeLinkAll" class="w-72 bg-white shadow-xl border-t border-gray-100 rounded p-5 cursor-auto absolute top-12 right-0 z-30 hidden">
                      <section class="h-20 border-b border-blue-50 flex flex-wrap justify-between">
                        <p class="text-gray-700 hover:text-gray-700">連結</p>
                        <div class="flex">
                          <a class="text-blue-500 hover:text-blue-400 mr-1" target="_blank" href="http://player.sound-bar.tk/p/${podcastUrl}/episodes/${episode.random_url}">開啟連結</a>
                          <span id="copyEpisodeSpanAll" class="cursor-pointer text-blue-500 hover:text-blue-400 ml-1">
                            複製連結
                          </span>
                        </div>
                        <div class="flex-grow">
                          <span class="flex justify-between border border-gray-200 mt-3 mb-10 py-1 bg-gray-100 rounded hover:border hover:border-blue-500 transition duration-300">
                            <a class="text-blue-500 ml-2 hover:text-blue-400 transition duration-200" target="_blank" href="http://player.sound-bar.tk/p/${podcastUrl}/episodes/${episode.random_url}"><i class="fas fa-link"></i></a>
                            <input type="text" id="playerEpisodeLinkInputAll" class="flex-grow mx-2 bg-gray-100 text-gray-400 cursor-not-allowed focus:outline-none" readonly value="http://player.sound-bar.tk/p/${podcastUrl}/episodes/${episode.random_url}">
                            <span class="copy-episode-link-all cursor-pointer text-gray-400 mr-2 hover:text-gray-300"><i class="far fa-copy"></i></span>
                          </span>
                        </div>
                      </section>
                      <section class="h-20 mt-2 border-b border-blue-50 flex flex-wrap justify-between">
                        <p class="text-gray-700 hover:text-gray-700">好記短網址</p>
                        <div class="flex">
                          <a class="text-blue-500 hover:text-blue-400 mr-1" target="_blank" href="http://player.sound-bar.tk/p/${podcastUrl}/episodes/${episode.random_url}">開啟連結</a>
                          <span id="copyEpisodeSlugSpanAll" class="cursor-pointer text-blue-500 hover:text-blue-400 ml-1">
                            複製連結
                          </span>
                        </div>
                        <div class="flex-grow">
                          <span class="flex justify-between border border-gray-200 mt-3 mb-10 py-1 bg-gray-100 rounded hover:border hover:border-blue-500 transition duration-300">
                            <a class="text-blue-500 ml-2 hover:text-blue-400 transition duration-200" target="_blank" href="http://player.sound-bar.tk/p/${podcastUrl}/episodes/${episode.random_url}"><i class="fas fa-link"></i></a>
                            <input type="text" id="playerEpisodeSlugLinkInputAll" class="flex-grow mx-2 bg-gray-100 text-gray-400 cursor-not-allowed focus:outline-none" readonly value="http://player.sound-bar.tk/p/${podcastUrl}/episodes/${episode.random_url}">
                            <span class="copy-episode-slug-link-all cursor-pointer text-gray-400 mr-2 hover:text-gray-300"><i class="far fa-copy"></i></span>
                          </span>
                        </div>
                      </section>
                    </div>
                  </td>
                </tr>
              `
            })
            document.querySelector('#episodeTbody').innerHTML = content.join('')
            // 網頁撥放器
            for(let i = 0; i < document.querySelectorAll('#openEpisodeBtnAll').length; i++){
              document.querySelectorAll('#openEpisodeBtnAll')[i].addEventListener('click', function(){
                document.querySelectorAll('#openEpisodeBtnAll')[i].classList.add('text-blue-500')
                document.querySelectorAll('#openEpisodeBtnAll')[i].classList.add('border-blue-500')
                document.querySelectorAll('#episodeLinkAll')[i].classList.remove('hidden')
                closeEpisodebtn.classList.remove('hidden')
              })
              closeEpisodebtn.addEventListener('click', function(){
                document.querySelectorAll('#openEpisodeBtnAll')[i].classList.remove('text-blue-500')
                document.querySelectorAll('#openEpisodeBtnAll')[i].classList.remove('border-blue-500')
                document.querySelectorAll('#episodeLinkAll')[i].classList.add('hidden')
                closeEpisodebtn.classList.add('hidden')
              })
            }

            // 複製節目連結
            for(let i = 0; i < document.querySelectorAll('.copy-episode-link-all').length; i++){
              document.querySelectorAll('.copy-episode-link-all')[i].addEventListener('click', function(){
                document.querySelectorAll('#playerEpisodeLinkInputAll')[i].select()
                document.execCommand('Copy')

                Swal.fire({
                  icon: 'success',
                  title: '已複製！',
                  showConfirmButton: false,
                  timer: 1000
                })
              })
            }
            for(let i = 0; i < document.querySelectorAll('#copyEpisodeSpanAll').length; i++){
              document.querySelectorAll('#copyEpisodeSpanAll')[i].addEventListener('click', function(){
                document.querySelectorAll('#playerEpisodeLinkInputAll')[i].select()
                document.execCommand('Copy')

                Swal.fire({
                  icon: 'success',
                  title: '已複製！',
                  showConfirmButton: false,
                  timer: 1000
                })
              })
            }
            // 複製節目短網址連結
            for(let i = 0; i < document.querySelectorAll('.copy-episode-slug-link-all').length; i++){
              document.querySelectorAll('.copy-episode-slug-link-all')[i].addEventListener('click', function(){
                document.querySelectorAll('#playerEpisodeSlugLinkInputAll')[i].select()
                document.execCommand('Copy')

                Swal.fire({
                  icon: 'success',
                  title: '已複製！',
                  showConfirmButton: false,
                  timer: 1000
                })
              })
            }
            for(let i = 0; i < document.querySelectorAll('#copyEpisodeSlugSpanAll').length; i++){
              document.querySelectorAll('#copyEpisodeSlugSpanAll')[i].addEventListener('click', function(){
                document.querySelectorAll('#playerEpisodeSlugLinkInputAll')[i].select()
                document.execCommand('Copy')

                Swal.fire({
                  icon: 'success',
                  title: '已複製！',
                  showConfirmButton: false,
                  timer: 1000
                })
              })
            }
          },
          failure: function(res){
            console.log(res)
          }
        })
      }, 1000);
    })
  }

  // 網頁播放器
  if(openEpisodeBtnAll){
    for(let i = 0; i < openEpisodeBtnAll.length; i++){
      openEpisodeBtnAll[i].addEventListener('click', function(){
        openEpisodeBtnAll[i].classList.add('text-blue-500')
        openEpisodeBtnAll[i].classList.add('border-blue-500')
        episodeLinkAll[i].classList.remove('hidden')
        closeEpisodebtn.classList.remove('hidden')
      })
      closeEpisodebtn.addEventListener('click', function(){
        openEpisodeBtnAll[i].classList.remove('text-blue-500')
        openEpisodeBtnAll[i].classList.remove('border-blue-500')
        episodeLinkAll[i].classList.add('hidden')
        closeEpisodebtn.classList.add('hidden')
      })
    }
  }

  // 複製節目連結
  if(copyEpisodeLinkAll){
    for(let i = 0; i < copyEpisodeLinkAll.length; i++){
      copyEpisodeLinkAll[i].addEventListener('click', function(){
        playerEpisodeLinkInputAll[i].select()
        document.execCommand('Copy')

        Swal.fire({
          icon: 'success',
          title: '已複製！',
          showConfirmButton: false,
          timer: 1000
        })
      })
    }
  }
  if(copyEpisodeSpanAll){
    for(let i = 0; i < copyEpisodeSpanAll.length; i++){
      copyEpisodeSpanAll[i].addEventListener('click', function(){
        playerEpisodeLinkInputAll[i].select()
        document.execCommand('Copy')

        Swal.fire({
          icon: 'success',
          title: '已複製！',
          showConfirmButton: false,
          timer: 1000
        })
      })
    }
  }

  // 複製節目短網址連結
  if(copyEpisodeSlugLinkAll){
    for(let i = 0; i < copyEpisodeSlugLinkAll.length; i++){
      copyEpisodeSlugLinkAll[i].addEventListener('click', function(){
        playerEpisodeSlugLinkInputAll[i].select()
        document.execCommand('Copy')

        Swal.fire({
          icon: 'success',
          title: '已複製！',
          showConfirmButton: false,
          timer: 1000
        })
      })

    }
  }
  if(copyEpisodeSlugSpanAll){
    for(let i = 0; i < copyEpisodeSlugSpanAll.length; i++){
      copyEpisodeSlugSpanAll[i].addEventListener('click', function(){
        playerEpisodeSlugLinkInputAll[i].select()
        document.execCommand('Copy')

        Swal.fire({
          icon: 'success',
          title: '已複製！',
          showConfirmButton: false,
          timer: 1000
        })
      })
    }
  }







})
