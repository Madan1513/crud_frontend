import React, { useState } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { red } from "@mui/material/colors";
import { green } from "@mui/material/colors";

const ListItem = (props) => {
  const emp = props.data;
  const [isEditable, setIsEditable] = useState(false);

  const handleChange = (type, value) => {
    emp[type] = value;
  };

  const handleSave = () => {
    setIsEditable(false);
    props.save(emp);
  };

  return isEditable === false ? (
    <tr>
      <td>{emp.name}</td>
      <td>{emp.age}</td>
      <td>{emp.gender}</td>
      <td>{emp.email}</td>
      <td>{emp.phone}</td>
      <td>
        <Button variant="outlined" onClick={() => setIsEditable(true)}>
          <EditIcon color="primary" />
        </Button>
      </td>
      <td>
        <Button variant="outlined" color="error">
          <DeleteIcon sx={{ color: red[500] }} />
        </Button>
      </td>
      <td>
        {emp.isCompleted ? (
          <DoneIcon sx={{ color: green[500] }} />
        ) : (
          <Button variant="contained">
            Complete
          </Button>
        )}
      </td>
    </tr>
  ) : (
    <tr>
      <td>
        <input
          type="text"
          placeholder={emp.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          placeholder={emp.age}
          onChange={(e) => handleChange("age", e.target.value)}
        />
      </td>
      <td>
        <select onChange={(e) => handleChange("gender", e.target.value)}>
          <option value="">Select</option>
          <option value="female">female</option>
          <option value="male">male</option>
        </select>
      </td>
      <td>
        <input
          type="text"
          placeholder={emp.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          placeholder={emp.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </td>
      <td>
        <Button variant="outlined" disabled>
          <EditIcon color="disabled" />
        </Button>
      </td>
      <td>
        <Button variant="outlined" disabled color="error">
          <DeleteIcon color="disabled" />
        </Button>
      </td>
      <td>
        <Button variant="contained" className="save-btn" onClick={handleSave}>
          Save
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => setIsEditable(false)}
        >
          Cancel
        </Button>
      </td>
    </tr>
  );
};

export default ListItem;
