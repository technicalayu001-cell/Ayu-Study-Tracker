/* =========================================
   AYU STUDY TRACKER
   Built by Technical Ayu
========================================= */


/* SUBJECT DATA */

const subjects = {

  "📘 Mathematics": [

    "Number Systems",
    "Polynomials",
    "Coordinate Geometry",
    "Linear Equations in Two Variables",
    "Introduction to Euclid's Geometry",
    "Lines and Angles",
    "Triangles",
    "Quadrilaterals",
    "Circles",
    "Heron's Formula",
    "Surface Areas and Volumes",
    "Statistics",
    "Probability"

  ],


  "🔬 Science": [

    "Matter in Our Surroundings",
    "Is Matter Around Us Pure",
    "Atoms and Molecules",
    "Structure of the Atom",
    "The Fundamental Unit of Life",
    "Tissues",
    "Motion",
    "Force and Laws of Motion",
    "Gravitation",
    "Work and Energy",
    "Sound",
    "Improvement in Food Resources"

  ],


  "🌍 Social Science": [

    "India and the Contemporary World",
    "Physical Features of India",
    "Drainage",
    "Climate",
    "Natural Vegetation and Wildlife",
    "Population",
    "Democracy",
    "Constitutional Design",
    "Electoral Politics",
    "Working of Institutions",
    "Democratic Rights",
    "People as Resource",
    "Poverty as a Challenge",
    "Food Security in India"

  ],


  "📖 English": [

    "Reading Skills",
    "Writing Skills",
    "Grammar",
    "Literature",
    "Vocabulary"

  ],

  "📝 Hindi": [

    "अपठित बोध",
    "व्याकरण",
    "लेखन",
    "क्षितिज",
    "कृतिका"

  ]

};


/* GET SAVED DATA */

let data = JSON.parse(
  localStorage.getItem("ayuStudyData")
) || {

  name: "",

  className: "Class 9",

  target: 120,

  studyToday: 0,

  completed: {}

};


/* SAVE DATA */

function saveData() {

  localStorage.setItem(
    "ayuStudyData",
    JSON.stringify(data)
  );

}


/* STUDENT DETAILS */

const studentName =
  document.getElementById("studentName");

const studentClass =
  document.getElementById("studentClass");

const dailyTarget =
  document.getElementById("dailyTarget");


studentName.value = data.name;

studentClass.value = data.className;

dailyTarget.value = data.target;


/* SAVE DETAILS */

document
  .getElementById("saveDetails")
  .addEventListener("click", function () {

    data.name = studentName.value.trim();

    data.className =
      studentClass.value;

    data.target =
      Number(dailyTarget.value) || 0;

    saveData();

    updateDashboard();

    alert("✅ Details saved successfully!");

  });


/* RENDER SUBJECTS */

function renderSubjects() {

  const container =
    document.getElementById("subjects");

  container.innerHTML = "";


  let chapterNumber = 0;


  for (const subject in subjects) {

    const subjectBox =
      document.createElement("div");

    subjectBox.className = "subject";


    const header =
      document.createElement("div");

    header.className =
      "subject-header";


    header.innerHTML = `
      <h3>${subject}</h3>
      <span>${subjects[subject].length} Chapters</span>
    `;


    subjectBox.appendChild(header);


    subjects[subject].forEach(
      (chapter, index) => {

        chapterNumber++;


        const row =
          document.createElement("label");

        row.className = "chapter";


        const checkbox =
          document.createElement("input");

        checkbox.type = "checkbox";


        const key =
          subject + "_" + index;


        checkbox.checked =
          !!data.completed[key];


        if (checkbox.checked) {

          row.classList.add(
            "completed"
          );

        }


        checkbox.addEventListener(
          "change",
          function () {

            data.completed[key] =
              checkbox.checked;


            if (checkbox.checked) {

              row.classList.add(
                "completed"
              );

            } else {

              row.classList.remove(
                "completed"
              );

            }


            saveData();

            updateDashboard();

          }
        );


        const number =
          document.createElement("span");

        number.className =
          "chapter-number";

        number.textContent =
          chapterNumber + ".";


        const title =
          document.createElement("span");

        title.textContent =
          chapter;


        row.appendChild(checkbox);

        row.appendChild(number);

        row.appendChild(title);


        subjectBox.appendChild(row);

      }
    );


    container.appendChild(subjectBox);

  }

}


/* CALCULATE PROGRESS */

function getProgress() {

  let total = 0;

  let completed = 0;


  for (const subject in subjects) {

    total +=
      subjects[subject].length;


    subjects[subject].forEach(
      (chapter, index) => {

        const key =
          subject + "_" + index;


        if (data.completed[key]) {

          completed++;

        }

      }
    );

  }


  return {
    total,
    completed,
    percentage:
      total === 0
        ? 0
        : Math.round(
            completed / total * 100
          )
  };

}


/* UPDATE DASHBOARD */

function updateDashboard() {

  const progress =
    getProgress();


  document.getElementById(
    "totalChapters"
  ).textContent =
    progress.total;


  document.getElementById(
    "completedChapters"
  ).textContent =
    progress.completed;


  document.getElementById(
    "progressPercent"
  ).textContent =
    progress.percentage + "%";


  document.getElementById(
    "progressText"
  ).textContent =
    progress.percentage + "%";


  document.getElementById(
    "progressBar"
  ).style.width =
    progress.percentage + "%";


  document.getElementById(
    "targetDisplay"
  ).textContent =
    data.target + " minutes";


  document.getElementById(
    "studyToday"
  ).textContent =
    data.studyToday + " minutes";

}


/* ADD STUDY TIME */

document
  .getElementById("addStudy")
  .addEventListener("click", function () {

    const input =
      document.getElementById(
        "studyMinutes"
      );


    const minutes =
      Number(input.value);


    if (!minutes || minutes <= 0) {

      alert(
        "Please enter valid study time."
      );

      return;

    }


    data.studyToday += minutes;


    saveData();

    updateDashboard();


    input.value = "";


    alert(
      "🎯 Study time added!"
    );

  });


/* DARK / LIGHT MODE */

const themeBtn =
  document.getElementById(
    "themeBtn"
  );


let lightMode =
  localStorage.getItem(
    "ayuLightMode"
  ) === "true";


function updateTheme() {

  if (lightMode) {

    document.body.classList.add(
      "light"
    );

    themeBtn.textContent =
      "🌙 Dark";

  } else {

    document.body.classList.remove(
      "light"
    );

    themeBtn.textContent =
      "☀️ Light";

  }

}


themeBtn.addEventListener(
  "click",
  function () {

    lightMode = !lightMode;

    localStorage.setItem(
      "ayuLightMode",
      lightMode
    );

    updateTheme();

  }
);


/* RESET DATA */

document
  .getElementById("resetBtn")
  .addEventListener("click", function () {

    const confirmReset =
      confirm(
        "⚠️ Kya aap sach me saara study data delete karna chahte hain?"
      );


    if (!confirmReset) {

      return;

    }


    localStorage.removeItem(
      "ayuStudyData"
    );


    location.reload();

  });


/* INITIAL LOAD */

renderSubjects();

updateDashboard();

updateTheme();
