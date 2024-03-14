document
.getElementById("signUpForm")
.addEventListener("submit", async function (event) {
  event.preventDefault();

  const response = await fetch(this.action, {
    method: this.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName: document.getElementById("fullName").value,
      phoneNumber: document.getElementById("phoneNumber").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    }),
  });

  if (!response.ok) {
    document.getElementById("errorMessage").style.display = "block";
    document.querySelector(".container").style.height = "545px";
  } else {
    window.location.href = "/home";
  }
});