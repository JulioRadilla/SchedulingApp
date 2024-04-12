function updateProfile(event) {
    event.preventDefault(); // Prevent the default form submission

    // Hide both error and success messages initially
    document.getElementById("errorMessage").style.display = "none";
    document.getElementById("successMessage").style.display = "none";
    document.getElementById("emptyErrorMessage").style.display = "none";

    // Create a JavaScript object with the data
    const data = {
      fullName: document.getElementById("name").value,
      phoneNumber: document.getElementById("number").value,
      email: document.getElementById("email").value,
      password: document.getElementById("pass").value,
    };

    if (
      !data.fullName &&
      !data.phoneNumber &&
      !data.email &&
      !data.password
    ) {
      // If all fields are empty, display an error message
      document.getElementById("emptyErrorMessage").style.display = "block";
      return;
    }


    fetch("http://localhost:5000/updateUserProfile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          document.getElementById("successMessage").style.display = "block";
          document.getElementById("updateProfileForm").reset();
        } else {
          document.getElementById("errorMessage").style.display = "block";
          document.getElementById("updateProfileForm").reset();
        }
      })
      .catch((error) => {
        console.error("error:" + error);
      });
  }

  function deleteProfile() {
    const url = "/deleteProfile";

    axios
      .delete(url)
      .then((response) => {
        console.log(response.data); // Handle success response
        // You can also handle success messages or redirects here
      })
      .catch((error) => {
        console.error("Error deleting profile:", error);
        // Handle error, display error messages, etc.
      });
  }
  const fileInput = document.getElementById("fileInput");
  const uploadedImage = document.getElementById("uploadedImage");
  fileInput.addEventListener("change", () => {
    // Check if any file is selected
    if (fileInput.files && fileInput.files[0]) {
      // Create a FileReader object
      const reader = new FileReader();

      // Set up event listener for when the file is loaded
      reader.onload = function (e) {
        // Set the source of the image tag to the uploaded image
        uploadedImage.src = e.target.result;
      };

      // Read the file as a data URL
      reader.readAsDataURL(fileInput.files[0]);
    }
  });