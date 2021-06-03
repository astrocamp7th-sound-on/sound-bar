document.addEventListener("turbolinks:load", function () {
  let replyComment = document.querySelectorAll('#replyComment')
  let repliesBtn = document.querySelectorAll('#repliesBtn')

  if (replyComment) {
    for(let i = 0; i < replyComment.length; i++) {
      replyComment[i].addEventListener('click', function(e){
        e.target.parentElement.nextElementSibling.classList.toggle('hidden')
      })
    }
  }

  if (repliesBtn) {
    for(let i = 0; i < repliesBtn.length; i++) {
      repliesBtn[i].addEventListener('click', function(e){
        e.target.nextElementSibling.classList.toggle('hidden')
      })
    }
  }


})
