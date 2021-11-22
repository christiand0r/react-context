import { createContext, useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";

const CrudContext = createContext();

let api = helpHttp();

const CrudProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  const [editData, setEditData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let url = "http://localhost:5000/pokemons";

  useEffect(() => {
    setLoading(true);

    api.get(url).then((res) => {
      if (!res.error) {
        setDb(res);
        setError(null);
      } else {
        setDb(null);
        setError(res);
      }

      setLoading(false);
    });
  }, [url]);

  const createData = (data) => {
    data.id = Date.now();

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.post(url, options).then((res) => {
      if (!res.error) {
        setDb([...db, res]);
      } else {
        setError(res);
      }
    });
  };

  const updateData = (data) => {
    let endpoint = `${url}/${data.id}`;
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    // console.log(endpoint);

    api.put(endpoint, options).then((res) => {
      if (!res.error) {
        let editedData = db.map((el) => (el.id === data.id ? data : el));
        setDb(editedData);
      } else {
        setError(res);
      }
    });
  };

  const deleteData = (id) => {
    let confirm = window.confirm("¿Seguro que desea eliminar este elemento?");
    let endpoint = `${url}/${id}`;
    let options = {
      headers: { "content-type": "application/json" },
    };

    if (confirm) {
      api.del(endpoint, options).then((res) => {
        if (!res.error) {
          let newData = db.filter((el) => el.id !== id);
          setDb(newData);
        } else {
          setError(res);
        }
      });
    } else {
      alert("Operación cancelada");
    }
  };

  const data = {
    db,
    error,
    loading,
    editData,
    setEditData,
    createData,
    updateData,
    deleteData,
  };

  return <CrudContext.Provider value={data}>{children}</CrudContext.Provider>;
};

export { CrudProvider };
export default CrudContext;
