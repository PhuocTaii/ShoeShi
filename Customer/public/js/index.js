function handleSearchBar(event) {
  if (event.key === "Enter") {
    const query = event.target.value;
    if(query == '')
      return
    window.location.href = "/product?product-name=" + query;
  }
}

function handleSearchBtnClick(element) {
  const inputElement = element.nextElementSibling;
  const query = inputElement.value;
  if(query == '')
    return
  window.location.href = "/product?product-name=" + query;
}