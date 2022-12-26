import "../../../css/admin.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../../helpers/api";
import { useNavigate } from 'react-router-dom';



function CodePromos() {
  const navigate = useNavigate();
  const [codePromo, setCodePromo] = useState([]);
  const [err, setErr] = useState();

  const token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
      api.get('/codepromo', { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => {
              //  console.log(response.data)
              setCodePromo(response.data)
          })
          .catch((error) => {
               console.log(error)
          })
  }, [])

const UpdatePromo = (id)=>{
  console.log(id);
  api.get(`/codepromo/${id}`, { headers: { Authorization: `Bearer ${token}`} })
  .then(()=>{
     navigate (`/admin/code-promos/update/${id}`)
  })
}

  const DeletePromo = (id) => {
    api.delete(`/codepromo/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => {
            let result = codePromo.filter(cat => cat.code_id !== id)
            // console.log(result)
            setCodePromo(result)
        })
        .catch((error) => {
            console.log(error)
        })
}



  return (
    <>
      <div className="home-content">
        <div
          className="d-flex align-items-center justify-content-between mt-5 mb-2 py-2 px-2 rounded mx-auto"
          style={{ backgroundColor: "rgb(201, 197, 197)", width: "80%" }}
        >
          <h4 className="m-0 p-0">Code Promos</h4>
          <Link
            to="/admin/code-promos/create"
            className="btn btn-primary me-1"
            data-mdb-ripple-color="dark"
            style={{ width: "fit-content !important" }}
          >
            Generate New Code Promo
          </Link>
        </div>
        
        <div className="sales-boxes">
          <div className="recent-sales box">
          {
        codePromo.map((codePromo)=>(
            <div className="sales-details">
              <ul className="details">
                <li className="topic">Code</li>
                <li>
                  <a href="./update">{codePromo.name}</a>
                </li>
              </ul>
              <ul className="details">
                <li className="topic">Discount Value</li>
                <li>
                  <a href="./update">{codePromo.promotion}%</a>
                </li>
              </ul>
              <ul className="details">
                <li className="topic">Expiration Date</li>
                <li>
                  <a href="./update">{new Date().toDateString(codePromo.date_expiration)}</a>
                </li>
              </ul>
              <ul className="details">
                <li className="topic">Permitted Products </li>
                <li>
                  <a href="./update">{codePromo.products.join('-')}</a>
                </li>
              </ul>
              <ul className="details text-center">
                <li className="topic">Action</li>
                <li>
                  <button  onClick={() => { UpdatePromo(codePromo.code_id) }} className="text-danger px-2">
                    update
                  </button>
                  <button  onClick={() => { DeletePromo(codePromo.code_id) }} className="text-danger px-2">
                    Delete
                  </button>
                </li>
              </ul>
            </div>
                   ))
                }
          </div>
        </div>
      </div>
    </>
  );
}

export default CodePromos;
