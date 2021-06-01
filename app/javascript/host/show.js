import Swal from 'sweetalert2'

document.addEventListener("turbolinks:load", function () {

  let openEpisodeBtn = document.querySelector('#openEpisodeBtn')
  let closeEpisodeBtn = document.querySelector('#closeEpisodeBtn')
  let episodeLink = document.querySelector('#episodeLink')
  let copyEpisodeLink = document.querySelector('.copy-episode-link')
  let copyEpisodeSpan = document.querySelector('#copyEpisodeSpan')
  let copyEpisodeSlugLink = document.querySelector('.copy-episode-slug-link')
  let copyEpisodeSlugSpan = document.querySelector('#copyEpisodeSlugSpan')

  // 網頁播放器
  if(openEpisodeBtn){
    openEpisodeBtn.addEventListener('click', function(){
      openEpisodeBtn.classList.add('text-blue-500')
      openEpisodeBtn.classList.add('border-blue-500')
      closeEpisodeBtn.classList.remove('hidden')
      episodeLink.classList.remove('hidden')
    })
  }
  if(closeEpisodeBtn){
    closeEpisodeBtn.addEventListener('click', function(){
      openEpisodeBtn.classList.remove('text-blue-500')
      openEpisodeBtn.classList.remove('border-blue-500')
      closeEpisodeBtn.classList.add('hidden')
      episodeLink.classList.add('hidden')
    })
  }


  // 複製節目連結
  if(copyEpisodeLink){
    copyEpisodeLink.addEventListener('click', function(){
      document.querySelector('#playerEpisodeLinkInput').select()
      document.execCommand('Copy')

      Swal.fire({
        icon: 'success',
        title: '已複製！',
        showConfirmButton: false,
        timer: 1000
      })
    })
  }
  if(copyEpisodeSpan){
    copyEpisodeSpan.addEventListener('click', function(){
      document.querySelector('#playerEpisodeLinkInput').select()
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
  if(copyEpisodeSlugLink){
    copyEpisodeSlugLink.addEventListener('click', function(){
      document.querySelector('#playerEpisodeSlugLinkInput').select()
      document.execCommand('Copy')

      Swal.fire({
        icon: 'success',
        title: '已複製！',
        showConfirmButton: false,
        timer: 1000
      })
    })
  }
  if(copyEpisodeSlugSpan){
    copyEpisodeSlugSpan.addEventListener('click', function(){
      document.querySelector('#playerEpisodeSlugLinkInput').select()
      document.execCommand('Copy')

      Swal.fire({
        icon: 'success',
        title: '已複製！',
        showConfirmButton: false,
        timer: 1000
      })
    })
  }







})
