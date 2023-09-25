document.addEventListener("DOMContentLoaded", function () {
    const terms = document.getElementsByClassName("sum");
    let sum = 0;
    for (n = 0; n < terms.length; n++) {
      const tempFloat = parseFloat(terms[n].innerHTML);
      sum += tempFloat;
      terms[n].innerHTML = '&euro;' + tempFloat.toFixed(2);
    }
      totalYear.innerHTML = sum.toFixed(2);
  });