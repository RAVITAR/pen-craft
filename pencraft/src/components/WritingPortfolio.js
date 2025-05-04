import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styled from 'styled-components';
import backgroundImg from './background.jpg'; // Ensure this is the correct path to your background image

const CarouselContainer = styled.div`
  padding: 5% 0; // Responsive padding
  position: relative;
  background: url(${backgroundImg}) center center / cover no-repeat;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6); // Dark overlay for better visibility of cards
    backdrop-filter: blur(5px); // Soft blur effect on the background
  }
`;

const StyledSlider = styled(Slider)`
  .slick-track {
    display: flex;
    align-items: center;
  }

  .slick-slide {
    padding: 0 15px; // Space between slides
    transition: transform 0.3s ease-in-out;
    opacity: 0.7; // Non-active slides are less visible

    &.slick-active {
      opacity: 1;
      transform: scale(1.08); // Scale up slightly to highlight
    }
  }
`;

const Arrow = styled.div`
  display: block;
  background: #fff;
  border-radius: 50%;
  padding: 10px;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  cursor: pointer;
  z-index: 100;

  // Arrow directions
  &.slick-prev { left: 25px; }
  &.slick-next { right: 25px; }

  &:before {
    font-family: 'slick';
    color: #333;
    font-size: 20px;
    opacity: 0.85;
  }

  &:hover {
    background: #ddd;
  }
`;

const CategoryCard = styled.div.attrs((props) => ({
  style: {
    backgroundImage: `url(${props.$bgImage})`,
  },
}))`
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  height: 400px;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-10px);
  }

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.4); // Subtle dark overlay
  }

  h2, p {
    position: absolute;
    z-index: 10;
    color: white;
    margin: 20px;
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  }

  h2 {
    bottom: 60px;
    font-size: 2.5rem;
  }

  p {
    bottom: 20px;
    font-size: 1rem;
    max-width: 80%;
  }
`;


const WritingPortfolio = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: '60px',
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <Arrow className="slick-next" />,
    prevArrow: <Arrow className="slick-prev" />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
        },
      },
    ],
  };

  return (
    <CarouselContainer>
      <StyledSlider {...settings}>
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            $bgImage={category.imageUrl || 'path/to/default/category/image.jpg'} // Use default image if imageUrl is not provided
            onClick={() => navigate(`/categories/${category._id}`)}
          >
            <h2>{category.name}</h2>
            <p>{category.description}</p>
          </CategoryCard>
        ))}
      </StyledSlider>
    </CarouselContainer>
  );
};

export default WritingPortfolio;
