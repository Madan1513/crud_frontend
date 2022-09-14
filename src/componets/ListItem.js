import React from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { red } from "@mui/material/colors";
import { green } from "@mui/material/colors";


const ListItem = (props) => {
  const emp = props.data;

  return  (
    <tr>
      <td>{emp.name}</td>
      <td>{emp.age}</td>
      <td>{emp.gender}</td>
      <td>{emp.email}</td>
      <td>{emp.phone}</td>
      <td>
        <Button variant="outlined">
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
  )
};

export default ListItem;
