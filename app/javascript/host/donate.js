// 後台創作營利頁面
import Swal from 'sweetalert2'

document.addEventListener("turbolinks:load", function () {

  let donateTabs = document.querySelector('#donateTabs')
  let donateFrom = document.querySelector('#donateFrom')
  let withdraw = document.querySelector('#withdraw')
  let withdrawClose = document.querySelector('#withdraw-close')
  let copyDonateLink = document.querySelector('.copy-donate-link')

  // 複製贊助連結
  if(copyDonateLink){
    copyDonateLink.addEventListener('click', function(){
      document.querySelector('#donateLinkInput').select()
      document.execCommand('Copy')

      Swal.fire({
        icon: 'success',
        title: '已複製！',
        showConfirmButton: false,
        timer: 1000
      })
    })
  }

  // 我要提領
  if (withdraw){
    withdraw.addEventListener('click', function(){
      document.querySelector('.withdraw-box').classList.remove('hidden')
    })
  }

  // 關閉提領燈箱
  if (withdrawClose){
    withdrawClose.addEventListener('click', function(){
      document.querySelector('.withdraw-box').classList.add('hidden')
    })
  }

  // 聽眾贊助 & 廣告贊助
  if (donateFrom){
    donateFrom.addEventListener('click', function(e){
      for(let i = 0; i < donateFrom.children.length; i++){
        donateFrom.children[i].classList.remove('text-blue-500')
        donateFrom.children[i].classList.remove('border-b-2')
        donateFrom.children[i].classList.remove('border-blue-400')
        document.querySelector(`.${donateFrom.children[i].id}_content`).classList.add('hidden')
      }
      e.target.classList.add('text-blue-500')
      e.target.classList.add('border-b-2')
      e.target.classList.add('border-blue-400')
      document.querySelector(`.${e.target.id}_content`).classList.remove('hidden')
    })
  }

  // 贊助連結 & 我的進帳 & 我的錢包
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
