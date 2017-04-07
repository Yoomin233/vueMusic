import Store from './store.js'
import {getAjax} from '../tools/toolsFunction'
import config from '../config/config.js'
// console.log(musicServer)

export default getAjax('GET', `${config.musicServer.url}musicList.json`)
.then((list) => {
  Store.commit('updatePlayList', list)
  Store.commit('updateCurrentPlaying', 0)
})
