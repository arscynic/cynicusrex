document.addEventListener("DOMContentLoaded", function () {
    const terms = document.getElementsByClassName("sum");
    let sum = 0;
    for (n = 0; n < terms.length; n++) {
      sum += parseFloat(terms[n].innerHTML);
      terms[n].innerHTML = '&euro;' + terms[n].innerHTML;
    }
    total.innerHTML = sum.toFixed(2);
  });