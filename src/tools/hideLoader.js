export default function () {
  // hide loading page
  document.querySelector('div#firstPageLoading').addEventListener('transitionend', (e) => {
    // transitionend event fires for each individual property, in this case, twice(opacity and transform)
    if (e.propertyName === 'opacity') {
      e.target.parentElement.removeChild(e.target)
      // console.log('faded@')
    }
  })
  document.querySelector('div#firstPageLoading').classList.add('firstPageFadeout')
  // end
}
