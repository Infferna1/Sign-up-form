const submitButton = document.querySelector("button");
const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.classList.remove("invalid");
    input.style.color = "black";
    const errorMsg = input.nextElementSibling;
    if (errorMsg && errorMsg.classList.contains("errorMsg")) {
      errorMsg.remove();
    }
  });
});

const errorMessages = {
  firstname: "First Name cannot be empty",
  lastname: "Last Name cannot be empty",
  email: "Looks like this is not an email",
  password: "Password cannot be empty",
  invalidEmail: "Invalid email format",
};

submitButton.addEventListener("click", () => {
  inputs.forEach((input) => {
    const value = input.value.trim();
    const isEmpty = value === "";
    const inputType = input.type;

    let errorMsgText = errorMessages[input.id];

    if (inputType === "email" && !isValidEmail(value)) {
      errorMsgText = errorMessages.invalidEmail;
      input.style.color = "var(--red)";
    } else {
      input.style.color = "black";
    }

    if (isEmpty || (inputType === "email" && !isValidEmail(value))) {
      input.classList.add("invalid");

      const existingError = input.nextElementSibling;
      if (!existingError || !existingError.classList.contains("errorMsg")) {
        const errorMsg = document.createElement("div");
        errorMsg.classList.add("errorMsg");
        errorMsg.innerHTML = `<p>${errorMsgText}</p>`;
        input.insertAdjacentElement("afterend", errorMsg);
      }
    } else {
      input.classList.remove("invalid");
      const existingError = input.nextElementSibling;
      if (existingError && existingError.classList.contains("errorMsg")) {
        existingError.remove();
      }
    }
  });
});

function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
}
