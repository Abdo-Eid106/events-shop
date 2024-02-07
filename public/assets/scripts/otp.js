const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const input3 = document.getElementById("input3");
const input4 = document.getElementById("input4");
const otp = document.getElementById("otp");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("form");

input1.addEventListener("input", () => {
   if (input1.value != "") {
      input2.disabled = false;
      input2.focus();
   } else input2.disabled = true;
});

input2.addEventListener("input", () => {
   if (input2.value != "") {
      input3.disabled = false;
      input3.focus();
   } else input3.disabled = true;
});

input3.addEventListener("input", () => {
   if (input3.value != "") {
      input4.disabled = false;
      input4.focus();
   } else input4.disabled = true;
});

input2.addEventListener("keydown", (event) => {
   if (event.key == "Backspace" && input2.value == "") input1.focus();
});

input3.addEventListener("keydown", (event) => {
   if (event.key == "Backspace" && input3.value == "") input2.focus();
});

input4.addEventListener("keydown", (event) => {
   if (event.key == "Backspace" && input4.value == "") input3.focus();
});

submitBtn.addEventListener("click", () => {
   otp.value = input1.value + input2.value + input3.value + input4.value;
   form.submit();
});
