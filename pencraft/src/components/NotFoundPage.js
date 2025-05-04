import React from 'react';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.parallax}></div>
            <div className={styles.parallax2}></div>
            <h1 className={styles.heading}>404 - Page Not Found</h1>
            <p className={styles.text}>Sorry, the page you are looking for does not exist.</p>
            <a href="/" className={styles.link}>Go Home</a>
        </div>
    );
};

export default NotFoundPage;
