import React from 'react';
import styled from 'styled-components';

// Styled footer to match the header
const FooterContainer = styled.footer`
    position: relative;
    width: 100%;
    background: linear-gradient(-45deg, #CF1020, #FF4500, #D81120, #CF1020);
    color: #fff;
    padding: 20px;
    text-align: center;
    overflow: hidden;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const FooterText = styled.p`
    margin: 0;
    position: relative;
    z-index: 10;
`;

const FooterLink = styled.a`
    color: #FF6347;  // A shade of red similar to Tomato for contrast against the dark background
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
        color: #FFA07A;  // Light Salmon, a lighter shade of red on hover
    }
`;

const Footer = () => {
    return (
        <FooterContainer>
            <FooterText>
                Explore the universe of content. Visit our <FooterLink href="/">homepage</FooterLink> for more information.
            </FooterText>
        </FooterContainer>
    );
};

export default Footer;
