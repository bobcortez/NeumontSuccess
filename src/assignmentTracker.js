const contents = `
  <h2>Assignment Tracker</h2>
  <div class="btn" id="displayAssignmentsBtn">Display Assignments</div>   
  <div id="displayAssignments"></div>

  <div class="btn" id="addNewAssignment">Add New Assignment</div>   
  <form id="addAssignmentForm">
    <label class="assingmentLables">Assingment Name: <input type="text" id="name"></label>
    <br>
    <label class="assingmentLables">Assingment Desc.: <input type="text" id="desc"></label>
    <br>
    <label class="assingmentLables">Due Date: <input type="date" id="date"></label>
    <br>
    <label class="assingmentLables">Requirements: 
      <div id="reqHolder">
        <input type="text" class="reqs">
      </div>
    </label>
    <div class="btn" id="addReq">+ Add Req.</div>   
    <br>
    <div class="btn" id="addAssignment">Add Assignment</div>   
  </form>
`;

class Assignement {
  constructor(name, desc, dueDate, requirements) {
    this.name = name;
    this.desc = desc;
    this.dueDate = dueDate;
    this.requirements = requirements;
  }
}

let assignments = [];

export const setup = div_container => {
  div_container.innerHTML = contents;
  document.getElementById("addReq").addEventListener("click", addMoreReqs);
  document.getElementById("addAssignment").addEventListener("click", addAssignment);
  document.getElementById("displayAssignmentsBtn").addEventListener("click", displayAssignments);
  document.getElementById("addNewAssignment").addEventListener("click", displayAddAssignment);
}

const addMoreReqs = () => {
  let reqHolder = document.getElementById("reqHolder");

  let reqInput = document.createElement("input");
  reqInput.type = "text";
  reqInput.setAttribute("class", "reqs");
  reqHolder.appendChild(reqInput);
}

const addAssignment = () => {
  let name = document.getElementById("name").value;
  let desc = document.getElementById("desc").value;
  let date = document.getElementById("date").value;
  let reqs = document.getElementsByClassName("reqs");

  let requirements = [];
  for (let x = 0; x < reqs.length; x++) {
    requirements.push(reqs[x].value);
  }

  let assignment = new Assignement(name, desc, date, requirements);

  let ifAssignmentExists = false;
  for (let x = 0; x < assignments.length; x++) {
    if (assignments[x].name == assignment.name) {
      assignments[x] = assignment;
      ifAssignmentExists = true;
    }
  }

  if (!ifAssignmentExists) {
    assignments.push(assignment);
  }

  clearForm();
  updateAssignments();
}

let displayBool = true;
const displayAssignments = () => {
  let displayAll = document.getElementById("displayAssignments");

  switch (displayBool) {
    case false:
      displayAll.style.display = "block";
      displayBool = true;
      break;
    case true:
      displayAll.style.display = "none";
      displayBool = false;
      break;
  }

  updateAssignments();
}

let addBool = false;
const displayAddAssignment = () => {
  let displayAdd = document.getElementById("addAssignmentForm");

  switch (addBool) {
    case false:
      displayAdd.style.display = "block";
      addBool = true;
      break;
    case true:
      displayAdd.style.display = "none";
      addBool = false;
      clearForm();
      break;
  }
}

const clearForm = () => {
  let name = document.getElementById("name");
  let desc = document.getElementById("desc");
  let date = document.getElementById("date");
  let req = document.getElementById("reqHolder");

  name.value = "";
  desc.value = "";
  date.value = "";

  while (req.firstChild) {
    req.removeChild(req.firstChild);
  }

  req.innerHTML = '<input type="text" class="reqs">';
}

