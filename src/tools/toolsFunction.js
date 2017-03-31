const $ = document.querySelector.bind(document)
const log = console.log.bind(console)
const getAjax = function (method, url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText))
      }
    }
    xhr.send()
  })
}
const formatTime = (duration) => {
  let seconds = duration % 60
  let minutes = (duration - seconds) / 60
  return `${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`
}
export {
  $,
  log,
  getAjax,
  formatTime
}
