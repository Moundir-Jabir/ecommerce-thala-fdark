import '../../../css/admin.css'

function Orders() {
  return (
    <>
        <div className="home-content">
          <div className="sales-boxes">
            <div className="recent-sales box">
                <div className="sales-details">
                    <ul className="details">
                        <li className="topic">Date</li>
                        <li><p>02 Jan 2021</p></li>
                    </ul>
                    <ul className="details">
                        <li className="topic">Customer</li>
                        <li><p>Alex Doe</p></li>
                    </ul>
                    <ul className="details">
                        <li className="topic">Transaction id</li>
                        <li><p>4444reHC5555fhgv,6666RGhx(55t(t))</p></li>
                    </ul>
                    <ul className="details">
                        <li className="topic">Status</li>
                        <li><p>Delivered</p></li>
                    </ul>
                    <ul className="details">
                        <li className="topic">Total</li>
                        <li><p>$204.98</p></li>
                    </ul>
                    <ul className="details text-center">
                        <li className="topic">Shipping Location</li>
                        <li><p>$204.98</p></li>
                    </ul>
                    <ul className="details text-center">
                        <li className="topic">Action</li>
                        <li>
                            <a href="/orders/update" className="text-primary mx-2">Update</a>
                            <a href='#' className="text-danger mx-2">Delete</a>
                        </li>
                    </ul>
                </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Orders