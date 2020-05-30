$("#loan-form").submit(function (e) {
  $("#loading").css("display", "block");
  $("#results").css("display", "none");
  setTimeout(calculateResults, 1500);
  e.preventDefault();
});
function calculateResults() {
  const amount = $("#amount").val();
  const interest = $("#interest").val();
  const years = $("#years").val();

  //const monthlyPayment = $("#monthly-payment");
  //const totalPayment = $("#total-payment");
  //const totalInterest = $("#total-interest");

  const principal = parseFloat(amount);
  const calculatedInterest = parseFloat(interest) / 100 / 12;
  const calculatedPayments = parseFloat(years) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    $("#monthly-payment").val(monthly.toFixed(2));
    $("#total-payment").val((monthly * calculatedPayments).toFixed(2));
    $("#total-interest").val(
      (monthly * calculatedPayments - principal).toFixed(2)
    );
    $("#loading").css("display", "none");
    $("#results").css("display", "block");
  } else {
    showError();
  }
}
function showError() {
  $("#loading").css("display", "none");
  $(".heading").before(
    "<div class= 'alert alert-danger'>Please, check your numbers.</div>"
  );
  setTimeout(function () {
    $(".alert").remove();
  }, 2000);
}
