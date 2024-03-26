
// Layout / header
import './header/show-date.js';
import './header/add-task.js';
import './header/change-theme.js';

// Layout / main
import './main/tasks-container.js';

import { loadTasks } from './main/tasks-container.js';
document.onload = loadTasks();