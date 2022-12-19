import '../../../css/admin.css'
import { Link } from 'react-router-dom'

function CodePromos() {
  return (
    <>
        <div className="home-content">
        <div className="d-flex align-items-center justify-content-between mt-5 mb-2 py-2 px-2 rounded mx-auto" style={ { backgroundColor: 'rgb(201, 197, 197)', width: '80%' } }>
            <h4 className="m-0 p-0">Code Promos</h4>
            <Link to="/code-promos/create" className="btn btn-primary me-1" data-mdb-ripple-color="dark" style={ { width: 'fit-content !important' } }>Generate New Code Promo</Link>
          </div>
          <div className="sales-boxes">
              <div className="recent-sales box">
                  <div className="sales-details">
                      <ul className="details">
                          <li className="topic">Code</li>
                          <li><a href="./update">4444reHC5555fhgv,6666RGhx(55t(t))</a></li>
                      </ul>
                      <ul className="details">
                          <li className="topic">Discount Value</li>
                          <li><a href="./update">30%</a></li>
                      </ul>
                      <ul className="details">
                          <li className="topic">Expiration Date</li>
                          <li><a href="./update">10 Mars 2002</a></li>
                      </ul>
                      <ul className="details">
                          <li className="topic">Permitted Products ( id )</li>
                          <li><a href="./update">1, 4, 6, 6, 7</a></li>
                      </ul>
                      <ul className="details text-center">
                          <li className="topic">Action</li>
                          <li>
                              <a href="/code-promos/update" className="text-primary px-2">Update</a>
                              <a href="#" className="text-danger px-2">Delete</a>
                          </li>
                      </ul>
                  </div>
              </div>
            </div>
        </div>
    </>
  )
}

export default CodePromos