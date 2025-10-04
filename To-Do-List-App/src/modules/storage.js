const STORAGE_KEY = "todoAppData";

// Save all projects and their tasks 
export function saveToLocalStorage(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

// Load and parse projects 
export function loadFromLocalStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];

  return JSON.parse(data);
}