import React, { useEffect, useState } from 'react';
import logo1 from '../../../assets/MSimg1.avif';

const dataarr = [
  {
    title: 'Bath Tub',
    price: '20000',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, quae.',
  },
  {
    title: 'Bath Tub',
    price: '20000',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, quae.',
  }, {
    title: 'Bath Tub',
    price: '20000',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, quae.',
  }, {
    title: 'Bath Tub',
    price: '20000',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, quae.',
  }, {
    title: 'Bath Tub',
    price: '20000',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, quae.',
  },, {
    title: 'Bath Tub',
    price: '20000',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, quae.',
  },, {
    title: 'Bath Tub',
    price: '20000',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, quae.',
  },, {
    title: 'Bath Tub',
    price: '20000',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, quae.',
  },
];

const ItemsSection = () => {
  const getRandomColor = () => {
    
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <>
      <div className='container'>
        <div className='row'>
          {dataarr.map((item, index) => (
            <div className='col-md-3 my-3' key={index}>
              <div className='card'>
                <img src={logo1} className='card-img-top' alt='no pic' />
                <div className='card-body boxshadow' style={{ padding: 0 ,cursor:"pointer"}}>
                  <div
                    className='px-3 py-2'
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <h5 className='card-title'style={{textTransform:"uppercase"}}>{item.title}</h5>
                    <h5 className='card-title'>{item.price}</h5>
                  </div>
                  <p className='card-text px-3 py-2'>{item.description}</p>
                  <div
                    style={{
                      width: '100',
                      backgroundColor: getRandomColor(), 
                      color: 'white',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '2rem',
                      borderRadius: '3px',
                    }}
                  >
                    <a href='/'>Buy Now</a>
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
