const form = document.querySelector("form");
const password = document.querySelector("#pass");
const confirmPassword = document.querySelector("#confirm-pass");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const existingError = document.querySelector(".error-message");

  if (password.value !== confirmPassword.value) {
    if (!existingError) {
      const error = document.createElement("span");
      error.textContent = "* Passwords do not match.";
      error.classList.add("error-message");
      error.style.color="red";
      confirmPassword.parentElement.appendChild(error);
    }
  } else {
    if (existingError) existingError.remove();

    alert("Account created successfully!");
    form.reset();
  }
});