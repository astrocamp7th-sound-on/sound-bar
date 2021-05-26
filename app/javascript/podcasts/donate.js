// 後台創作營利頁面
import Swal from 'sweetalert2'

document.addEventListener("turbolinks:load", function () {

  let donateTabs = document.querySelector('#donateTabs')
  let donateFrom = document.querySelector('#donateFrom')
  let withdraw = document.querySelector('#withdraw')
  let withdrawClose = document.querySelector('#withdraw-close')

  let copyDonateLink = document.querySelector('.copy-donate-link')

  if(copyDonateLink){
    copyDonateLink.addEventListener('click', function(){
      document.querySelector('#donateLinkInput').select()
      document.execCommand('Copy')

      
      Swal.fire({
        icon: 'success',
        title: '已複製！',
        showConfirmButton: false,
        timer: 700
      })
    })

  }

  if (withdraw){
    withdraw.addEventListener('click', function(){
      document.querySelector('.withdraw-box').classList.remove('hidden')
    })
  }

  if (withdrawClose){
    withdrawClose.addEventListener('click', function(){
      document.querySelector('.withdraw-box').classList.add('hidden')
    })
  }

  if (donateFrom){
    donateFrom.addEventListener('click', function(e){
      for(let i = 0; i < donateFrom.children.length; i++){
        donateFrom.children[i].classList.remove('text-blue-500')
        document.querySelector(`.${donateFrom.children[i].id}_content`).classList.add('hidden')
      }
      e.target.classList.add('text-blue-500')
      document.querySelector(`.${e.target.id}_content`).classList.remove('hidden')
    })
  }

  if (donateTabs){
    donateTabs.addEventListener('click', function(e){
      for(let j = 0; j < donateTabs.children.length; j++){
        donateTabs.children[j].classList.remove('bg-white')
        donateTabs.children[j].classList.remove('text-blue-500')
        document.querySelector(`.${donateTabs.children[j].id}_content`).classList.add('hidden')
      }
      e.target.classList.add('bg-white')
      e.target.classList.add('text-blue-500')
      document.querySelector(`.${e.target.id}_content`).classList.remove('hidden')
    })
  }

})
