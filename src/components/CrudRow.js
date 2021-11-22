import React, { useContext } from "react";
import CrudContext from "../context/CrudContext";

const CrudRow = ({ info }) => {
  const { deleteData, setEditData } = useContext(CrudContext);
  let { id, name, type } = info;

  return (
    <tr>
      <td>{name}</td>
      <td>{type}</td>
      <td>
        <button onClick={() => setEditData(info)}>Editar</button>
        <button onClick={() => deleteData(id)}>Eliminar</button>
      </td>
    </tr>
  );
};

export default CrudRow;
