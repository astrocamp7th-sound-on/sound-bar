// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

import "tailwind/application"

Rails.start()
Turbolinks.start()
ActiveStorage.start()

import "fontawesome"
import "styles"
import "host"
import "player"
import "browser"



document.addEventListener('turbolinks:load', function(){

  let notice = document.querySelector('#notice')

  // 3秒後消除notice
  if (notice){
    let timeout = null
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      notice.classList.add('hidden')
    }, 3000);
  }
})
