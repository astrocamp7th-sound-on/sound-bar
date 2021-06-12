import'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';


document.addEventListener("turbolinks:load", function () {
  let img_field = document.querySelector('#podcast_cover')
  let button = document.querySelector('#btn-save')

  var canvas = document.querySelector('#canvas')
  var context = canvas.getContext('2d');



  img_field.addEventListener('change', (e) => {
    var file = e.target.files[0]

    console.log(file)
    var reader = new FileReader();
    if  (!file.type.match(/^image\//) ) {
        window.alert("請選擇照片");
        return ;
    }
    reader.onload = ((e) => {
      var image = document.querySelector('#imageModal')
      var imageX = document.querySelector('#podcast_x')
      var imageY = document.querySelector('#podcast_y')
      var imageWidth = document.querySelector('#podcast_width')
      var imageHeight = document.querySelector('#podcast_height')
      image.setAttribute('src', e.target.result)
      image.onload = () => {
        var dialog = document.querySelector('#dialog')
        image.removeAttribute('style')
        context.canvas.width = image.width
        context.canvas.height =  image.height
        context.drawImage(image, 0, 0)
        dialog.showModal()
        if (dialog.open) {
          var cropper = new Cropper(canvas,{
            aspectRatio: 1 / 1,
            crop (e) {

              var image_information = e.detail
              console.log(image_information)
            }
        // imageX.value(Math.round(image_information.x)),
        // imageY.value(Math.round(image_information.y)),
        // imageWidth.value(Math.round(image_information.width)),
        // imageHeight.value(Math.round(image_information.height)),
          })

        }
      }
    })
    reader.readAsDataURL(file)
  })
  button.addEventListener('click',() => {
     imgCropping()
  })

// modal 關閉

  // cropModal.addEventListener('click', () => {
  //   // image.cropper('destroy').removeAttribute('src')
  //   let cropperContainer = document.querySelector('.cropper-container')
  //   cropperContainer.remove()
  // })
  // beforeUpload.style.visibility = "hidden"
  // let croppedData = cropper.crop('getCroppedCanvas').toDataURL()
  // croppedImage.setAttribute('src', croppedData);
  // cropModal.style.visibility = "hidden"

  function imgCropping() {
    if (!croppable) {
      alert('發生錯誤無法裁切圖片')
      return false;
    }
  }
})















    // when file upload
  //   $img_field.change((e) => {
  //     $image.cropper('destroy').removeAttr('src');
  //     file = e.target.files[0];
  //     reader = new FileReader();
  //     if (file.type.indexOf('image') < 0) {
  //       window.alert("画像を選択してください");
  //       return ;
  //     }
  //     reader.onload = ((e) => {
  //       $image.attr('src',"");
  //       $image.attr('src', e.target.result);
  //       $cropModal.modal('show');
  //       $cropModal.on('shown.bs.modal', () => {
  //         $image.cropper(options);
  //       });
  //     });
  //     reader.readAsDataURL(file);
  //   })
  //   // onclick save button
  //   $button.click(() => {
  //     imgCropping();
  //   });

  //   // modalを閉じたとき、cropper要素を初期化
  //   $cropModal.on('hidden.bs.modal',function() {
  //     $image.cropper('destroy').removeAttr('src');
  //     let $cropperContainer = $('.cropper-container');
  //     $cropperContainer.remove();
  //   });

  //   function imgCropping() {
  //     if (!croppable) {
  //       alert('トリミングする画像が用意されていません')
  //       return false;
  //     }
  //     $beforeUpload.hide();
  //     let croppedData = $image.cropper('getCroppedCanvas').toDataURL();
  //     $croppedImage.attr('src', croppedData);
  //     $cropModal.modal('hide');
  //   }
  // });


