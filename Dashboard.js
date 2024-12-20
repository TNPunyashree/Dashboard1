import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "https://hub.dummyapis.com/employee?noOfRecords=10"
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  fetchEmployees();
}, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.id.toString().includes(searchTerm)
  );

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Employee Overview</h1>
      </header>

      <section className="overview-metrics">
        <div className="metric-card">10 Newly Hired People</div>
        <div className="metric-card">251 Active People</div>
        <div className="metric-card">19 New Hires</div>
        <div className="metric-card">Salary Range Analysis</div>
      </section>

      <div className="upload-buttons">
        <button>File Download</button>
        <button>Full Upload</button>
        <button>Partial Upload</button>
        <button>File Template</button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Employee name & ID"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <table className="employees-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Employee ID</th>
            <th>User ID</th>
            <th>Hire Date</th>
            <th>Event</th>
            <th>Position</th>
            <th>Net Salary</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.firstName} {employee.lastName}</td>
              <td>{employee.id}</td>
              <td>{employee.email.split("@")[0]}</td>
              <td>{new Date(employee.dateOfJoining).toLocaleDateString()}</td>
              <td>New Hire</td>
              <td>{employee.designation}</td>
              <td>{employee.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
