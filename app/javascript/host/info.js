import Swal from 'sweetalert2'
import "./cropper"
document.addEventListener("turbolinks:load", function () {

  let openPodcastBtn = document.querySelector('#openPodcastBtn')
  let closePodcastBtn = document.querySelector('#closePodcastBtn')
  let podcastLink = document.querySelector('#podcastLink')
  let copyPodcastLink = document.querySelector('.copy-podcast-link')
  let copyPodcastSpan = document.querySelector('#copyPodcastSpan')
  let copyPodcastSlugLink = document.querySelector('.copy-podcast-slug-link')
  let copyPodcastSlugSpan = document.querySelector('#copyPodcastSlugSpan')

  // 網頁播放器
  if(openPodcastBtn){
    openPodcastBtn.addEventListener('click', function(){
      openPodcastBtn.classList.add('text-blue-500')
      openPodcastBtn.classList.add('border-blue-500')
      closePodcastBtn.classList.remove('hidden')
      podcastLink.classList.remove('hidden')
    })
  }
  if(closePodcastBtn){
    closePodcastBtn.addEventListener('click', function(){
      openPodcastBtn.classList.remove('text-blue-500')
      openPodcastBtn.classList.remove('border-blue-500')
      closePodcastBtn.classList.add('hidden')
      podcastLink.classList.add('hidden')
    })
  }


  // 複製節目連結
  if(copyPodcastLink){
    copyPodcastLink.addEventListener('click', function(){
      document.querySelector('#playerPodcastLinkInput').select()
      document.execCommand('Copy')

      Swal.fire({
        icon: 'success',
        title: '已複製！',
        showConfirmButton: false,
        timer: 1000
      })
    })
  }
  if(copyPodcastSpan){
    copyPodcastSpan.addEventListener('click', function(){
      document.querySelector('#playerPodcastLinkInput').select()
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
  if(copyPodcastSlugLink){
    copyPodcastSlugLink.addEventListener('click', function(){
      document.querySelector('#playerPodcastSlugLinkInput').select()
      document.execCommand('Copy')

      Swal.fire({
        icon: 'success',
        title: '已複製！',
        showConfirmButton: false,
        timer: 1000
      })
    })
  }
  if(copyPodcastSlugSpan){
    copyPodcastSlugSpan.addEventListener('click', function(){
      document.querySelector('#playerPodcastSlugLinkInput').select()
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
