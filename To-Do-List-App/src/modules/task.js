function createTask(title,description,dueDate,priority){
    const id=crypto.randomUUID();
    return {id,title,description,dueDate,priority,completed:false}
}

function editTask(task, newTitle, newDescription, newDueDate, newPriority) {
    if (newTitle !== undefined && newTitle.trim() !== '') {
        task.title = newTitle;
    }
    if (newDescription !== undefined && newDescription.trim() !== '') {
        task.description = newDescription;
    }
    if (newDueDate !== undefined && newDueDate.trim() !== '') {
        task.dueDate = newDueDate;
    }
    if (newPriority !== undefined && newPriority.trim() !== '') {
        task.priority = newPriority;
    }
}
function toggleTaskStatus(task) {
    task.completed = !task.completed;
}


export {createTask,editTask,toggleTaskStatus};