const updateAssignments = () => {
  let allAssignments = document.getElementById("displayAssignments");
  allAssignments.innerHTML = "";

  for (let x = 0; x < assignments.length; x++) {
    let assignmentHolder = document.createElement("div");
    assignmentHolder.setAttribute("class", "itemBox");

    //Assignment Header
    let assignmentHeader = document.createElement("div");
    assignmentHeader.setAttribute("class", "assignmentHeader");

    let showDetails = document.createElement("div");
    showDetails.innerHTML = "Details &#10136;"
    showDetails.id = x;
    showDetails.setAttribute("class", "btn");
    showDetails.setAttribute("class", "deatsBtn");
    showDetails.addEventListener("click", displayAssignmentDetails);
    
    let assignmentName = document.createElement("h4");
    assignmentName.innerHTML = assignments[x].name;

    let assignmentDue = document.createElement("p");
    assignmentDue.innerHTML = assignments[x].dueDate;

    assignmentHeader.appendChild(assignmentName);
    assignmentHeader.appendChild(assignmentDue);
    assignmentHeader.appendChild(showDetails);
    //

    //Assignment Details
    let assignmentDetails = document.createElement("div");
    assignmentDetails.setAttribute("class", "assignmentDetails");

    let assignmentDesc = document.createElement("div");
    assignmentDesc.innerHTML = assignments[x].desc;

    let assignmentReqs = document.createElement("div");
    assignmentReqs.setAttribute("class", "assignmentReqs");

    for (let y = 0; y < assignments[x].requirements.length; y++) {
      let req = document.createElement("p");
      req.innerHTML = assignments[x].requirements[y];
      assignmentReqs.appendChild(req);
    }
    
    assignmentDetails.appendChild(assignmentDesc);
    assignmentDetails.appendChild(assignmentReqs);

    assignmentHeader.appendChild(assignmentDetails);
    //

    //Btns
    let btnHolder = document.createElement("div");
    btnHolder.setAttribute("class", "btnHolder");

    let editAssignment = document.createElement("div");
    editAssignment.innerHTML = "Edit";
    editAssignment.id = x;
    editAssignment.setAttribute("class", "btn");
    editAssignment.addEventListener("click", editSelectedAssignment);

    let deleteAssignment = document.createElement("div");
    deleteAssignment.innerHTML = "Delete";
    deleteAssignment.id = x;
    deleteAssignment.setAttribute("class", "btn");
    deleteAssignment.addEventListener("click", deleteSelectedAssignment);

    btnHolder.appendChild(editAssignment);
    btnHolder.appendChild(deleteAssignment);
    //

    assignmentHolder.appendChild(assignmentHeader);
    assignmentHolder.appendChild(btnHolder);

    allAssignments.appendChild(assignmentHolder);
  }
}

const editSelectedAssignment = evt => {
  clearForm();

  let name = document.getElementById("name");
  let desc = document.getElementById("desc");
  let date = document.getElementById("date");
  let reqHolder = document.getElementById("reqHolder");

  let edditedAssignment = assignments[evt.target.id];
  document.getElementById("addAssignmentForm").style.display = "block";
  addBool = true;

  name.value = edditedAssignment.name;
  desc.value = edditedAssignment.desc;
  date.value = edditedAssignment.dueDate;

  for (let x = 1; x < edditedAssignment.requirements.length; x++) {
    let reqInput = document.createElement("input");
    reqInput.type = "text";
    reqInput.setAttribute("class", "reqs");
    reqHolder.appendChild(reqInput);
  }

  let reqs = document.getElementsByClassName("reqs");
  for (let x = 0; x < reqs.length; x++) {
    reqs[x].value = edditedAssignment.requirements[x];
  }
}

const deleteSelectedAssignment = evt => {
  let index = assignments[evt.target.id];
  let removeIndex = assignments.indexOf(index);

  if (removeIndex > -1) {
    assignments.splice(removeIndex, 1);
  }

  updateAssignments();
}

let detailBool = false;
const displayAssignmentDetails = evt => {
  let details = document.getElementsByClassName("assignmentDetails");
  let selected = details[evt.target.id];

  switch (detailBool) {
    case false:
      selected.style.display = "block";
      detailBool = true;
      break;
    case true:
      selected.style.display = "none";
      detailBool = false;
      break;
  }
}

export const buildTrackerHtml = () => {
  let node = document.createElement("div");
  node.id = "assignTracker";
  node.innerHTML = contents;
  return node;
}