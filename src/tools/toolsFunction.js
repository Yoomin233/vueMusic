export const $ = document.querySelector.bind(document)
export const log = console.log.bind(console)
export const getAjax = function (method, url) {
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
export const formatTime = (duration) => {
  let seconds = duration % 60
  let minutes = (duration - seconds) / 60
  return `${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`
}
export const throttle = (fn, interval) => {
  let start = Date.now()
  return (...rest) => {
    if (Date.now() - start >= interval) {
      start = Date.now()
      fn(...rest)
    }
  }
}
let debounceTimer = null
export const debounce = (fn, delay) => {
  return (...rest) => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      fn(...rest)
    }, delay)
  }
}
