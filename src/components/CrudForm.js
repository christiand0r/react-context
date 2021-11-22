import React, { useState, useEffect, useContext } from "react";
import CrudContext from "../context/CrudContext";

//Initial State for Form
const initialForm = {
  id: null,
  name: "",
  type: "",
};

const CrudForm = () => {
  const { createData, updateData, editData, setEditData } =
    useContext(CrudContext);

  /* STATE */
  const [form, setForm] = useState(initialForm);

  useEffect(
    () => (editData ? setForm(editData) : setForm(initialForm)),
    [editData]
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.type) {
      alert("Datos Incompletos");
      return;
    }

    form.id === null ? createData(form) : updateData(form);

    handleReset();
  };

  const handleReset = () => {
    setForm(initialForm);
    setEditData(null);
  };

  return (
    <div>
      {editData ? <h3>Editar</h3> : <h3>Agregar</h3>}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nombre del Pokémon"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="type"
          placeholder="Tipo de Pokémon"
          value={form.type}
          onChange={handleChange}
        />
        <button type="submit">Enviar</button>
        <button type="reset" onClick={handleReset}>
          Limpiar
        </button>
      </form>
    </div>
  );
};

export default CrudForm;
