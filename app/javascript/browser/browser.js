document.addEventListener("turbolinks:load", function () {

  let backArrow = document.querySelector('#backArrow')

  if (backArrow) {
    backArrow.addEventListener('click', function(){
      document.querySelector('.wrapper').classList.add('move_back')
    })
  }
})

