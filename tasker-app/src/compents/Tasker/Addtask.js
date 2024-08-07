// // AddTaskPage.js
// import React, { useState } from 'react';
// import TaskList from './Tasker';

// const AddTaskPage = () => {
//   const [tasks, setTasks] = useState([{ id: 1, title: 'Example task 2', category: 'Home', done: false }]);
//   const [showTaskList, setShowTaskList] = useState(false);
//   const [newTaskTitle, setNewTaskTitle] = useState('');
//   const [newTaskCategory, setNewTaskCategory] = useState('');

//   const addTask = () => {
//     const newTask = { id: Date.now(), title: newTaskTitle, category: newTaskCategory, done: false };
//     setTasks([...tasks, newTask]);
//     setShowTaskList(true);
//   };

//   const cancelAddTask = () => {
//     setShowTaskList(true);
//   };

//   return (
//     <div className="add-task-page">
//       {showTaskList ? (
//         <TaskList tasks={tasks} setTasks={setTasks} />
//       ) : (
//         <div className="add-task-form">
//           <h2>Add New Task</h2>
//           <input type="text" placeholder="Task Title" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} />
//           <input type="text" placeholder="Category" value={newTaskCategory} onChange={(e) => setNewTaskCategory(e.target.value)} />
//           <button onClick={addTask}>Add Task</button>
//           <button onClick={cancelAddTask}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddTaskPage;
