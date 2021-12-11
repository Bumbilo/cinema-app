import React from 'react';
import Slider from '../slider/Slider';

import './MainContent.scss';

const MainContent = () => {
  const images = [
    {
      url: 'https://www.shaadidukaan.com/vogue/wp-content/uploads/2019/08/hug-kiss-images.jpg'
    },
    {
      url: 'https://test.ua/img/projects/testnp.png'
    },
    {
      url: 'https://www.shaadidukaan.com/vogue/wp-content/uploads/2019/08/hug-kiss-images.jpg'
    }
  ];
  return (
    <div className="main-content">
      <Slider images={images} auto={true} showArrows={true} />
      <div className="grid-movie-title">
        <div className="movieType">Now Playing</div>
        <div className="paginate">Paginate</div>
      </div>
      {/* display Grid components */}
    </div>
  );
};

export default MainContent;
