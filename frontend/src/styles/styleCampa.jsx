import styled from 'styled-components';

export const CampaignsSectionContainer = styled.section`
  padding: 5rem 5%;
  background-color: #f9f9f9;
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

export const CampaignsGrid = styled.div`
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

export const CampaignCard = styled.article`
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

export const CampaignImage = styled.div`
  height: 200px;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  ${CampaignCard}:hover & img {
    transform: scale(1.05);
  }
`;

export const CampaignContent = styled.div`
  padding: 1.5rem;
`;

export const CampaignTitle = styled.h3`
  font-family: ${props => props.theme?.fonts?.heading || "'Montserrat', sans-serif"};
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: ${props => props.theme?.colors?.dark || '#1F2937'};
`;

export const CampaignDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 1.25rem;
`;

export const CampaignProgress = styled.div`
  margin-bottom: 1.25rem;
`;

export const ProgressBar = styled.div`
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

export const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.width}%;
  background-color: ${props => props.theme?.colors?.primary || '#FF6347'};
  border-radius: 4px;
  transition: width 1s ease;
`;

export const ProgressStats = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
`;

export const ProgressAmount = styled.span`
  color: #666;
  font-weight: 500;
`;

export const CampaignButton = styled.button`
  width: 100%;
  background-color: ${props => props.theme?.colors?.primary || '#FF6347'};
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme?.colors?.dark || '#1F2937'};
  }
`;