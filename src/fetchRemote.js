function fetchRemote(url) {
  url = url || '/dishes'
  return fetch(url).then(function(res) {
    return res.json()
  })
}

export default fetchRemote
