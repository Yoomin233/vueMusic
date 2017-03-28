var hideLoader =  function () {
  // hide loading page
  let node = document.querySelector('div#firstPageLoading')
  // debugger
  if (node) {
    node.addEventListener('transitionend', function anony (e) {
      // transitionend event fires for each individual property, in this case, twice(opacity and transform)
      node.parentElement.removeChild(node)
      node.removeEventListener('transitionend', anony)
      // console.log('faded@')
    })
    node.classList.add('firstPageFadeout')
    // end
  }
}

export default hideLoader
