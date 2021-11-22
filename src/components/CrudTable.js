import React, { useContext } from "react";
import CrudContext from "../context/CrudContext";
import CrudRow from "./CrudRow";

const CrudTable = () => {
  const { db: data } = useContext(CrudContext);
  return (
    <div>
      <h3>Tabla de Datos</h3>
      <table>
        <thead>
          <tr>
            <td>Nombre</td>
            <td>Tipo</td>
            <td>Acciones</td>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((el) => <CrudRow info={el} key={el.id} />)
          ) : (
            <tr>
              <td colSpan="3">Sin datos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CrudTable;
