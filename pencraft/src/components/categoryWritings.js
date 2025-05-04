import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImg from './background.jpg';

// Styled components for UI styling
const Background = styled.div`
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
`;

const Container = styled.div`
  padding: 3rem;
  max-width: 800px;
  margin: auto;
`;

const WritingCard = styled.div`
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  &:hover {
    transform: translateY(-5px);
  }
`;

const WritingTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
  padding: 1.5rem 2rem;
  background: #f8f8f8;
  margin: 0;
`;

const WritingContent = styled.p`
  padding: 1rem 2rem;
  color: #666;
  line-height: 1.6;
`;

const AuthorLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const CategoryHeader = styled.h1`
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ReadMoreLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background-color: #f8f8f8;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const AuthorContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

// React component for displaying category writings
const CategoryWritings = () => {
  const { categoryId } = useParams();
  const [writings, setWritings] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWritingsForCategory();
  }, [categoryId]);

  const fetchWritingsForCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/categories/${categoryId}`);
      setCategoryName(response.data.name);
      const writingsResponse = await axios.get(`http://localhost:5000/api/writings/categories/${categoryId}`);
      if (Array.isArray(writingsResponse.data)) {
        const writingsWithAuthors = await Promise.all(writingsResponse.data.map(async (writing) => {
          const authorDetails = writing.author ? await fetchAuthorDetails(writing.author) : { name: 'Unknown Author' };
          return { ...writing, authorName: authorDetails.name };
        }));
        setWritings(writingsWithAuthors);
      } else {
        setWritings([]);
        setError('No writings found in this category.');
      }
    } catch (error) {
      console.error('Error fetching category or writings:', error);
      setError('Failed to fetch category or writings. Please try again later.');
    }
  };

  const fetchAuthorDetails = async (author) => {
    const authorId = author._id; // Extracting the _id from the author object
    console.log('Fetching details for author ID:', authorId); // Logging the ID to verify
    try {
      const response = await axios.get(`http://localhost:5000/api/author/${authorId}`);
      return response.data; // Assuming response.data contains the author details
    } catch (error) {
      console.error('Error fetching author details:', error);
      return { name: 'Unknown Author' }; // Fallback if fetch fails
    }
  };
  

  return (
    <Background>
      <Container>
        <CategoryHeader>{categoryName || 'Category'} Writings</CategoryHeader>
        {error ? (
          <CategoryHeader>{error}</CategoryHeader>
        ) : (
          writings.map((writing) => (
            <WritingCard key={writing._id}>
              <WritingTitle>{writing.title}</WritingTitle>
              <WritingContent>{writing.content}</WritingContent>
              <AuthorContainer>
                <span>Author: </span>
                {/* Ensure this uses writing.author._id if author is an object containing _id */}
                <AuthorLink to={`/author/${writing.author._id}`}>{writing.authorName}</AuthorLink>
              </AuthorContainer>
              <ButtonContainer>
                {/* This should point to writing._id, not the author's ID */}
                <ReadMoreLink to={`/writings/${writing._id}`}>Read more</ReadMoreLink>
                <Button onClick={() => alert(`Sharing "${writing.title}"`)}>Share</Button>
              </ButtonContainer>
            </WritingCard>
          ))
        )}
      </Container>
    </Background>
  );
};

export default CategoryWritings;
