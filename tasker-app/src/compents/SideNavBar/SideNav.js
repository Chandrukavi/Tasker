import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../Assets/Logo.png';


const SideNavBar = ({ categoryFilter, setCategoryFilter }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data or perform any other logout operations
    localStorage.removeItem('userToken'); // Example: clear user token
    navigate('/'); // Redirect to the login page
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <nav>
        <ul>
          <li className="active">
            <span className="icon">📋</span>
            Tasks
          </li>
          <li>
            <select
              id="dropdown"
              className="custom-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="None">📂 Categories</option>
              <option value="Home">Home</option>
              <option value="School">School</option>
              <option value="Shopping List">Shopping List</option>
            </select>
          </li>
          <li>
            <span className="icon">⚙️</span>
            Settings
          </li>
        </ul>
      </nav>
      <button className="logout" onClick={handleLogout}>Logout</button>
    </aside>
  );
};

export default SideNavBar;
