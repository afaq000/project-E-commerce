import React, { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Navbar from './components/NavBar';
import axios from "axios"
export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    const userEmail = localStorage.getItem('userEmail');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/myOrderData', {
        email: userEmail
      });

      if (response.status === 200) {
        const data = response.data;
        setOrderData(data.orderData);
      } else {
        console.error('Failed to fetch order data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);
  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='row'>
          {orderData.length > 0 ? (
            orderData.map((order) => (
              <div key={order.Order_date} className='col-12 col-md-6 col-lg-3'>
                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                  <img src={order.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                  <div className="card-body">
                    <h5 className="card-title">{order.name}</h5>
                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                      <span className='m-1'>{order.qty}</span>
                      <span className='m-1'>{order.size}</span>
                      <span className='m-1'>{order.Order_date}</span>
                      <div className='d-inline ms-2 h-100 w-20 fs-5'>
                        ₹{order.price}/-
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='m-5 w-100 text-center fs-3'>No orders available!</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
