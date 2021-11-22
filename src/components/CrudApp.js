import React, { useContext } from "react";
import CrudContext from "../context/CrudContext";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import Loader from "./Loader";
import Message from "./Message";

const CrudApp = () => {
  const { db, loading, error } = useContext(CrudContext);

  return (
    <div>
      <h2>CRUD con JSON-Serve</h2>
      <article className="grid-half">
        <CrudForm />
        {loading && <Loader />}

        {db && <CrudTable />}

        {error && <Message msg={error.statusText} bgColor="#dc3545" />}
      </article>
    </div>
  );
};

export default CrudApp;
