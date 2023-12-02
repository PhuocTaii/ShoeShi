function showReviewPage(id) {
  // Ẩn tất cả các phần tử có class 'review'
  var reviewList = document.getElementsByClassName('review')
  for (var i = 0; i < reviewList.length; i++) {
    reviewList[i].classList.remove('show')
  }

  document.getElementById(id).classList.add('show')
}
