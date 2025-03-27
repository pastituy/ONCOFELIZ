import React from 'react';
import { 
  CampaignsSectionContainer, 
  SectionTitle, 
  CampaignsGrid, 
  CampaignCard, 
  CampaignImage, 
  CampaignContent, 
  CampaignTitle, 
  CampaignDescription, 
  CampaignProgress,
  ProgressBar,
  ProgressFill,
  ProgressStats,
  ProgressAmount,
  CampaignButton,
  TitleAccent,
  SectionHeader
} from '../../styles/styleCampa';

const Campanas = () => {
  const campaigns = [
    {
      id: 1,
      title: "Equipamiento para Sala de Oncología Pediátrica",
      description: "Ayúdanos a equipar la nueva sala de oncología pediátrica con equipos modernos que mejorarán diagnósticos y tratamientos.",
      image: "https://source.unsplash.com/400x200/?hospital,children",
      raised: 8000,
      goal: 10000
    },
    {
      id: 2,
      title: "Medicamentos para Tratamientos Oncológicos",
      description: "Tu donación ayudará a cubrir los costosos medicamentos para el tratamiento de niños de familias con bajos recursos.",
      image: "https://source.unsplash.com/400x200/?medicine,healthcare",
      raised: 5000,
      goal: 1200
    },
    {
      id: 3,
      title: "Apoyo Psicológico para Familias",
      description: "Financiamos terapias para las familias de niños con cáncer, un aspecto crucial en la lucha contra la enfermedad.",
      image: "https://source.unsplash.com/400x200/?family,support",
      raised: 1800,
      goal: 30000
    }
  ];
  
  const calculateProgress = (raised, goal) => {
    return Math.min((raised / goal) * 100, 100);
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-BO', {
      style: 'currency',
      currency: 'BOB',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  return (
    <CampaignsSectionContainer>
      <SectionHeader>
        <SectionTitle>Nuestras <TitleAccent>Campañas</TitleAccent></SectionTitle>
      </SectionHeader>
      <CampaignsGrid>
        {campaigns.map(campaign => (
          <CampaignCard key={campaign.id}>
            <CampaignImage>
              <img src={campaign.image} alt={campaign.title} />
            </CampaignImage>
            <CampaignContent>
              <CampaignTitle>{campaign.title}</CampaignTitle>
              <CampaignDescription>{campaign.description}</CampaignDescription>
              <CampaignProgress>
                <ProgressBar>
                  <ProgressFill width={calculateProgress(campaign.raised, campaign.goal)} />
                </ProgressBar>
                <ProgressStats>
                  <ProgressAmount>Recaudado: {formatCurrency(campaign.raised)}</ProgressAmount>
                  <ProgressAmount>Meta: {formatCurrency(campaign.goal)}</ProgressAmount>
                </ProgressStats>
              </CampaignProgress>
              <CampaignButton>Donar Ahora</CampaignButton>
            </CampaignContent>
          </CampaignCard>
        ))}
      </CampaignsGrid>
    </CampaignsSectionContainer>
  );
};

export default Campanas;
