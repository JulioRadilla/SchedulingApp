document.addEventListener("DOMContentLoaded", function () {
    // Get the date input element
    const dateInput = document.getElementById("date");

    // Add an event listener to the form to handle date formatting before submission
    document
      .querySelector("#createTaskForm")
      .addEventListener("submit", function (event) {
        // Prevent the default form submission
        event.preventDefault();

        // Get the selected date value
        const selectedDate = dateInput.value;

        // Convert the date to ISO 8601 format
        const isoFormattedDate = new Date(selectedDate)
          .toISOString()
          .split("T")[0];

        // Update the date input value with the formatted date
        dateInput.value = isoFormattedDate;

        // Now, you can proceed with the form submission
        this.submit();
      });
  });