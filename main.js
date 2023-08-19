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

submitButton.addEventListener("click", () => {
  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      input.classList.add("invalid");
      const existingError = input.nextElementSibling;
      if (!existingError || !existingError.classList.contains("errorMsg")) {
        const errorMsg = document.createElement("div");
        errorMsg.classList.add("errorMsg");
        switch (input.id) {
          case "firstname":
            errorMsg.innerHTML = "<p>First Name cannot be empty</p>";
            break;
          case "lastname":
            errorMsg.innerHTML = "<p>Last Name cannot be empty</p>";
            break;
          case "email":
            errorMsg.innerHTML = "<p>Looks like this is not an email</p>";
            break;
          case "password":
            errorMsg.innerHTML = "<p>Password cannot be empty</p>";
            break;
        }
        input.insertAdjacentElement("afterend", errorMsg);
      }
    } else {
      input.classList.remove("invalid");
    }

    if (input.type === "email" && !input.value.trim().endsWith("@gmail.com")) {
      input.classList.add("invalid");
      input.style.color = "var(--red)";
      const existingError = input.nextElementSibling;
      if (!existingError || !existingError.classList.contains("errorMsg")) {
        const errorMsg = document.createElement("div");
        errorMsg.classList.add("errorMsg");
        errorMsg.innerHTML = "<p>Looks like this is not an email</p>";
        input.insertAdjacentElement("afterend", errorMsg);
      }
    }
  });
});
