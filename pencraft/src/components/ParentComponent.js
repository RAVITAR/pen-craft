import React from 'react';
// import AuthorDashboard from './AuthorDashboard';
// import AuthorLogin from './AuthorLogin';
// import AuthorProfile from './AuthorProfile';
// import AuthorSettings from './AuthorSettings';

export const ParentComponent = () => {
    // const [author, setAuthor] = useState(null);
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);

    // const handleUpdateAuthor = useCallback((updatedAuthor) => {
    //     setAuthor(updatedAuthor);
    // }, []);

    // const handleLoginSuccess = useCallback(async () => {
    //     setLoading(true);
    //     try {
    //         const response = await fetch('/author');
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch author data');
    //         }
    //         const authorData = await response.json();
    //         setAuthor(authorData);
    //         setIsAuthenticated(true);
    //         setError(null);
    //     } catch (error) {
    //         console.error('Error handling login success:', error);
    //         setError('An error occurred while handling login success.');
    //     } finally {
    //         setLoading(false);
    //     }
    // }, []);

    // const handleLoginError = useCallback((errorMessage) => {
    //     setError(errorMessage);
    // }, []);

    // console.log('handleLoginSuccess function:', handleLoginSuccess);
    // console.log('handleLoginError function:', handleLoginError);


    // // Optionally preload author data on mount
    // useEffect(() => {
    //     const fetchAuthor = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await fetch('/author');
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch author data');
    //             }
    //             const authorData = await response.json();
    //             setAuthor(authorData);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error('Error fetching author data:', error);
    //             setError('An error occurred while fetching author data.');
    //             setLoading(false);
    //         }
    //     };
    //     fetchAuthor();
    // }, []);

    return (
        <div>
            {/* {loading ? (
                <p>Loading...</p>
            ) : isAuthenticated ? (
                <>
                    <AuthorSettings author={author} onUpdateAuthor={handleUpdateAuthor} />
                    <AuthorProfile author={author} />
                    <AuthorDashboard isAuthenticated={isAuthenticated} authorId={author?.id} />
                </>
            ) : (
                
                <AuthorLogin onLoginSuccess={handleLoginSuccess} onLoginError={handleLoginError} />
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>} */}
        </div>
    );
};


export default ParentComponent;
