document.addEventListener("DOMContentLoaded", function () {
    const terms = document.getElementsByClassName("sum");
    let sum = 0;
    for (n = 0; n < terms.length; n++) {
      const tempFloat = parseFloat(terms[n].innerHTML);
      sum += tempFloat;
      terms[n].innerHTML = '&euro;' + tempFloat.toFixed(2);
    }
    const sumMonth = sum.toFixed(2);
    const sumYear = (sumMonth * 12).toFixed(2);
    totalMonth.innerHTML = sumMonth;
    totalYear.innerHTML = sumYear;
  });