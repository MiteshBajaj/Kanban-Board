const lanes = document.querySelectorAll('.swim-lane');

    function makeDraggable(task) {
      task.setAttribute('draggable', 'true');

      task.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', task.outerHTML);
        e.dataTransfer.effectAllowed = 'move';
        task.classList.add('dragging');
      });

      task.addEventListener('dragend', () => {
        task.classList.remove('dragging');
      });
    }

    lanes.forEach(lane => {
      const addBtn = lane.querySelector('.add-task');
      const inputContainer = lane.querySelector('.input-container');
      const inputField = inputContainer.querySelector('input');
      const taskBox = lane.querySelector('.tasks');

      addBtn.addEventListener('click', () => {
        inputContainer.style.display = inputContainer.style.display === 'block' ? 'none' : 'block';
        inputField.focus();
      });

      inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && inputField.value.trim() !== '') {
          const newTask = document.createElement('div');
          newTask.className = 'task';
          newTask.textContent = inputField.value;
          makeDraggable(newTask);
          taskBox.appendChild(newTask);
          inputField.value = '';
          inputContainer.style.display = 'none';
        }
      });

      lane.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      });

      lane.addEventListener('drop', (e) => {
        e.preventDefault();
        const taskHTML = e.dataTransfer.getData('text/plain');
        const dropZone = lane.querySelector('.tasks');
        const temp = document.createElement('div');
        temp.innerHTML = taskHTML;
        const droppedTask = temp.firstChild;
        makeDraggable(droppedTask);
        dropZone.appendChild(droppedTask);

        // Remove the original dragged task
        document.querySelectorAll('.dragging').forEach(el => el.remove());
      });
    });

    // Settings dropdown
    const settingsBtn = document.getElementById('settingsBtn');
    const dropdown = document.getElementById('dropdownMenu');

    settingsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!settingsBtn.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });

    // 🧠 Login logic
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email && password) {
    alert(`Welcome, ${email.split('@')[0]}!`);
    closeLogin();
  } else {
    alert("Please enter both email and password.");
  }
}

function closeLogin() {
  document.getElementById("loginModal").style.display = "none";
}

// Show login modal when "Login" button is clicked in dropdown
document.getElementById("loginBtn").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("loginModal").style.display = "flex";
});


function makeDraggable(task) {
  task.setAttribute("draggable", "true");

  // Create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "🗑️";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = () => task.remove();

  // Add text and delete button in task
  const textSpan = document.createElement("span");
  textSpan.textContent = task.textContent;
  task.textContent = ""; // clear current text
  task.appendChild(textSpan);
  task.appendChild(deleteBtn);

  // Drag events
  task.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", task.outerHTML);
    e.dataTransfer.effectAllowed = "move";
    task.classList.add("dragging");
  });

  task.addEventListener("dragend", () => {
    task.classList.remove("dragging");
  });
}

    



