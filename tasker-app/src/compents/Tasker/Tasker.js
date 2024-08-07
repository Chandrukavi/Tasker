import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Task';
import SideNavBar from './../SideNavBar/SideNav';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('None'); // Default category
  const [filter, setFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('None'); // Default category filter

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleTaskDone = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3001/tasks/${id}`, { done: !tasks.find(task => task._id === id).done });
      const updatedTask = response.data;
      setTasks(tasks.map(task => task._id === id ? updatedTask : task));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const editTask = async (id, newTitle, newCategory) => {
    try {
      const response = await axios.put(`http://localhost:3001/tasks/${id}`, { title: newTitle, category: newCategory });
      const updatedTask = response.data;
      setTasks(tasks.map(task => task._id === id ? updatedTask : task));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleAddTask = async () => {
    const newTask = {
      title: newTaskTitle,
      category: newTaskCategory
    };

    try {
      const response = await axios.post('http://localhost:3001/tasks', newTask);
      const addedTask = response.data;
      setTasks([...tasks, addedTask]);
      setShowAddTaskForm(false);
      // Clear input fields after adding task
      setNewTaskTitle('');
      setNewTaskCategory('None'); // Reset category to default
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All' && categoryFilter === 'None') return true;
    if (filter === 'All') return task.category === categoryFilter;
    if (filter === 'Done' && categoryFilter === 'None') return task.done;
    if (filter === 'Done') return task.done && task.category === categoryFilter;
    if (filter === 'Not done' && categoryFilter === 'None') return !task.done;
    if (filter === 'Not done') return !task.done && task.category === categoryFilter;
    return true;
  });

  return (
    <div className="task-list">
      <div className='Tasker-flex'>
        <div className='Side-Tasker-flex'>
          <SideNavBar categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} />
        </div>
        <div className='Tasker-Main-flex'>
        <h1>All your tasks</h1>
          <div className='header'>
            <h1>Tasks</h1>
           
            <div className="filter-buttons">
              <button onClick={() => setFilter('All')}>All</button>
              <button onClick={() => setFilter('Done')}>Done</button>
              <button onClick={() => setFilter('Not done')}>Not done</button>
            </div>
          </div>
          <ul>
            {filteredTasks.map(task => (
              <Task 
                key={task._id} 
                task={task} 
                onDelete={deleteTask} 
                onToggleDone={toggleTaskDone} 
                onEdit={editTask} // Pass the edit function
              />
            ))}
          </ul>
          <button onClick={() => setShowAddTaskForm(true)} className='Add-Btn'>Add Task</button>
          {showAddTaskForm && (
            <div className='Add-Task-Box'>
              <div className='Add-task-input'>
                <input
                  type="text"
                  placeholder="Task Title"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <select
                  id="dropdown"
                  className="custom-select"
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value)}
                >
                  <option value="None"><span className="icon">📂Categories</span></option>
                  <option value="Home">Home</option>
                  <option value="School">School</option>
                  <option value="Shopping List">Shopping List</option>
                </select>
              </div>
              <div className='Add-Task-Btn'>
                <button onClick={handleAddTask}>Add</button>
                <button onClick={() => setShowAddTaskForm(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
