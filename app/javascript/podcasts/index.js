document.addEventListener('turbolinks:load', function() {
  document.querySelector('.search-form').addEventListener('focusin', (e) => {
    e.target.parentElement.classList.add('search-bar-ring');
  })
  document.querySelector('.search-form').addEventListener('focusout', (e) => {
    e.target.parentElement.classList.remove('search-bar-ring');  
  })
})
