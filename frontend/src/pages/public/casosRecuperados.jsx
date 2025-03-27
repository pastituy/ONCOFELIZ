import React from 'react';
import { 
  StoriesSectionContainer, 
  SectionTitle, 
  StoriesCarousel, 
  StoryCard, 
  StoryImage, 
  StoryContent, 
  StoryTitle, 
  StoryText, 
  StoryQuote,
  QuoteIcon,
  StoryDetails,
  StoryName,
  StoryAge,
  TitleAccent,
  SectionHeader,
  CarouselButtons,
  CarouselButton
} from '../../styles/styleCasos';

const CasosRecuperados = () => {
  const stories = [
    {
      id: 1,
      name: "Carlos Martínez",
      age: "9 años",
      diagnosis: "Leucemia linfoblástica aguda",
      image: "https://source.unsplash.com/300x300/?boy,portrait",
      quote: "Gracias a los tratamientos y al apoyo de la fundación, hoy Carlos puede volver a jugar fútbol con sus amigos. Su familia nos cuenta que su sonrisa ha vuelto más brillante que nunca.",
      recovered: "Junio 2024"
    },
    {
      id: 2,
      name: "Sofía Ramírez",
      age: "7 años",
      diagnosis: "Tumor cerebral",
      image: "https://source.unsplash.com/300x300/?girl,portrait",
      quote: "Después de una difícil batalla de dos años, Sofía finalmente está libre de cáncer. Su determinación y valentía han sido una inspiración para todos en la fundación.",
      recovered: "Marzo 2024"
    },
    {
      id: 3,
      name: "Miguel Herrera",
      age: "11 años",
      diagnosis: "Linfoma de Hodgkin",
      image: "https://source.unsplash.com/300x300/?child,portrait",
      quote: "Miguel ha demostrado una fuerza increíble durante su tratamiento. Hoy celebramos su recuperación y nos alegra verlo disfrutar nuevamente de sus clases de pintura.",
      recovered: "Enero 2024"
    }
  ];
  
  return (
    <StoriesSectionContainer>
      <SectionHeader>
        <SectionTitle>Historias de <TitleAccent>Recuperación</TitleAccent></SectionTitle>
      </SectionHeader>
      <StoriesCarousel>
        {stories.map(story => (
          <StoryCard key={story.id}>
            <StoryImage>
              <img src={story.image} alt={story.name} />
            </StoryImage>
            <StoryContent>
              <QuoteIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13,14.725c0-5.141,3.892-10.519,10-11.725l0.984,2.126c-2.215,0.835-4.163,3.742-4.38,5.746c2.491,0.392,4.396,2.547,4.396,5.149c0,3.182-2.584,4.979-5.199,4.979c-3.015,0-5.801-2.305-5.801-6.275zm-13,0c0-5.141,3.892-10.519,10-11.725l0.984,2.126c-2.215,0.835-4.163,3.742-4.38,5.746c2.491,0.392,4.396,2.547,4.396,5.149c0,3.182-2.584,4.979-5.199,4.979c-3.015,0-5.801-2.305-5.801-6.275z" />
                </svg>
              </QuoteIcon>
              <StoryTitle>Diagnóstico: {story.diagnosis}</StoryTitle>
              <StoryText>{story.quote}</StoryText>
              <StoryQuote>Recuperado: {story.recovered}</StoryQuote>
              <StoryDetails>
                <StoryName>{story.name}</StoryName>
                <StoryAge>{story.age}</StoryAge>
              </StoryDetails>
            </StoryContent>
          </StoryCard>
        ))}
      </StoriesCarousel>
      <CarouselButtons>
        <CarouselButton aria-label="Previous slide">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </CarouselButton>
        <CarouselButton aria-label="Next slide">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </CarouselButton>
      </CarouselButtons>
    </StoriesSectionContainer>
  );
};

export default CasosRecuperados;
