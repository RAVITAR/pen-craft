import { Avatar, Button, CircularProgress, Pagination, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './background.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    minWidth: '100vw',
    position: 'relative',
  },
  background: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: '100vh',
    background: `url(${backgroundImage}) center center / cover no-repeat fixed`,
    zIndex: -1,
  },
  container: {
    maxWidth: 800,
    margin: 'auto',
    padding: '30px',
    backgroundColor: '#f4f4f4',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    zIndex: 2,
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    marginTop: '50px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: '85vw',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    marginBottom: '30px',
    textAlign: 'center',
    color: theme.palette.primary.main,
    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
      cursor: 'pointer',
    },
  },
  avatar: {
    marginRight: '20px',
    width: '80px',
    height: '80px',
  },
  bio: {
    flexGrow: 1,
    marginRight: '20px',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  },
  searchInput: {
    marginRight: '10px',
  },
}));

const AuthorList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [authorsPerPage] = useState(5);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/author');
        const data = await response.json();
        if (!response.ok) throw new Error('Failed to fetch authors');
        setAuthors(data.map(author => ({
          ...author,
          id: author._id || author.id // Ensure there is an 'id' property
        })));
        setLoading(false);
      } catch (error) {
        setError('An error occurred while fetching authors: ' + error.message);
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  useEffect(() => {
    setFilteredAuthors(authors.filter(author =>
      author.name.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [searchTerm, authors]);

  const indexOfLastAuthor = currentPage * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = filteredAuthors.slice(indexOfFirstAuthor, indexOfLastAuthor);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleAuthorClick = (id) => {
    navigate(`/author/${id}`); // Navigate to the AuthorProfile component
  };

  return (
    <div className={classes.root}>
      <div className={classes.background}></div>
      <div className={classes.container}>
        <Typography variant="h1" className={classes.header}>Authors</Typography>
        <div className={classes.searchContainer}>
          <TextField
            className={classes.searchInput}
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={() => setSearchTerm('')}>Clear</Button>
        </div>
        {loading && <CircularProgress />}
        {error && <Typography variant="body1" className={classes.error}>{error}</Typography>}
        {!loading && !error && (
          <ul className={classes.list}>
            {filteredAuthors.map((author) => (
              <li key={author.id} className={classes.listItem} onClick={() => handleAuthorClick(author.id)}>
                <Avatar alt={author.name} src={author.profilePicture || 'https://via.placeholder.com/80'} className={classes.avatar} />
                <div className={classes.bio}>
                  <Typography variant="body1">{author.name}</Typography>
                  <Typography variant="body2">{author.bio}</Typography>
                </div>
                <Typography variant="body2">Followers: {author.followers}</Typography>
              </li>
            ))}
          </ul>
        )}
        {/* Pagination can be another component or directly implemented here */}
        <div className={classes.pagination}>
        <Pagination
            count={Math.ceil(filteredAuthors.length / authorsPerPage)}
            page={currentPage}
            onChange={paginate}
            color="primary"
          />
          {/* Pagination buttons go here */}
        </div>
      </div>
    </div>
  );
};

export default AuthorList;
