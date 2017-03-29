let storage = window.localStorage
function set (key, value) {
  storage.setItem(key, value)
}

function get (key) {
  return storage.getItem(key)
}

function add (key, value) {
  let prevStorage = get(key)
  if (!prevStorage) {
    set(key, [value])
  } else {
    prevStorage = prevStorage.split(',')
    // debugger
    if (prevStorage.indexOf(value) === -1) {
      prevStorage.push(value)
    }
    set(key, prevStorage)
  }
}

export {
  add,
  set,
  get
}
