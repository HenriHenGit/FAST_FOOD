import { useEffect, useState } from 'react';
import _ from 'lodash';
import $ from 'jquery';
import OwlCarousel from 'react-owl-carousel';
import axiosClient from './axiosClient';
import {baseURL} from '../Component/axiosClient';

const CategoriesSection = () => {
  const [Products, setProducts] = useState([]);
  const [Combos, setCombos] = useState([]); //đây 
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    axiosClient.get(`/Products`)
      .then(res => {
        setProducts(res.data);
        setIsDataLoaded(true);
      });
      axiosClient.get(`/Comboes`).then((res) => {//đây 
        setCombos(res.data);
      });//đây 
    $('.set-bg').each(function () {
      var bg = $(this).data('setbg');
      $(this).css('background-image', 'url(' + bg + ')');
    });
  },[isDataLoaded]);
  const allItems = [...Products, ...Combos];//đây 
  let shuffledProducts = _.shuffle(allItems);//đây 

  // Chọn 8 sản phẩm đầu tiên
  let selectedProducts = shuffledProducts.slice(0, 13);

  

  let carouselOptions = {
    loop: true,
    margin: 0,
    dots: true,
    smartSpeed: 1200,
    autoplay: true,
    settimeout: 1000,
    responsive: {
      320: {
        items: 1,
      },
      480: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      },
    },
  };

  if (isDataLoaded) {
    const shuffledProducts = _.shuffle(allItems);//đây 

      // Chọn 8 sản phẩm đầu tiên
    const selectedProducts = shuffledProducts.slice(0, 13);
   
    if (allItems.length === 1) {//đây 
      carouselOptions = { ...carouselOptions, items: 1 };
    } else if (allItems.length === 2) {//đây 
      carouselOptions = {
        ...carouselOptions,
        items: 2,
        smartSpeed: 1000,
        responsive: { 320: { items: 1 }, 480: { items: 2 } },
      };
    } else if (allItems.length === 3) {//đây 
      carouselOptions = {
        ...carouselOptions,
        items: 3,
        responsive: { 320: { items: 1 }, 480: { items: 2 }, 768: { items: 3 } },
      };
    }
  }

  return (
    <section className="categories">
      <div className="container">
        <div className="row">
          <OwlCarousel
            className="categories__slider owl-carousel owl-loaded owl-drag"
            {...carouselOptions}
          >
            
            {selectedProducts.map((product, index) => (
              <div key={index} className="categories__item col-lg-3">
                <div
                  className="categories__item set-bg"
                  data-setbg={`${baseURL}/Images/${product.images.img}`}
                  style={{ backgroundImage: `url(${baseURL}/Images/${product.images.img})` }}
                >
                  <h5>
                  {/* //đây  */}
                    <a href={`/Shop/product/detail/${product.productType.name == "ComBo" ?
                                                            product.id+"&productTypeId="+product.productType.id :
                                                            product.id}`}>{product.name}</a>
                                                            {/* //đây  */}
                  </h5>
                </div>
              </div>
            ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
