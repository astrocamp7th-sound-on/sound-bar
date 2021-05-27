import "./donate"

document.addEventListener('turbolinks:load', function() {

  let searchForm = document.querySelector('.search-form')




  
  // 使用者登入後的節目列表搜尋框
  if (searchForm){
    searchForm.addEventListener('focusin', (e) => {
      console.log(e)
      e.target.parentElement.classList.add('search-bar-ring');
    })
    searchForm.addEventListener('focusout', (e) => {
      e.target.parentElement.classList.remove('search-bar-ring');
    })
  }




})
