import React, { useReducer, useContext, createContext } from 'react';
 
const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  let newArr = [...state]
  let arr = [...state]
  let empArray=[]
  switch (action.type) {  
    case "ADD":
      return [...state, { id: action.id,
         name: action.name,
          qty: action.qty,
          size: action.size,
           price: action.price, 
         img: action.img }]
      case "REMOVE":
     
        newArr.splice(action.index, 1)
        return newArr;
        case "UPDATE":
          
          arr.find((food, index) => {
              if (food.id === action.id) {
                  console.log(food.qty, parseInt(action.qty), action.price + food.price)
                  arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
              }
              return arr
          })
          return arr
          case "DROP":
           
            return empArray

      default:
      console.log("Error in reducer");

  }


}
//we make one reducer and in this reducer we writte all the cases and action defined like delete add to cart etc
export const CartProvider = ({ children }) => {
  //this is like a useState but attributs are change [state,setState]=useState
  const [state, dispatch] = useReducer(reducer, []);//if we perform some action so come here but firstly we have no any action perform so this is empty array[]

  return (
      <CartDispatchContext.Provider value={dispatch}>
          <CartStateContext.Provider value={state}>
              {children}
          </CartStateContext.Provider>
      </CartDispatchContext.Provider>
  )
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);

{/*Dispatch performed the functinality which 
something add or delete when we click on button
 of(Add Cart) and if we want to reflect all over
the application also used this is the Dispatch*/}