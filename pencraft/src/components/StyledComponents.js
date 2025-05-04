import styled, { keyframes } from 'styled-components';

// Define the twinkling star animation
const twinkle = keyframes`
0% {
    background-position: 0 0;
}
100% {
    background-position: -10000px 5000px;
}
`;

// Global background with starry animation
export const GlobalBackground = styled.div`
background: #000 url('path_to_starry_background_image.jpg') repeat;
animation: twinkle 200s linear infinite;
min-height: 100vh;
position: relative;
z-index: 0;
`;

// Header styling
export const HeaderContainer = styled.header`
padding: 20px;
display: flex;
justify-content: space-between;
align-items: center;
color: #fff;
position: fixed;
top: 0;
width: 100%;
z-index: 10; // Ensure header is above other content
`;

// Main content area
export const MainContent = styled.main`
padding-top: 70px; // Adjust based on header height
z-index: 1;
`;

// Footer styling
export const FooterContainer = styled.footer`
color: #fff;
padding: 20px;
text-align: center;
position: fixed;
bottom: 0;
width: 100%;
z-index: 10; // Ensure footer is above other content
`;
