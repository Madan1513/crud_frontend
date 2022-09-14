import axios from "axios";
import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ListItem from "./ListItem";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");
  const [message, setMessage] = useState("");

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

  useEffect(() => fetchAllRecords(), []);

  return (
    <div className="emp-details">
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
