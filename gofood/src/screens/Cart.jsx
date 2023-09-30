import React, { useState } from 'react';
import axios from 'axios';
import { useCart, useDispatchCart } from '../components/ContextReducer';

const Cart = () => {
  const data = useCart();
  const dispatch = useDispatchCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckOut = async () => {
    setIsCheckingOut(true);
    const userEmail = localStorage.getItem('userEmail');
  
    try {
      // Send a POST request to the server to process the order
      const response = await axios.post('http://localhost:5000/api/orderData', {
        order_data: data,
        email: userEmail, // Make sure userEmail is correctly passed
        order_date: new Date().toDateString(),
      });
      if (response.status === 200) {
              dispatch({ type: 'DROP' });
              alert('Order placed successfully!');
            }
  
      // Rest of the code to handle the response
    } catch (error) {
      // Error handling code
    } finally {
      setIsCheckingOut(false);
    }
  
  };
  // const handleCheckOut = async () => {
  //   setIsCheckingOut(true);
  //   const userEmail = localStorage.getItem('userEmail');

  //   try {
  //     const response = await axios.post('http://localhost:5000/api/orderData', {
  //       order_data: data,
  //       email: userEmail,
  //       order_date: new Date().toDateString(),
  //     });

  //     if (response.status === 200) {
  //       dispatch({ type: 'DROP' });
  //       alert('Order placed successfully!');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     alert('Error processing the order. Please try again later.');
  //   } finally {
  //     setIsCheckingOut(false);
  //   }
  // };

  const totalPrice = data.reduce((total, food) => total + food.price, 0);


  return (
    <div className="container mt-5 table-responsive table-responsive-sm">
      <table className="table table-hover">
        <thead className="text-success fs-4">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Options</th>
            <th scope="col">Amount</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody className="text-white">
          {data.map((food, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{food.name}</td>
              <td>{food.qty}</td>
              <td>{food.size}</td>
              <td>{food.price}</td>
              <td>
                <button
                  type="button"
                  className="btn p-0"
                  onClick={() => {
                    dispatch({ type: 'REMOVE', index: index });
                  }}
                  disabled={isCheckingOut}
                >
                  <img src="/icons8-cross-48.png" alt="Delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="fs-2 text-white">
        <h1> Total: {totalPrice}/-</h1>
      </div>
      <button
  className="btn bg-success mt-4"
  onClick={handleCheckOut}
  disabled={isCheckingOut || data.length === 0}
>
  {isCheckingOut ? 'Processing...' : 'Checkout'}
</button>
{data.length === 0 && <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>}
    </div>
  );
};

export default Cart;
