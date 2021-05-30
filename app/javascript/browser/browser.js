document.addEventListener("turbolinks:load", function () {

  let backArrow = document.querySelector('#backArrow')
  let playerBtn = document.querySelector('#playerBtn')

  if (backArrow) {
    backArrow.addEventListener('click', function(){
      document.querySelector('.wrapper').classList.add('move_back')
    })
  }

  if (playerBtn) {
    playerBtn.addEventListener('click', function(){
      document.querySelector('.player').classList.toggle('hidden')
    })
  }

  // if (playerBtn) {
  //   playerBtn.addEventListener('click', function(){
  //     document.querySelector('.player').classList.add('hidden')
  //   })
  // }
})
