import styled from 'styled-components';

export const BlogSectionContainer = styled.section`
  padding: 5rem 5%;
  background-color: #f9f9f9;
`;

export const BlogHeader = styled.div`
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

export const BlogGrid = styled.div`
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

export const BlogCard = styled.article`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

export const BlogImage = styled.div`
  height: 200px;
  background-image: url(${props => props.imageUrl || '/path-to-default-image.jpg'});
  background-size: cover;
  background-position: center;
  position: relative;
`;

export const BlogDate = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: ${props => props.theme?.colors?.primary || '#FF6347'};
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 500;
`;

export const BlogTitle = styled.h3`
  font-family: ${props => props.theme?.fonts?.heading || "'Montserrat', sans-serif"};
  font-size: 1.25rem;
  font-weight: 600;
  padding: 1.5rem 1.5rem 0.75rem;
  color: ${props => props.theme?.colors?.dark || '#1F2937'};
`;

export const BlogExcerpt = styled.p`
  padding: 0 1.5rem 1.5rem;
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
`;

export const ReadMoreButton = styled.button`
  margin: 0 1.5rem 1.5rem;
  background-color: transparent;
  color: ${props => props.theme?.colors?.primary || '#FF6347'};
  border: 1px solid ${props => props.theme?.colors?.primary || '#FF6347'};
  padding: 0.5rem 1.25rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme?.colors?.primary || '#FF6347'};
    color: white;
  }
`;