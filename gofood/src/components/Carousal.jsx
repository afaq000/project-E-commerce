import React from 'react'

const Carousal = () => {
  return (
    <div>
       <div id="carouselExampleFade" className="carousel slide carousel-fade " style={{objectFit:"contain !important"}}>
  <div className="carousel-inner " id='carousel'>
    <div className='carousel-caption' style={{zIndex:"10"}}>
  <form className="d-flex">
  <input type="search" className="form-control me-2" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
  <button type="submit" className="btn btn-outline-success text-white  bg-success">search</button>
</form>
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
  )
}

export default Carousal;