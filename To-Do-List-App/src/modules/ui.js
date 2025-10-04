import {editTask,toggleTaskStatus} from './task';
import { Project } from './project';
import { saveToLocalStorage, loadFromLocalStorage } from "./storage";
import editIcon from '../assets/edit.svg';
import dltIcon from '../assets/delete.svg';
import viewIcon from '../assets/view.svg';

const addTaskDialog = document.getElementById("add-task-popup");
const taskForm=document.querySelector(".AddTask");
const taskTitle=document.querySelector("#tasktitle");
const taskDesc=document.querySelector("#taskdesc");
const taskDate=document.querySelector("#date");
const container=document.querySelector(".container");

function renderProjects(){
    const container=document.querySelector(".projects-grid");
    container.innerHTML="";
    Project.init(); 
    //displaying projects in a grid layout using for each loop
    const projects=Project.getProjects();
    projects.forEach(project => {
        const projectDiv=document.createElement("div");
        projectDiv.dataset.id=project.id;
        projectDiv.classList.add("project-card");
        projectDiv.style.backgroundColor=project.color;
    
        //add header with left right divs for title and icons
        const header=document.createElement("div");
        header.style.display = "flex";
        header.style.alignItems = "center";
        header.style.justifyContent="space-between";
        header.style.gap = "8px"
        const headerLeft=document.createElement("div");
        const headerRight=document.createElement("div");
        headerRight.style.display="flex";
        headerRight.style.gap="5px";
        

        //title goes in leftdiv
        const title=document.createElement("h1");
        title.textContent=project.title;   
        title.style.fontSize="24px";
        title.style.fontWeight="600";
        
        //icons go in rightdiv
        const editProjBtn=document.createElement("img");
        editProjBtn.src=editIcon;

        const deleteProjBtn=document.createElement("img");
        deleteProjBtn.src=dltIcon;

        //event listener for both icons
        editProjBtn.addEventListener("click",()=>{
            const editProjDialog=document.createElement("dialog");
            editProjDialog.classList.add("edit-proj-dialog");
            editProjDialog.innerHTML=
                            `<form class="EditProject">
                                <h2 class="form-heading">🖋️ Edit Project</h2>
                                <div class="form-part">
                                    <label for="projtitle">Title: </label>
                                    <input type="text" id="projtitle" name="title" placeholder="${project.title}">
                                </div>

                                <div class="form-part">  
                                    <label for="projdesc">Description: </label>
                                    <textarea type="text" id="projdesc" name="desc" rows="4" placeholder="${project.description}"></textarea>
                                </div>
                               <div>
                                    <button type="submit" id="submitBtn">Confirm</button>
                                </div>
                            </form>`;
            document.body.appendChild(editProjDialog); 
            editProjDialog.showModal();        
            
            const editProjForm = editProjDialog.querySelector(".EditProject");
            editProjForm.addEventListener("submit", (e) => {
                e.preventDefault();             
                const newTitle = editProjForm.querySelector("#projtitle").value.trim();
                const newDesc = editProjForm.querySelector("#projdesc").value.trim() ;               
                           
                Project.editProject(project.id,newTitle,newDesc);
                saveToLocalStorage(Project.getProjects());
                editProjDialog.close();
                editProjDialog.remove();
                renderProjects();
            })
            
            editProjDialog.addEventListener("close", () => editProjDialog.remove());
        })
        
        deleteProjBtn.addEventListener("click",()=>{
            const shouldDelete = confirm("Are you sure you want to delete this project?");
            if (shouldDelete) {
                const projectDiv = deleteProjBtn.closest(".project-card"); 
                if (projectDiv) {
                    Project.deleteProject(project.id);
                    saveToLocalStorage(Project.getProjects());
                    projectDiv.remove();
                }
            }
        })

        
        const description=document.createElement("p");
        description.textContent=project.description;
        description.style.textAlign="center";
        
        const tasksGrid = document.createElement('div');
        tasksGrid.classList.add('tasks-grid');
        
        
        //displaying all tasks of a project in a grid based layout using for each loop
        
        const tasks=project.tasks;
        tasks.forEach(task=>{
            const taskDiv=document.createElement("div");
            taskDiv.classList.add("task-card");
            if (task.priority==="High"){
                taskDiv.style.backgroundColor="#1e1e1e";
            }else{
                taskDiv.style.backgroundColor="grey";
                taskDiv.style.color="black";
            }
            
            //header i.e nameContainer divided into left n right divs
            const nameContainer = document.createElement("div");
            nameContainer.style.display = "flex";
            nameContainer.style.alignItems = "center";
            nameContainer.style.justifyContent="space-between";
            nameContainer.style.gap = "8px";
            
            //left div contains name + status checkbox
            const leftDiv=document.createElement("div");
            leftDiv.style.display="flex";
            leftDiv.style.alignItems="center";
            leftDiv.style.gap="5px";
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed; 
            checkbox.addEventListener("change", () => {
                toggleTaskStatus(task);
                if (task.completed){
                name.style.color="Green";
                }else {
                    name.style.color="Red";
                }   
                saveToLocalStorage(Project.getProjects());
            });
            
            const name = document.createElement("p");
            name.style.fontSize="20px";
            name.style.fontWeight="700";
            name.textContent = task.title;
            if (task.completed){
                name.style.color="Green";
            }else {
                name.style.color="Red";
            }
            
            //right div contains three icons for view edit delete
            const rightDiv=document.createElement("div");
            rightDiv.style.display="flex";
            rightDiv.style.gap="5px";
            
            const editBtn=document.createElement("img");
            editBtn.src=editIcon;
            
            const viewBtn=document.createElement("img");
            viewBtn.src=viewIcon;
            
            const deleteBtn=document.createElement("img");
            deleteBtn.src=dltIcon;
            
            //now the three event listeners for each of the three icons.
            
            editBtn.addEventListener("click",()=>{
                const editTaskDialog=document.createElement("dialog");
                editTaskDialog.classList.add("edit-task-dialog");
                editTaskDialog.innerHTML=
                `<form class="EditTask">
                <h2 class="form-heading">🖋️ Edit Task</h2>
                <div class="form-part">
                <label for="tasktitle">Title: </label>
                <input type="text" id="tasktitle" name="title" placeholder="${task.title}">
                </div>
                
                <div class="form-part">  
                <label for="taskdesc">Description: </label>
                <textarea type="text" id="taskdesc" name="desc" rows="4" placeholder="${task.description}"></textarea>
                </div>
                
                <div class="form-part">
                <label for="date">Due-Date: </label>
                <input type="date" id="date" name="dueDate" value="${task.dueDate}">
                </div>
                <div class="form-part radio">
                <p style="font-weight: 800;">Select Priority:</p>
                <div class="radio-btn">
                <input type="radio" id="High" name="priority" value="High" ${task.priority === "High" ? "checked" : ""}>
                <label for="High">High</label>
                </div>
                <div class="radio-btn">
                <input type="radio" id="Low" name="priority" value="Low" ${task.priority === "Low" ? "checked" : ""}>
                <label for="Low">Low</label>
                </div>
                </div>
                <div>
                <button type="submit" id="submitBtn">Confirm</button>
                </div>
                </form>`
                document.body.appendChild(editTaskDialog); 
                editTaskDialog.showModal();        
                
                const editForm = editTaskDialog.querySelector(".EditTask");
                editForm.addEventListener("submit", (e) => {
                    e.preventDefault();             
                    const updatedTitle = editForm.querySelector("#tasktitle").value.trim();
                    const updatedDesc = editForm.querySelector("#taskdesc").value.trim() ;
                    const updatedDate = editForm.querySelector("#date").value.trim();
                    const updatedPriority = editForm.querySelector('input[name="priority"]:checked').value ;                
                    
                    editTask(task, updatedTitle, updatedDesc, updatedDate, updatedPriority);
                    saveToLocalStorage(Project.getProjects());
                    editTaskDialog.close();
                    editTaskDialog.remove();
                    renderProjects();
                })
                
                editTaskDialog.addEventListener("close", () => editTaskDialog.remove());
            })
            viewBtn.addEventListener("click", () => {
                const viewTaskDialog = document.createElement("dialog");
                viewTaskDialog.classList.add("view-task-dialog");
                
                const title = document.createElement("h2");
                title.textContent = "📋 " + task.title;
                title.style.textAlign = "center";
                
                const description = document.createElement("p");
                description.innerHTML = `<strong>Description:</strong> ${task.description || "None"}`;
                
                const dueDate = document.createElement("p");
                dueDate.innerHTML = `<strong>Due Date:</strong> ${task.dueDate || "Not set"}`;
                
                const priority = document.createElement("p");
                priority.innerHTML = `<strong>Priority:</strong> ${task.priority || "Normal"}`;
                
                const closeButton = document.createElement("button");
                closeButton.textContent = "Close";
                closeButton.id="closeBtn"
                closeButton.addEventListener("click", () => {
                    viewTaskDialog.close();
                    viewTaskDialog.remove(); // clean up
                });
                
                viewTaskDialog.appendChild(title);
                viewTaskDialog.appendChild(description);
                viewTaskDialog.appendChild(dueDate);
                viewTaskDialog.appendChild(priority);
                viewTaskDialog.appendChild(closeButton);
                
                document.body.appendChild(viewTaskDialog);
                viewTaskDialog.showModal();
            });
            
            
            deleteBtn.addEventListener("click",()=>{
                const shouldDelete = confirm("Are you sure you want to delete this task?");
                if (shouldDelete) {
                    const taskDiv = deleteBtn.closest(".task-card"); 
                    if (taskDiv) {
                        Project.removeTaskFromProject(project.id,task.id);
                        saveToLocalStorage(Project.getProjects());
                        taskDiv.remove();
                    }
                }
            })
            
            //appending everything correctly
            leftDiv.appendChild(checkbox);
            leftDiv.appendChild(name);
            
            rightDiv.appendChild(viewBtn)
            rightDiv.appendChild(editBtn)
            rightDiv.appendChild(deleteBtn);
            
            nameContainer.appendChild(leftDiv);
            nameContainer.appendChild(rightDiv);
            
            const description=document.createElement("p");
            description.textContent="➡️ "+task.description;
            
            taskDiv.appendChild(nameContainer);
            taskDiv.appendChild(description);
            
            tasksGrid.appendChild(taskDiv);
            
        })
        
        const addTaskBtn=document.createElement("button");
        addTaskBtn.id="open-add-task-popup";
        addTaskBtn.textContent="➕ Add Task"
        addTaskBtn.addEventListener("click",(e)=>{
            const projectDiv = e.target.closest(".project-card");
            const projectId = projectDiv.dataset.id;
            addTaskDialog.showModal();
            // container.classList.add("blur");
            addTaskDialog.dataset.projectId = projectId; 
        })
        //appending everything correctly 2.0
        
        headerLeft.appendChild(title);
        headerRight.appendChild(editProjBtn)
        headerRight.appendChild(deleteProjBtn);

        header.appendChild(headerLeft);
        header.appendChild(headerRight);
        
        projectDiv.appendChild(header);
        projectDiv.appendChild(description);
        projectDiv.appendChild(tasksGrid);
        projectDiv.appendChild(addTaskBtn); 


        container.appendChild(projectDiv);

    });
} 
taskForm.addEventListener("submit",(e)=>{
    e.preventDefault(); 
    const taskPriority = document.querySelector('input[name="priority"]:checked')?.value;
    const projectId = addTaskDialog.dataset.projectId;
    if (taskTitle.value.trim() === "" ||taskDesc.value.trim() === "" ||taskDate.value.trim()===""||!taskPriority){
      alert("Please fill in all fields correctly.");
      return;
    }
    Project.addTaskToProject(projectId,taskTitle.value.trim(),taskDesc.value.trim(),taskDate.value.trim(),taskPriority);
    saveToLocalStorage(Project.getProjects());
    addTaskDialog.close();
    // container.classList.remove("blur");
    taskForm.reset();
    renderProjects();
})
// addTaskDialog.addEventListener("close", () => {
//   container.classList.remove("blur");
// });

export {renderProjects}