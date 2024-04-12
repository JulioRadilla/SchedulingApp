      // Initialize with the current date
      let currentDate = new Date();
      //MM/DD/YYYY
      let formattedDate = currentDate
        .toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
        .split("/")
        .join("/");

      updateTasks();

      // Function to display the current date in the format --/--/--
      function displayDate() {
        document.getElementById("dateDisplay").innerHTML = formattedDate;
      }

      function displayDay() {
        const day = currentDate.toLocaleDateString("en-US", {
          weekday: "long",
        });
        document.getElementById("displayDay").innerHTML = day;
      }

      // Function to go back one day
      function goBack() {
        currentDate.setDate(currentDate.getDate() - 1);
        formattedDate = currentDate
          .toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })
          .split("/")
          .join("/");
        displayDate();
        displayDay();
        // Call a function to update the tasks based on the new formattedDate
        updateTasks();
      }

      // Function to go forward one day
      function goForward() {
        currentDate.setDate(currentDate.getDate() + 1);
        formattedDate = currentDate
          .toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          })
          .split("/")
          .join("/");
        displayDate();
        displayDay();
        // Call a function to update the tasks based on the new formattedDate
        updateTasks();
      }

      async function fetchTasksByDate(date) {
        const response = await fetch(`/fetch-tasks?date=${date}`);
        const data = await response.json();
        return data.tasks;
      }

      // Function to update tasks based on the selected date
      async function updateTasks() {
        try {
          const tasks = await fetchTasksByDate(formattedDate);

          const containerMovements = document.querySelector(".movements");
          containerMovements.innerHTML = ''

          displayDay();

          if (tasks.length > 0) {
            // Sort tasks chronologically by their scheduled time
            // The compareTasksByTime function is used as a callback to determine the order.
            // This ensures tasks are displayed in ascending order of time, from earliest to latest.
            const sortedTasks = tasks.sort(compareTasksByTime);

            // Iterate through sorted tasks and display them on the day the user logs in 
            sortedTasks.forEach((task) => {
              const html = `
              <div id="${task._id}" class="movements__row">
                <div class="info ">
                  <div class="task"><span class='bold'>Task: </span>${task.taskTitle}</div>
                  <div class="time"><span class='bold'>Start Time: </span>${task.time}</div>
                  <button class="details">view details</button>
                  <button class="done">not done</button>
                  <button class="delete" onclick="deleteTask('${task._id}')">delete</button>   
                </div>
                <div class="content hiddenC">
                  <h2 class="description">Description:</h2>
                  <p class="p-content">
                   ${task.description}
                  </p>
                </div>              
                </div>
              `
              containerMovements.insertAdjacentHTML('afterbegin', html);
              containerMovements.classList.remove('hidden-movements');
              const details = document.querySelector(".details");
              const content = document.querySelector(".content");
              const notD = document.querySelector('.done');
              const moveR = document.querySelector('.movements__row');

              const show_content = function (e) {
                e.preventDefault();
                const on = content.classList.toggle("hiddenC");
              };
              const color = function(e){
                e.preventDefault()
                const add = moveR.classList.toggle('highlight')
              }

              notD.addEventListener('click', color)

              details.addEventListener("click", show_content);

            });
          } else {
            const noTasksMessage = document.createElement("p");
            noTasksMessage.innerHTML = "No tasks for this date! Use 'Create Task' to plan something or enjoy a free day. 🌟";
            containerMovements.appendChild(noTasksMessage); 
            noTasksMessage.classList.add('no-task') 
            containerMovements.classList.add('hidden-movements') 
          }
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      }

      //This function takes two tasks and compares their times using the parseTime function.
      function compareTasksByTime(task1, task2) {
        const time1 = parseTime(task1.time);
        const time2 = parseTime(task2.time);
        //Calculates the time difference in minutes negative result indicates task1 is earlier,
        //positive means task1 is later, and zero means they occur at the same time.
        return time1 + time2;
      }

      //This function takes a time string in the format "HH:mm AM/PM" and
      //converts it into minutes since midnight.
      function parseTime(timeString) {
        const [time, period] = timeString.split(" ");
        const [hours, minutes] = time.split(":");
        //Makes it to military time to compare
        let parsedHours = parseInt(hours, 10);
        if (period === "PM" && parsedHours !== 12) {
          parsedHours += 12;
        } else if (period === "AM" && parsedHours === 12) {
          parsedHours = 0;
        }

        return parsedHours * 60 + parseInt(minutes, 10);
      }
      async function deleteTask(taskId) {
        try {

          const response = await fetch('/delete-task', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskId: taskId }),
          });

          if (response.ok) {
            
            // Refresh the page with the current date as a query parameter
            updateTasks()

          } else {
            console.error('Failed to delete task');
          }
        } catch (error) {
          console.error('Error deleting task:', error);
        }
      }