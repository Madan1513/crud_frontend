import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import ListItem from "./ListItem";
import { createService } from "../services/createService";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");
  const [message, setMessage] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  let newEmp = {};

  const save = (emp) => {
    axios
      .put(`${process.env.REACT_APP_API_PATH}/employees/${emp.id}`, { ...emp })
      .then((res) => {
        setSeverity("success");
        setMessage("Employee details saved successfully");
        setOpen(true);
        fetchAllRecords();
      });
  };

  const fetchAllRecords = () => {
    axios.get(`${process.env.REACT_APP_API_PATH}/employees`).then((res) => {
      if (res && res.data) {
        setEmployees(res.data);
      }
    });
  };

  const deleteRecord = (emp) => {
    axios
      .delete(`${process.env.REACT_APP_API_PATH}/employees/${emp.id}`)
      .then((res) => {
        setSeverity("success");
        setMessage("Employee deleted successfully");
        setOpen(true);
        fetchAllRecords();
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (type, value) => {
    newEmp[type] = value;
  };

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleSave = () => {
    if (Object.keys(newEmp).length > 0) {
      newEmp["id"] = parseInt(employees[employees.length - 1].id) + 1;
      newEmp["isCompleted"] = false;
      setIsAdding(false);
      createService(newEmp).then((res) => {
        setSeverity("success");
        setMessage("Employee details saved successfully");
        setOpen(true);
        fetchAllRecords();
      });
    }
  };

  const handleFilter = (filterValue) => {
    if (filterValue === "all") {
      fetchAllRecords();
    } else {
      axios
        .get(`${process.env.REACT_APP_API_PATH}/employees?isCompleted=true`)
        .then((res) => {
          if (res && res.data) {
            setEmployees(res.data);
          }
        });
    }
  };

  useEffect(() => fetchAllRecords(), []);

  return (
    <div className="emp-details">
      <div className="heading">CRUD Application</div>
      {isAdding ? (
        <form>
          <input
            type="text"
            placeholder="Enter Name"
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Enter Age"
            onChange={(e) => handleChange("age", e.target.value)}
          />
          <br />
          <select
            className="gender-selection"
            onChange={(e) => handleChange("gender", e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="female">female</option>
            <option value="male">male</option>
          </select>
          <br />
          <input
            type="text"
            placeholder="Enter Email ID"
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Enter Phone Number"
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          <br />
          <div className="button-container">
            <Button variant="outlined" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="add-button-container">
          <Button variant="outlined" onClick={handleAdd}>
            <AddIcon color="primary" />
            &nbsp; Add New
          </Button>
        </div>
      )}
      <div className="filter-container">
        Filter Records: &nbsp;
        <select onChange={(e) => handleFilter(e.target.value)}>
          <option value="">Select Filter</option>
          <option value="all">All Records</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Email ID</th>
            <th>Phone No.</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {employees &&
            employees.length > 0 &&
            employees.map((emp, i) => {
              return (
                <ListItem
                  key={i + "emp"}
                  data={emp}
                  save={save}
                  deleteRecord={deleteRecord}
                />
              );
            })}
        </tbody>
      </table>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert variant="filled" severity={severity} onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default List;
