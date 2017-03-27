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
export {
  $,
  log,
  getAjax
}
