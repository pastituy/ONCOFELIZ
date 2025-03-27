import styled from 'styled-components';

export const EventsSectionContainer = styled.section`
  padding: 5rem 5%;
  background-color: #fff;
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

export const EventsGrid = styled.div`
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

export const EventCard = styled.article`
  display: flex;
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

export const EventDate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme?.colors?.primary || '#FF6347'};
  color: white;
  padding: 1.5rem;
  min-width: 90px;
`;

export const EventMonth = styled.div`
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
`;

export const EventDay = styled.div`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
`;

export const EventContent = styled.div`
  padding: 1.5rem;
  flex: 1;
`;

export const EventTitle = styled.h3`
  font-family: ${props => props.theme?.fonts?.heading || "'Montserrat', sans-serif"};
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme?.colors?.dark || '#1F2937'};
`;

export const IconContainer = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 0.5rem;
  color: ${props => props.theme?.colors?.primary || '#FF6347'};
`;

export const EventTime = styled.p`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: #666;
`;

export const EventLocation = styled.p`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  margin-bottom: 1.25rem;
  color: #666;
`;

export const EventButton = styled.button`
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