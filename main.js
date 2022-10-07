const addBox = document.querySelector(".add-box");
const popup = document.querySelector(".popup-box");
const popupTitle = popup.querySelector("header p");
const titleNote = popup.querySelector("input");
const descriptionNote = popup.querySelector("textarea");
const closeIcon = popup.querySelector("header iconify-icon");

const addNote = popup.querySelector("button");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false,
  updateId;

function showNotes() {
  document.querySelectorAll(".note").forEach((note) => note.remove());
  notes.forEach((note, index) => {
    let liTag = `<li class="note">
                  <div class="details">
                    <p>${note.titleNote}</p>
                    <span>${note.descriptionNote}</span>
                  </div>
                  <div class="bottom-content">
                    <span>${note.date}</span>
                    <div class="settings">
                      <i onclick="showMenu(this)" class="ellipses">&ctdot;</i>
                      <ul class="menu">
                        <li onclick="editNote(${index}, '${note.titleNote}', '${note.descriptionNote}')"><i class="gg-pen"></i>Edit</li>
                        <li onclick="deleteNote(${index})"><i class="gg-trash"></i>Delete</li>
                      </ul>
                    </div>
                  </div>
                </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}

showNotes();

function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName !== "I" || e.target !== elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}

function deleteNote(noteId) {
  let confirmDelete = confirm("Are you sure you want tot delete this note?");
  if (!confirmDelete) return;
  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function editNote(noteId, title, description) {
  isUpdate - true;
  updateId = noteId;
  addBox.click();
  titleNote.value = title;
  descriptionNote.value = description;
  addNote.innerText = "Update Note";
  popupTitle.innerText = "Update a Note";
}

addBox.addEventListener("click", () => {
  titleNote.focus();
  popup.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleNote.value = "";
  descriptionNote.value = "";
  addNote.innerText = "Add Note";
  popupTitle.innerText = "Add a Note";
  popup.classList.remove("show");
});

addNote.addEventListener("click", (e) => {
  e.preventDefault();
  let noteTitle = titleNote.value;
  let noteDescription = descriptionNote.value;

  if (noteTitle || noteDescription) {
    let fullDate = new Date();
    let month = months[fullDate.getMonth()];
    let day = fullDate.getDate();
    let year = fullDate.getFullYear();

    let noteInfo = {
      titleNote: noteTitle,
      descriptionNote: noteDescription,
      date: `${month} ${day} ${year}`,
    };
    if (isUpdate) {
      notes.push(noteInfo);
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo;
    }

    localStorage.setItem("notes", JSON.stringify(notes));
    closeIcon.click();
    showNotes();
  }
});
