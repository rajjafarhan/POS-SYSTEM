import React, { useEffect, useState } from "react";
import logo1 from "../../../assets/MSimg1.avif";

const dataarr = [
  {
    title: 'Bath Tub',
    price: '20000',
    category:'plastic'
     
  }, {
    title: 'Bath Tub',
    price: '20000',
    category:'plastic'
     
  }, {
    title: 'Bath Tub',
    price: '20000',
    category:'plastic'
     
  }, {
    title: 'Bath Tub',
    price: '20000',
    category:'plastic'
     
  }, {
    title: 'Bath Tub',
    price: '20000',
    category:'plastic'
     
  }, {
    title: 'Bath Tub',
    price: '20000',
    category:'plastic'
     
  }, {
    title: 'Bath Tub',
    price: '20000',
    category:'plastic'
     
  }, {
    title: 'Bath Tub',
    price: '20000',
    category:'plastic'
     
  },
];

const ItemsSection = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('03363453451');
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const openWhatsappChat = () => {
    if (whatsappNumber) {
      const whatsappLink = `https://wa.me/${whatsappNumber}`;
      window.open(whatsappLink, '_blank'); 
    }
  };

  return (
    <>
      <div className="container px-5">
        <div className="row">
          {dataarr.map((item, index) => (
            <div className='col-md-3 my-3' key={index}>
              <div className='mx-2'>

              <div className='card  img-zoom boxshadow ' style={{cursor:"pointer"}} onClick={openWhatsappChat} >
                <img src={logo1} className='card-img-top pb-1 ' alt='no pic' />
                <div className='card-body ' style={{ padding: 0 ,cursor:"pointer"}}>
                  <div
                    className="px-2 "
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h5
                      className="card-title "
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "bolder",
                        fontFamily: " 'Playfair Display', sans-serif;",
                      }}
                    >
                      {item.title}
                    </h5>
                    <h5 className="card-title">{item.price}</h5>
                  </div>
                  <p
                    className="card-text px-2  fs-5"
                    style={{ textTransform: "uppercase" }}
                  >
                    {" "}
                    {item.category}
                  </p>
                  <div
                    style={{
                      width: "100",
                      backgroundColor: getRandomColor(),
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "2rem",
                      borderRadius: "3px",
                    }}
                  >
                    <a href="/">Buy Now</a>
                  </div>
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ItemsSection;
