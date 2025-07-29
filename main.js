function addSubject() {
  const subject = document.getElementById("subject-name").value.trim();
  const passing_marks = document.getElementById("passing-marks").value.trim();

  if (!subject || !passing_marks) {
    alert("Enter valid data");
    return;
  }

  const row = document.createElement("tr");

  const table_subject = document.createElement("td");
  table_subject.innerText = subject;

  const table_marks = document.createElement("td");
  table_marks.innerText = passing_marks;

  const status = document.createElement("td");
  const status_data = document.createElement("span");
  status.append(status_data);
  status_data.innerText = "";

  const table_obtained = document.createElement("td");
  const inp_obtained = document.createElement("input");
  inp_obtained.type = "number";
  inp_obtained.placeholder = "Enter Marks";
  inp_obtained.addEventListener("input", () => {
    updateStatus(inp_obtained, passing_marks, row, status_data);
    footerTotal();
  });
  table_obtained.appendChild(inp_obtained);

  const table_dt = document.createElement("td");
  const delete_button = document.createElement("span");
  delete_button.innerText = "Delete";
  delete_button.className = "delete";
  delete_button.addEventListener("click", () => {
    row.remove();
    footerTotal();
  });
  table_dt.append(delete_button);

  row.append(table_subject);
  row.append(table_marks);
  row.append(table_obtained);
  row.append(status);
  row.append(table_dt);

  document.getElementById("tbl-body").appendChild(row);

  document.getElementById("subject-name").value = "";
  document.getElementById("passing-marks").value = "";

  function updateStatus(input, passingMarks, row, status) {
    const value = parseInt(input.value);

    if (value >= passingMarks) {
      status.innerText = "Pass";
      status.className = "pass";
      row.className = "success";
    } else {
      status.innerText = "Fail";
      status.className = "fail";
      row.className = "failed";
    }
  }

  function footerTotal() {
    const rows = document.querySelectorAll("#tbl-body tr");
    // console.log("foot");
    let totalSubjects = 0;
    let totalPassingMarks = 0;
    let totalObtainedMarks = 0;
    let totalStatus = true;
    rows.forEach((row) => {
      const passing = parseInt(row.children[1].innerText);
      console.log("row", row.children);
      const input = row.querySelector("input");
      const obtained_total = parseInt(input?.value);
      const statusValue = row.children[3].children[0].innerText;
      totalSubjects++;
      totalPassingMarks += isNaN(passing) ? 0 : passing;
      totalObtainedMarks += isNaN(obtained_total) ? 0 : obtained_total;
      if (statusValue === "Fail") {
        totalStatus = false;
      }
    });

    document.getElementById("total-subject").innerText = totalSubjects;
    document.getElementById("total-passing").innerText = totalPassingMarks;
    document.getElementById("total-obtained").innerText = totalObtainedMarks;
    document.getElementById("total-status").innerText = totalStatus
      ? "Pass"
      : "Fail";
  }
}
