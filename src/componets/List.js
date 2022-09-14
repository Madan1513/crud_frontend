import axios from "axios";
import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";

const List = () => {
  const [employees, setEmployees] = useState([]);

  const save = (emp) => {
    axios
      .put(`${process.env.REACT_APP_API_PATH}/employees/${emp.id}`, { ...emp })
      .then((res) => {
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
        fetchAllRecords();
      });
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
    </div>
  );
};

export default List;
