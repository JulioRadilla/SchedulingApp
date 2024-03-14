document
.getElementById("loginForm")
.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  fetch(this.action, {
    method: this.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        document.getElementById("errorMessage").style.display = "block";
        
      } else {
        window.location.href = "/home";
      }
    })
    .catch((error) => {
      console.error("error:" + error);
    });
});