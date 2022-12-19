import Sidebar from '../../../components/common/Sidebar'
import AdminNav from '../../../components/common/AdminNav'
import '../../../css/admin.css'

function Products() {
  return (
    <>
      <Sidebar />
      <section className="home-section">
        <AdminNav />

        {/* <div className="container py-5">
                <div className="d-flex align-items-center justify-content-between mt-5 mb-2 py-2 px-2 rounded" style={{ backgroundColor: 'rgb(201, 197, 197)' }}>
                    <h4 className="m-0 p-0">Products</h4>
                    <a href="./create-product.html" className="btn btn-primary me-1" data-mdb-ripple-color="dark" style={{ width: 'fit-content !important' }}>Create New Product</a>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="product__item">
                                    <div className="product__item__pic set-bg" style={{ backgroundImage: 'url("../img/product/product-2.jpg")' }}>
                                        <ul className="product__hover">
                                            <li><a href="./product-details.html"><img src="../img/icon/more.png" width="50px" alt="" /></a></li>
                                        </ul>
                                    </div>
                                    <div className="product__item__text">
                                        <h6>Piqué Biker Jacket</h6>
                                        <div className="rating">
                                            <i className="fa fa-star-o"></i>
                                            <i className="fa fa-star-o"></i>
                                            <i className="fa fa-star-o"></i>
                                            <i className="fa fa-star-o"></i>
                                            <i className="fa fa-star-o"></i>
                                        </div>
                                        <h5>$67.24</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="product__pagination">
                                    <a className="active" href="#">1</a>
                                    <a href="#">2</a>
                                    <a href="#">3</a>
                                    <span>...</span>
                                    <a href="#">21</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div> */}

        <center><h1 style={{ paddingTop: '200px' }}>Products here</h1></center>
        

      </section>

    </>
  )
}

export default Products