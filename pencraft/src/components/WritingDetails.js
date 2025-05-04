import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

// Background image

// Styled Components for Detail View
const Wrapper = styled.div`
  padding: 20px;
  margin: 20px auto;
  max-width: 800px;
`;

const DetailContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8); /* Background color with opacity */
  padding: 20px;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
`;

const Author = styled.div`
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
`;

const PublishedDate = styled.div`
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const Tag = styled.span`
  background: #e0e0e0;
  padding: 5px 10px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 10px;
  font-size: 14px;
`;

const Status = styled.div`
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
`;

const Content = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #333;
`;

const LikeCounter = styled.div`
  margin-top: 10px;
`;

const ReadCounter = styled.div`
  margin-top: 10px;
`;

const LikeButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;




const WritingDetail = () => {
    const { id } = useParams();
    const [writing, setWriting] = useState(null);
    const [author, setAuthor] = useState(null);
    const [likes, setLikes] = useState(0);
    const [reads, setReads] = useState(0);
    const [error, setError] = useState('');
    const [hasLiked, setHasLiked] = useState(false); // State to track if the current user has liked the post

    useEffect(() => {
        fetchWriting();

    }, [id]); // Only re-run the effect if new writing is being displayed

    useEffect(() => {
        // Ensure both writing and author are loaded before incrementing reads
        if (writing && author) {
            incrementRead();
        }
    }, [writing, author]);

    const fetchWriting = async () => {
        try {
            const writingResponse = await axios.get(`http://localhost:5000/api/writings/${id}`);
            setWriting(writingResponse.data);
            setLikes(writingResponse.data.likes.length); // Assuming `likes` is an array of user IDs
            setReads(writingResponse.data.readCount); // `readCount` is the number of reads
            const authorId = writingResponse.data.author;
            fetchAuthorDetails(authorId); // Fetch author details using author ID
            incrementReadWriting();
        } catch (error) {
            console.error('Error fetching writing details:', error);
            setError('Failed to fetch writing details.');
        }
    };
    
    
    const incrementRead = async () => {
        if (!writing || !author) {
            console.log("Increment read skipped: writing or author not loaded");
            return; // Ensure writing and author are loaded
        }
        console.log("Attempting to increment read count for author:", author._id);
        try {
            const response = await axios.post(`http://localhost:5000/api/author/${author._id}/increment-reads`);
            console.log("Increment read response:", response);
            setReads(response.data.stats.totalReads); // Assuming the backend sends back the updated stats
        } catch (error) {
            console.error('Error incrementing read count:', error);
            // Handle error
        }
    };
    


    const incrementReadWriting = async () => {
        try {
            await axios.post(`http://localhost:5000/api/writings/${id}/increment-reads`);
        } catch (error) {
            console.error('Error incrementing read count:', error);
            // Optionally handle error, perhaps by not updating the UI or showing an error
        }
    };
    
    const fetchAuthorDetails = (authorId) => {
        axios.get(`http://localhost:5000/api/author/${authorId}`)
            .then(response => {
                console.log('Author details:', response.data);
                setAuthor(response.data); // Update author state with fetched data
            })
            .catch(error => {
                console.error('Error fetching author details:', error);
                // Handle error (e.g., set state)
            });
    };

    const handleLike = async () => {
        if (hasLiked) {
            // If the author has already liked the post, do nothing or show a message
            return;
        }
        try {
            await axios.post(`http://localhost:5000/api/author/${author._id}/increment-likes`);
            setLikes(prevLikes => prevLikes + 1); // Update likes count
            setHasLiked(true); // Set hasLiked to true to prevent multiple likes
        } catch (error) {
            console.error('Error liking the writing:', error);
        }
    };
    
    if (!writing || !author) return <Wrapper><p>Loading...</p></Wrapper>;
    if (error) return <Wrapper><p>{error}</p></Wrapper>;

    return (
        <Wrapper>
            <DetailContainer>
                <Title>{writing.title}</Title>
                <Author>By: {author.name}</Author>
                <PublishedDate>Published on: {new Date(writing.createdAt).toLocaleDateString()}</PublishedDate>
                <TagList>
                    {writing.tags && writing.tags.map(tag => (
                        <Tag key={tag}>{tag}</Tag>
                    ))}
                </TagList>
                <Status>Status: {writing.status.charAt(0).toUpperCase() + writing.status.slice(1)}</Status>
                <Content>{writing.content}</Content>
            </DetailContainer>
            <LikeButton onClick={handleLike} disabled={hasLiked}>Like</LikeButton>
            <LikeCounter>Total Likes: {likes}</LikeCounter>
            <ReadCounter>Total Reads: {reads}</ReadCounter>
        </Wrapper>
    );
};

export default WritingDetail;
