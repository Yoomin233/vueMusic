<template>
  <div class="top">
    <div class="searchBar">
      <router-link to='/main' tag='span'></router-link>
      <input type="search" placeholder="搜索音乐, 歌手, 歌词, 用户">
    </div>
    <div class='recentSearchList'>
      <p v-for='item in recentSearch'>{{item}}<span @click='deleteRecentSearchItem(item)'>X</span></p>
    </div>
    <play-bar keep-alive></play-bar>
  </div>
</template>
<script>
import playBar from './components/playBar.vue'
import localStorage from './tools/localStorage'
import router from './router'
export default {
  data () {
    return {
      recentSearch: ''
    }
  },
  components: {
    playBar
  },
  mounted () {
    document.querySelector('div.searchBar > input').focus()
    document.querySelector('div.searchBar > input').addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        localStorage.add('recentSearch', e.target.value)
        router.push('/searchResult')
      }
    })
    this.recentSearch = localStorage.get('recentSearch')&&localStorage.get('recentSearch').split(',')
  },
  methods: {
    deleteRecentSearchItem (item) {
      let no = this.recentSearch.indexOf(item)
      this.recentSearch.splice(no, 1)
      localStorage.set('recentSearch', this.recentSearch)
    }
  }
}
</script>
<style scoped lang='less'>
div.searchBar {
  height: 3em;
  background-color: red;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: .5em .3em .5em 1em;
  box-sizing: border-box;
  color: white;
  > span {
    color: white;
    position: relative;
    line-height: 2em;
    &::before {
      font-family: 'icomoon' !important;
      content: '\ea40';
      font-size: 1.5em;
    }
  }
  > input[type=search] {
    width: 90%;
    background-color: inherit;
    border: none;
    outline: none;
    border-bottom: 1px solid white;
    font-size: 1em;
    color: inherit;
  }
}
div.recentSearchList {
  > p {
    margin-left: 5ch;
    padding-right: 1ch;
    border-bottom: 1px solid #ddd;
    line-height: 2;
    position: relative;
    display: flex;
    justify-content: space-between;
    &::before {
      font-family: 'icomoon' !important;
      content: '\e94e';
      position: absolute;
      left: 0;
      transform: translateX(-150%);
      color: #ddd;
    }
    > span {
      font-family: sans-serif;
      color: #ddd;
    }
  }
}
</style>
