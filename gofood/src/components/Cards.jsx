import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

const Cards = (props) => {
    // Generate quantity options
    // const options = Array(6).fill().map((_, i) => (
    //     <option key={i + 1} value={i + 1}>
    //         {i + 1}
    //     </option>
    // ));

    let options = props.options;
    let priceOptions = Object.keys(options);

    // Initialize state
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(priceOptions[0] || ""); // Use the first size as the default
    const dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    // let navigate = useNavigate()
    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
          if (item.id === props.foodItem._id) {
            food = item;
    
            break;
          } 
        }
        console.log(food)
    console.log(new Date())
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }
        // Dispatch an action to add the item to the cart
        await dispatch({
            type: "ADD",
            id: props.foodItem._id,
            price: props.finalPrice,
            qty: qty,
            size: size,
            img: props.foodItem.img, // Include image URL in the cart item
            name: props.foodItem.name, // Include the product name in the cart item
        });
        await console.log(data);
    };

    // Calculate the final price based on selected quantity and size
    let finalPrice = qty * parseInt(options[size]);

    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "450px" }}>
                    <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "200px", objectFit: "fill" }} />
                    <div className="card-body bg-dark">
                        <h5 className="card-title bg-dark text-white">{props.foodItem.name}</h5>
                        <div className='container w-100 text-white' onChange={(e) => setQty(e.target.value)}>
                            <select className='m-2 h-100'>
                                {/* {options} */}
                                {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>)
              })}
                            </select>
                            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} ref={priceRef} >
                                {priceOptions.map((data) => (
                                    <option key={data} value={data}>{data}</option>
                                ))}
                            </select>
                            <div className='d-inline h-100 fs-5 text-white'>
                                Rs={finalPrice}/-
                            </div>
                        </div>
                        <hr />
                        <div className='btn bg-success justify-center ms-2 fs-5' onClick={handleAddToCart}>
                            Add to Cart
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cards;
