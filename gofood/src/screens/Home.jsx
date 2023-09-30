import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
import Carousal from "../components/Carousal";
import axios from "axios";

const Home = () => {
  const [search,setSearch]=useState('')
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/foodData", {})
      .then((response) => {
        setFoodCat(response.data.foodCategory);
        setFoodItem(response.data.food_items);
      })
      .catch((error) => {
        console.error("Response failed with Error:", error);
      });
  }, []);

  return (
    
    <div>
      <div>
        <NavBar />
      </div>
      <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade " style={{objectFit:"contain !important"}}>
  <div className="carousel-inner " id='carousel'>
    <div className='carousel-caption' style={{zIndex:"10"}}>
  <div className="d-flex justify-content-center">
  <input type="search" value={search} onChange={(e)=>{setSearch(e.target.value)}} className="form-control me-2"  placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
  {/* <button type="submit" className="btn btn-outline-success text-white  bg-success">search</button> */}
</div>
</div>
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block w-100" alt="..." style={{filter:"brightness(30%)"}}/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900×700/?pastry" className="d-block w-100" alt="..." style={{filter:"brightness(30%)"}}/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900×700/?barbeque" className="d-block w-100" alt="..." style={{filter:"brightness(30%)"}}/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900×700/?pakistan" className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
      </div>
      <div className="container text-white">
      {foodCat.length !== 0 ? (
      foodCat.map((data) => {
        return (
          <div key={data._id} className="row mb-3">
            <div className="fs-3 m-3">
              {data.CategoryName}
              <hr />
            </div>
            {foodItem.length !== 0 ? (
              foodItem
                .filter((item) => (item.CategoryName === data.CategoryName)&&(item.name.toLowerCase().includes(search.toLocaleLowerCase())) )
                .map((filterItem) => (
                  <div key={filterItem.id} className='col-12 col-md-6 col-lg-4'>
                    <Cards foodItem={filterItem} 
                     
                    options={filterItem.options[0]}
                     />

                     
                        </div>
                ))
            ) : (
              <div>No food items for this category</div>
            )}
          </div>
        );
      })
    ) : (
      <div>no data</div>
    )}
  </div> 
  
      <div>
        <Footer />
      </div>
   </div>
  );
};

export default Home;
