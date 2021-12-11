import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Slider.scss';

const Slider = ({ images, auto, showArrows }) => {
  const [state, setState] = useState({
    slideShow: images[0],
    slideIndex: 0
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderInterval, setSliderInterval] = useState(0);
  const { slideShow, slideIndex } = state;
  let currentSlideIndex = 0;

  useEffect(() => {
    if (auto) {
      const timeInterval = setInterval(() => {
        autoMoveSlide();
      }, 5000);
      setSliderInterval(timeInterval);
      return () => {
        clearInterval(timeInterval);
        clearInterval(sliderInterval);
      };
    }
  }, []);

  const autoMoveSlide = () => {
    let lastIndex = 0;
    lastIndex = currentSlideIndex + 1;
    currentSlideIndex = lastIndex >= images.length ? 0 : lastIndex;
    setState((prev) => ({
      ...prev,
      slideIndex: currentSlideIndex,
      slideShow: images[currentSlideIndex]
    }));
  };

  const moveSlideArrows = (type) => {
    let index = currentSlideIndex;

    if (type === 'prev') {
      if (currentIndex <= 0) {
        index = images.length - 1;
      } else {
        index = currentIndex - 1;
      }
    } else {
      if (currentIndex < images.length - 1) {
        index = currentIndex + 1;
      } else {
        index = 0;
      }
    }
    setCurrentIndex(index);
    setState((prev) => ({
      ...prev,
      slideIndex: index,
      slideShow: images[index]
    }));
  };

  const RenderArrows = () => {
    return (
      <div className="slider-arrows">
        <div className="slider-arrow slider-arrow--left" onClick={() => moveSlideArrows('prev')} />
        <div className="slider-arrow slider-arrow--right" onClick={() => moveSlideArrows('next')} />
      </div>
    );
  };

  const Indicators = (props) => {
    const { currentSlide } = props;
    const listIndicators = images.map((slide, idx) => {
      const btnClasses = idx === currentSlide ? 'slider-navButton slider-navButton--active' : 'slider-navButton';
      return <button className={btnClasses} key={idx} />;
    });
    return <div className="slider-nav">{listIndicators}</div>;
  };

  return (
    <>
      <div className="slider">
        <div className="slider-slides">
          {images && images.length && slideShow && (
            <div className="slider-image" style={{ backgroundImage: `url(${slideShow.url})` }}></div>
          )}
        </div>
        <Indicators currentSlide={slideIndex} />
        {showArrows ? <RenderArrows /> : null}
      </div>
    </>
  );
};

export default Slider;

Slider.propTypes = {
  currentSlide: PropTypes.number,
  images: PropTypes.array.isRequired,
  showArrows: PropTypes.bool.isRequired,
  auto: PropTypes.bool.isRequired
};
