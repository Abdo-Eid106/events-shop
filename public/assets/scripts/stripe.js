var stripe = Stripe(
   "pk_test_51Ofl9eF96KcUfUki0mOPDF1TD8MqKEoCyxnySXSEbxcvgb8No2FRanPMBaQBBbfSNDPKSKGkhRlYH3XDjCrtvwhR00RP9Qa5IN"
);
var submitButton = document.getElementById("stripe");

submitButton.addEventListener("click", async (_) => {
   const response = await fetch("/payments/checkout-session", {
      method: "POST",
   });

   const session = await response.json();

   await fetch("/payments", {
      method: "POST",
   });
   const result = await stripe.redirectToCheckout({ sessionId: session.id });
});
