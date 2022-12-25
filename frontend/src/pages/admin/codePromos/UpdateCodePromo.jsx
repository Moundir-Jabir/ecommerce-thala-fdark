import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { api } from '../../../helpers/api';




function UpdateCodePromo() {

 
  const navigate = useNavigate();
  const {code_promo_id} = useParams();
  const [codePromo,setcodePromo] = useState([])
  const [codename,setcodename] = useState([])
  const [codePromotion,setcodePromotion] = useState([])
  const [date_expiration,setdate_expiration] = useState([])
  const [products,setproducts] = useState([])

 

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect (()=>{
    api.get(`/codepromo/${code_promo_id}`,{ headers: { Authorization: `Bearer ${token}`}})
    .then(res=>{
      console.log(res.data);
      setcodePromo(res.data);
      setdate_expiration(res.data.date_expiration)
      setproducts(res.data.products)
    })
    .catch(error=>{
      console.log(error);
    })
  },[])
  
   
  const handleNameChange = (event) => {
    setcodePromo(event.target.value);
    setcodename(event.target.value)

  }

  const handlePromoChange = (event) => {
    setcodePromo(event.target.value);
    setcodePromotion(event.target.value);
  }

  const saveCodePromo = (e) => {
    e.preventDefault();
  const name= codename
  const promotion= codePromotion
  

    const data = {
      name,date_expiration,promotion,products
    };

    api
      .put(`/codePromo/${code_promo_id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        navigate("/admin/code-promos");

      })
      .catch((error) => {
        console.log(data);
        console.log(error);
      });
  };

  
  return (
    <>
      <div className="py-5 mx-auto" style={{ width: "80%" }}>
        <div
          className="mt-5 mb-2 py-2 px-2 rounded"
          style={{ backgroundColor: "#eee" }}
        >
          <p className="mt-2 p-0 text-success text-center">{}</p>
          <p className="mt-2 p-0 text-danger text-center">{}</p>
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
                 value={codePromo.name}
                 onChange={handleNameChange}
                
              />
            </div>
           
            <div className="mb-2">
              <input
                type="number"
                id="promotion"
                className="form-control rounded-1"
                placeholder="%"
                 value={codePromo.promotion}
                 onChange={handlePromoChange}
  
              />
            </div>

            <div className="mb-2">
                          
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

export default UpdateCodePromo