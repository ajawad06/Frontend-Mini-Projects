import './style.css';
import { renderProjects } from './modules/ui';
import { Project } from './modules/project';
import { saveToLocalStorage, loadFromLocalStorage } from "./modules/storage";

//===== Ui ====
//black tasks for high priority
//grey tasks for low priority
//green title of completed tasks
//red title of incomplete tasks

const container=document.querySelector(".container");
Project.init();

//load all projects from storage
const projects =Project.getProjects();
//default cards 
// If nothing is stored yet, create default projects
if (!projects || projects.length === 0) {
const Project1 = Project.createProject("Back to University","All essential things that are required to be completed before university starts...");
const p1task1=Project.addTaskToProject(Project1.id,"Social Life","Research societies, events, seminars and exchange programs going on.","2025-08-24","High");
const p1task2=Project.addTaskToProject(Project1.id,"Uni Essentials","Buy new bag and two registers.","2025-09-08","Low");

const Project2= Project.createProject("Web Development","All remaining courses on web dev...","2025-09-30","High");
const p2task1=Project.addTaskToProject(Project2.id,"React.JS","Complete the course on reactjs.","2025-08-24","High");
const p2task2=Project.addTaskToProject(Project2.id,"Node.JS+Express.JS","Understanding APIs and backend tech.","2025-09-08","Low");
const p2task3=Project.addTaskToProject(Project2.id,"Database Connection","Learn sql and non sql database and their .","2025-10-01","Low");

const Project3=Project.createProject("Gym","Gym schedule for next two months...");
const p3task1=Project.addTaskToProject(Project3.id,"Chest+Triceps","Flat-Benchpress, Incline-Benchpress, Pec-Dec-Fly, Cable-Crossovers --- Tricep-Pushdown, SkullCrushers, Overhead-Extension","2025-10-01","High");
const p3task2=Project.addTaskToProject(Project3.id,"Back+Biceps","Lat-Pulldowns, Seated-Rows, Barbell-Rows, Deadlifts --- Barbell-Curl, Hammer-Curl,Preacher-Curl, Dumbel-Curl","2025-10-01","High");
const p3task3=Project.addTaskToProject(Project3.id,"Legs+Shoulders","Squats, Leg-Extensions, Leg-Curls, Calf-Raises, Lunges --- Lateral-Raises, Shoulder-Press, Reverse-Pec-Fly","2025-10-01","High");

const Project4=Project.createProject("Random","Testing if grid layout breaks or not...");
saveToLocalStorage(Project.getProjects());
}


const addProjectBtn=document.querySelector("#open-add-project-popup");
const addProjectDialog=document.querySelector("#add-project-popup");
const projectForm=document.querySelector(".AddProject");
const projTitle=document.querySelector("#projtitle");
const projDesc=document.querySelector("#projdesc");
addProjectBtn.addEventListener("click", () => {
  addProjectDialog.showModal();
  // container.classList.add("blur");
});

projectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (projTitle.value.trim() === "" || projDesc.value.trim() === "") {
    alert("Please fill in all fields correctly.");
    return;
  }

  Project.createProject(projTitle.value.trim(), projDesc.value.trim());
  addProjectDialog.close(); // this triggers the 'close' event
  projectForm.reset();
  saveToLocalStorage(Project.getProjects());
  renderProjects();
});

// addProjectDialog.addEventListener("close", () => {
//   container.classList.remove("blur");
// });

renderProjects();
