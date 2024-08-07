// Task.js
import React, { useState } from 'react';


const Task = ({ task, onDelete, onToggleDone, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newCategory, setNewCategory] = useState(task.category);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(task._id, newTitle, newCategory);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <div className='Task-Create-Input'>
          <input 
            type="text" 
            value={newTitle} 
            onChange={(e) => setNewTitle(e.target.value)} 
          />
          <select
            id="dropdown"
            className="custom-select"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}>
            <option value="None"><span className="icon">📂Categories</span></option>
            <option value="Home">Home</option>
            <option value="School">School</option>
            <option value="Shopping List">Shopping List</option>
          </select>
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div className='input-style'>
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => onToggleDone(task._id)}
          />
          
          <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
            {task.title} - {task.category}
          </span>
          <div className='Flex-Btn'>
          <button onClick={() => onDelete(task._id)}>Delete</button>
          <button onClick={handleEdit}>Edit</button>
          </div>
        </div>
      )}
    </li>
  );
};

export default Task;
