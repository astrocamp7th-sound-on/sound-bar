import Rails from "@rails/ujs"

document.addEventListener("turbolinks:load", function () {

  let podcastNameInput = document.querySelector('#podcastNameInput')

  // navbar搜尋節目功能
  if (podcastNameInput) {
    let timeout = null
    podcastNameInput.addEventListener('keyup', function(e){
      let searchValue = e.target.value
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        Rails.ajax({
          url: '/api/v1/podcasts',
          type: 'get',
          success: function(res){
            let result = res.filter(function(podcast){
              return podcast.name.indexOf(searchValue) > -1
            })
            let content = result.map(function(podcast){
              return `
              <li class="my-1 hover:bg-gray-100 p-2">
                <a href="/podcasts/${podcast.random_url}/dashboard" class="block">${podcast.name}</a>
              </li>
              `
            })
            document.querySelector('#podcastNameUl').innerHTML = content.join('')
          },
          failure: function(res){
            console.log(res)
          }
        })
      }, 1000);
    })
  }





})
