import Swal from 'sweetalert2'

document.addEventListener("turbolinks:load", function () {

  let openEpisodeBtnAll = document.querySelectorAll('#openEpisodeBtnAll')
  let closeEpisodeBtn = document.querySelector('#closeEpisodeBtn')
  let episodeLinkAll = document.querySelectorAll('#episodeLinkAll')
  let copyEpisodeLinkAll = document.querySelectorAll('.copy-episode-link-all')
  let copyEpisodeSpanAll = document.querySelectorAll('#copyEpisodeSpanAll')
  let copyEpisodeSlugLinkAll = document.querySelectorAll('.copy-episode-slug-link-all')
  let copyEpisodeSlugSpanAll = document.querySelectorAll('#copyEpisodeSlugSpanAll')
  let playerEpisodeLinkInputAll = document.querySelectorAll('#playerEpisodeLinkInputAll')
  let playerEpisodeSlugLinkInputAll = document.querySelectorAll('#playerEpisodeSlugLinkInputAll')

  // 網頁播放器
  if(openEpisodeBtnAll){
    for(let i = 0; i < openEpisodeBtnAll.length; i++){
      openEpisodeBtnAll[i].addEventListener('click', function(){
        openEpisodeBtnAll[i].classList.add('text-blue-500')
        openEpisodeBtnAll[i].classList.add('border-blue-500')
        episodeLinkAll[i].classList.remove('hidden')
        closeEpisodeBtn.classList.remove('hidden')
      })
      closeEpisodeBtn.addEventListener('click', function(){
        openEpisodeBtnAll[i].classList.remove('text-blue-500')
        openEpisodeBtnAll[i].classList.remove('border-blue-500')
        episodeLinkAll[i].classList.add('hidden')
        closeEpisodeBtn.classList.add('hidden')
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
