import React, { useState } from 'react';
import Slider from '../slider/Slider';
import Paginate from '../../pagenate/Paginate';

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

  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (type) => {
    if (type === 'prev' && currentPage >= 1) {
      setCurrentPage((prev) => prev - 1);
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="main-content">
      <Slider images={images} auto={true} showArrows={true} />
      <div className="grid-movie-title">
        <div className="movieType">Now Playing</div>
        <div className="paginate">
          <Paginate currentPage={currentPage} totalPages={10} paginate={paginate} />
        </div>
      </div>
      {/* display Grid components */}
    </div>
  );
};

export default MainContent;
