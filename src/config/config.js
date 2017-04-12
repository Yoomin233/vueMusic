const config = {
  local: {
    musicServer: {
      url: 'http://192.168.27.1:8091/',
      // url: 'http://192.168.31.146:8091/',
      // url: 'http://localhost:8091/'
    }
  },
  server: {
    musicServer: {
      url: 'http://121.196.198.168:10020/'
    }
  }
}
export default config[devEnv]
