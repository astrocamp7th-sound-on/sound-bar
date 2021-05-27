// 後台創作營利頁面
document.addEventListener("turbolinks:load", function () {

  let donateTabs = document.querySelector('#donateTabs')
  let donateFrom = document.querySelector('#donateFrom')
  let withdraw = document.querySelector('#withdraw')
  let withdrawClose = document.querySelector('#withdraw-close')

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
      for(i = 0; i < donateFrom.children.length; i++){
        donateFrom.children[i].classList.remove('text-blue-500')
        document.querySelector(`.${donateFrom.children[i].id}_content`).classList.add('hidden')
      }
      e.target.classList.add('text-blue-500')
      document.querySelector(`.${e.target.id}_content`).classList.remove('hidden')
    })
  }

  if (donateTabs){
    donateTabs.addEventListener('click', function(e){
      for(i = 0; i < donateTabs.children.length; i++){
        donateTabs.children[i].classList.remove('bg-white')
        donateTabs.children[i].classList.remove('text-blue-500')
        document.querySelector(`.${donateTabs.children[i].id}_content`).classList.add('hidden')
      }
      e.target.classList.add('bg-white')
      e.target.classList.add('text-blue-500')
      document.querySelector(`.${e.target.id}_content`).classList.remove('hidden')
    })
  }

})
