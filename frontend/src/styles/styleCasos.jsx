import styled from 'styled-components';

export const StoriesSectionContainer = styled.section`
  padding: 5rem 5%;
  background-color: #fff;
  position: relative;
`;

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

export const SectionTitle = styled.h2`
  font-family: ${props => props.theme?.fonts?.heading || "'Montserrat', sans-serif"};
  font-size: 2.5rem;
  font-weight: 700;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 70px;
    height: 3px;
    background-color: ${props => props.theme?.colors?.primary || '#FF6347'};
  }
`;

export const TitleAccent = styled.span`
  color: ${props => props.theme?.colors?.primary || '#FF6347'};
`;

export const StoriesCarousel = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: ${props => props.theme?.breakpoints?.tablet || '768px'}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme?.breakpoints?.mobile || '576px'}) {
    grid-template-columns: 1fr;
  }
`;

export const StoryCard = styled.article`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

export const StoryImage = styled.div`
  height: 250px;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const StoryContent = styled.div`
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const QuoteIcon = styled.div`
  position: absolute;
  top: -20px;
  left: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme?.colors?.primary || '#FF6347'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const StoryTitle = styled.h3`
  font-family: ${props => props.theme?.fonts?.heading || "'Montserrat', sans-serif"};
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme?.colors?.dark || '#1F2937'};
`;

export const StoryText = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  color: #666;
  margin-bottom: 1.5rem;
  flex: 1;
`;

export const StoryQuote = styled.p`
  font-size: 0.9rem;
  font-style: italic;
  color: ${props => props.theme?.colors?.primary || '#FF6347'};
  margin-bottom: 1rem;
`;

export const StoryDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

export const StoryName = styled.span`
  font-weight: 600;
  color: ${props => props.theme?.colors?.dark || '#1F2937'};
`;

export const StoryAge = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

export const CarouselButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 1rem;
`;

export const CarouselButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme?.colors?.primary || '#FF6347'};
    color: white;
    border-color: ${props => props.theme?.colors?.primary || '#FF6347'};
  }
`;