import {createTask} from './task';
import { loadFromLocalStorage } from './storage';

const Project=(function(){
    let projects = [];

    const darkTones = [
        "#4B1C2F", // Dark Maroon
        "#1C1C3C", // Navyish Blue
        "#3C2F1C", // Dark Olive
        "#2C1F3B", // Deep Purple
        "#3B1F1F", // Dark Brownish Red
        "#1C2B3C", // Slate Blue
        "#2B1C3C", // Plum
        "#2F3C1C", // Deep Green
        "#3C1C2F", // Dark Berry
    ];

    function init() {
        const loaded = loadFromLocalStorage();
        if (loaded.length > 0) {
            projects = loaded;
        }
    }
    function createProject(title,description){
        const id=crypto.randomUUID();
        const tasks=[];
        const color = darkTones[Math.floor(Math.random() * darkTones.length)];
        projects.push({id,title,description,tasks,color});
        return {id,title,description,tasks,color};
    }

    function deleteProject(id){
        projects=projects.filter((project)=>project.id!==id);
    }

    function editProject(id, newTitle, newDescription) {
      const project = projects.find(p => p.id === id);
      if (project) {
        if (newTitle !== undefined && newTitle.trim() !== '') {
          project.title = newTitle;
        }
        if (newDescription !== undefined && newDescription.trim() !== '') {
          project.description = newDescription;
        }
      }
    }

    function getProjects(){
        return projects;
    }

    function getProjectByID(pid){
        const project=projects.find(p => p.id === pid);
        return project;
    }


    function addTaskToProject(pid,title, description, dueDate, priority){
        const project = projects.find(p => p.id === pid);
        if (project){
            const task=createTask(title,description,dueDate,priority)
            project.tasks.push(task);
        }
    }

    function removeTaskFromProject(pid,tid){
        const project = projects.find(p => p.id === pid);
        if (project){
            project.tasks=project.tasks.filter((task)=>task.id!==tid);
        }
    }

    return {init,createProject,deleteProject,editProject,getProjects,getProjectByID,addTaskToProject,removeTaskFromProject};
})();
export {Project};