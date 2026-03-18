document.addEventListener("DOMContentLoaded", function () {
  const currentUserRaw = localStorage.getItem("focusOnTodayCurrentUser");
  if (!currentUserRaw) {
    window.location.href = "signin.html";
    return;
  }

  let currentUser;
  try {
    currentUser = JSON.parse(currentUserRaw);
  } catch (error) {
    localStorage.removeItem("focusOnTodayCurrentUser");
    window.location.href = "signin.html";
    return;
  }

  const welcomeText = document.getElementById("welcomeText");
  const sessionText = document.getElementById("sessionText");

  function formatDateTime(value) {
    if (!value) return "-";
    return new Date(value).toLocaleString();
  }

  if (welcomeText) {
    const displayName = currentUser.name || "User";
    welcomeText.textContent = "Welcome, " + displayName;
  }

  if (sessionText) {
    const loggedInAt = currentUser.loggedInAt
      ? "Session started: " + formatDateTime(currentUser.loggedInAt)
      : "Session started: Now";
    const lastLogin = currentUser.lastLoginAt
      ? "Last login: " + formatDateTime(currentUser.lastLoginAt)
      : "Last login: First login";
    sessionText.textContent = loggedInAt + " | " + lastLogin;
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("focusOnTodayCurrentUser");
      window.location.href = "signin.html";
    });
  }

  //Accessing the DOM elements for the goals and checkboxes
  const goalOne = document.querySelector(".goal-one");
  const goalTwo = document.querySelector(".goal-two");
  const goalThree = document.querySelector(".goal-three");
  const completedTasks = [];

  // Function to update the UI based on the checkbox status
  function updateTheUI(textInput, status) {
    const progressBar = document.querySelector(".progress-value");
    const totalTasks = 3;
    const completedCount = completedTasks.length;
    const progressPercent = (completedCount / totalTasks) * 100;
    progressBar.style.width = progressPercent + "%";
    if (status === "checked") {
      textInput.style.textDecoration = "line-through";
    } else {
      textInput.style.textDecoration = "none";
    }
  }
  // Adding event listeners to the checkboxes to handle changes
  goalOne
    .querySelector('input[type="checkbox"]')
    .addEventListener("change", function () {
      const textInput = goalOne.querySelector('input[type="text"]');

      if (textInput.value.trim() === "") {
        alert("Please enter a goal before checking the box.");
        this.checked = false;
      } else {
        if (this.checked) {
          completedTasks.push(0);
          updateTheUI(textInput, "checked");
        } else {
          completedTasks.splice(0, 1);
          updateTheUI(textInput, "unchecked");
        }
        console.log(
          "Goal One -",
          this.checked ? "Checked" : "Unchecked",
          ":",
          textInput.value,
        );
      }
    });

  goalTwo
    .querySelector('input[type="checkbox"]')
    .addEventListener("change", function () {
      const textInput = goalTwo.querySelector('input[type="text"]');

      if (textInput.value.trim() === "") {
        alert("Please enter a goal before checking the box.");
        this.checked = false;
      } else {
        if (this.checked) {
          completedTasks.push(1);
          updateTheUI(textInput, "checked");
        } else {
          completedTasks.splice(1, 1);
          updateTheUI(textInput, "unchecked");
        }
        console.log(
          "Goal Two -",
          this.checked ? "Checked" : "Unchecked",
          ":",
          textInput.value,
        );
      }
    });

  goalThree
    .querySelector('input[type="checkbox"]')
    .addEventListener("change", function () {
      const textInput = goalThree.querySelector('input[type="text"]');

      if (textInput.value.trim() === "") {
        alert("Please enter a goal before checking the box.");
        this.checked = false;
      } else {
        if (this.checked) {
          completedTasks.push(2);
          updateTheUI(textInput, "checked");
        } else {
          completedTasks.splice(2, 1);
          updateTheUI(textInput, "unchecked");
        }
        console.log(
          "Goal Three -",
          this.checked ? "Checked" : "Unchecked",
          ":",
          textInput.value,
        );
      }
    });

  //Handling the edge case
  goalOne
    .querySelector('input[type="text"]')
    .addEventListener("input", function () {
      const checkbox = goalOne.querySelector('input[type="checkbox"]');

      if (checkbox.checked) {
        checkbox.checked = false;
        completedTasks.splice(0, 1);
        updateTheUI(this, "unchecked");
      }
    });
  goalTwo
    .querySelector('input[type="text"]')
    .addEventListener("input", function () {
      const checkbox = goalTwo.querySelector('input[type="checkbox"]');

      if (checkbox.checked) {
        checkbox.checked = false;
        completedTasks.splice(1, 1);
        updateTheUI(this, "unchecked");
      }
    });
  goalThree
    .querySelector('input[type="text"]')
    .addEventListener("input", function () {
      const checkbox = goalThree.querySelector('input[type="checkbox"]');

      if (checkbox.checked) {
        checkbox.checked = false;
        completedTasks.splice(2, 1);
        updateTheUI(this, "unchecked");
      }
    });
});
