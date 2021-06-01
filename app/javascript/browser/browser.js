document.addEventListener("turbolinks:load", function () {

  let backArrow = document.querySelector('#backArrow')
  let frontArrow = document.querySelector('#frontArrow')
  let playerBtn = document.querySelector('#playerBtn')

  if (backArrow) {
    backArrow.addEventListener('click', function(){
      document.querySelector('.wrapper').scrollLeft += 200;
    })
  }

  if (frontArrow) {
    frontArrow.addEventListener('click', function(){
      document.querySelector('.wrapper').scrollLeft -= 200;
    })
  }

  if (playerBtn) {
    playerBtn.addEventListener('click', function(){
      document.querySelector('.player').classList.toggle('hidden')
    })
  }
})
