import'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';


document.addEventListener("turbolinks:load", function () {
  var img_field = document.querySelector('#podcast_cover')
  var beforeUpload = document.querySelector('#beforeUpload')
  var image = document.querySelector('#imageDialog')
  var canvas = document.querySelector('#canvas')
  var context = canvas.getContext('2d');
  var button = document.querySelector('#btn-save')
  var croppedImage = document.querySelector('#croppedImage')

  img_field.addEventListener('change', (e) => {
    var file = e.target.files[0]
    var reader = new FileReader();
    if  (!file.type.match(/^image\//) ) {
        window.alert("請選擇照片");
        return ;
    }
    reader.onload = ((e) => {
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
        var cropper = new Cropper(canvas,{
          aspectRatio: 1 / 1,
          movable: true,
          crop: (e) => {
            var image_information = e.detail
            imageX.setAttribute('value',(Math.round(image_information.x))),
            imageY.setAttribute('value',(Math.round(image_information.y))),
            imageWidth.setAttribute('value',(Math.round(image_information.width))),
            imageHeight.setAttribute('value',(Math.round(image_information.height)))
          }
        })
        function imgCropping() {
          beforeUpload.style.visibility = "hidden"
          var croppedData = cropper.getCroppedCanvas().toDataURL('image/jpeg')
          croppedImage.setAttribute('src', croppedData)
          croppedImage.removeAttribute('style')
          dialog.close()
        }
        button.addEventListener('click',() => {
          imgCropping()
        })
      }
      // dialog關閉 cropper 初始化
      dialog.addEventListener('close', () => {
        var cropper = new Cropper(canvas,{})
        cropper.destroy()
        image.removeAttribute('src')
        var cropperContainer = document.querySelector('.cropper-container')
        cropperContainer.remove()
      })
    })
    reader.readAsDataURL(file)
  })
})
