import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './RelatedProducts.css';
import Item from '../Items/Item';

const RelatedProducts = () => {
  const [related_products, SetRelated_products] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/newcollections')
      .then((response) => response.json())
      .then((data) => {
        SetRelated_products(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const NextArrow = (props) => {
    const { onClick } = props;
    return <div className="slick-arrow slick-next" onClick={onClick}></div>;
  };
  
  const PrevArrow = (props) => {
    const { onClick } = props;
    return <div className="slick-arrow slick-prev" onClick={onClick}></div>;
  };

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className='relatedproducts'>
      <h1>MORE PRODUCTS</h1>
      <hr />
      <div className="relatedproducts-slider">
        <div className="relatedproducts-arrows">
          <Slider {...settings}>
            {related_products.map((item, i) => (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
