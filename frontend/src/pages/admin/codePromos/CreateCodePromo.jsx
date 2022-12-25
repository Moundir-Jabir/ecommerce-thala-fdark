import React from "react";
import { useState,useEffect } from "react";
import { api } from "../../../helpers/api";
import Select from "react-select";
import { useNavigate } from 'react-router-dom';


function CreateCodePromo() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [name, setcodePromo] = useState("");
  const [date_expiration, setcdDateEx] = useState("");
  const [products, setcdProduct] = useState([]);
  const [promotion, setcdPromotion] = useState("");
  const [succ, setSucc] = useState("");
  const [err, setErr] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));


  useEffect(() => {
    api.get('/product', { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
             setData(response.data)
        })
        .catch((error) => {
             console.log(error)
            setErr(error.response?.data?.message)
        })
}, [])

  const saveCodePromo = (e) => {


    e.preventDefault();

    const data = {
      name,
      date_expiration,
      promotion,
      products,
    };

    api
      .post("/codePromo", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // console.log(response.data);
        setSucc(response.data);
        navigate("/admin/code-promos");

      })
      .catch((error) => {
        if (error.response?.status === 500) return setErr("Invalid Add");
        setErr(error.response?.data?.erreur);
      });
  };

  const handleChange = (productsVar) => {
    let id = productsVar.map(P_id=> P_id.product_id)
    setcdProduct(id);
    id=undefined
    // console.log(products);
  }
  let productsVar


  return (
    <>
      <div className="py-5 mx-auto" style={{ width: "80%" }}>
        <div
          className="mt-5 mb-2 py-2 px-2 rounded"
          style={{ backgroundColor: "#eee" }}
        >
          <p className="mt-2 p-0 text-success text-center">{succ}</p>
          <p className="mt-2 p-0 text-danger text-center">{err}</p>
          <h4 className="mt-2 p-0 text-center">Create New Code Promo</h4>
          <form
            onSubmit={saveCodePromo}
            method="post"
            encType="multipart"
            className="w-50 mx-auto border p-2"
          >
            <div className="form-outline mb-2">
              <input
                type="text"
                id="code"
                className="form-control rounded-1"
                placeholder="CodePromo"
                onChange={(e) => {
                  setcodePromo(e.target.value);
                }}
              />
            </div>
            <div className="mb-2">
              <input
                type="datetime-local"
                id="code-expiration-date"
                className="form-control rounded-1"
                onChange={(e) => {
                  setcdDateEx(e.target.value);
                }}
              />
            </div>
            <div className="mb-2">
              <input
                type="number"
                id="promotion"
                className="form-control rounded-1"
                placeholder="%"
                onChange={(e) => {
                  setcdPromotion(e.target.value);
                }}
              />
            </div>

            <div className="mb-2">
             
             <Select  options={data.map(e => {
              e.label = e.name
              e.value = e.product_id
              return e
             })} isMulti onChange={handleChange} value={productsVar}
             />                 
            </div>

            <button type="submit" className="btn btn-primary rounded-1">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateCodePromo;
