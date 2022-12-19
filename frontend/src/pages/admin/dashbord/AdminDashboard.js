import React from 'react'

const AdminDashboard = () => {
    return (
        <div className="home-content">
            <div className="overview-boxes">
                <div className="box">
                    <div className="right-side">
                        <div className="box-topic">Total Order</div>
                        <div className="number">40,876</div>
                        <div className="indicator">
                            <i className='bx bx-up-arrow-alt'></i>
                            <span className="text">Up from yesterday</span>
                        </div>
                    </div>
                    <i className='bx bx-cart-alt cart'></i>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard