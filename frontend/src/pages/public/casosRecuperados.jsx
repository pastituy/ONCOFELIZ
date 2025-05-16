import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchRecuperados = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/recuperados');
        setStories(response.data);
        setLoading(false);
      } catch (err) {
        setError('No se pudieron cargar las historias de recuperación');
        setLoading(false);
      }
    };

    fetchRecuperados();
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, stories.length - 3) : Math.max(0, prevIndex - 3)
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 3 >= stories.length ? 0 : prevIndex + 3
    );
  };

  if (loading) return <div>Cargando casos de éxito...</div>;
  if (error) return <div>{error}</div>;

  const currentStories = stories.slice(currentIndex, currentIndex + 3);

  return (
    <StoriesSectionContainer>
      <SectionHeader>
        <SectionTitle>
          Historias de <TitleAccent>Recuperación</TitleAccent>
        </SectionTitle>
      </SectionHeader>

      <StoriesCarousel>
        {currentStories.map((story, index) => (
          <StoryCard key={index}>
            <StoryImage>
            <img src={story.image} alt={story.name} />

            </StoryImage>
            <StoryContent>
              <StoryTitle>Diagnóstico: {story.diagnosis}</StoryTitle>
              <StoryQuote>
                <QuoteIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13,14.725c0-5.141,3.892-10.519,10-11.725l0.984,2.126c-2.215,0.835-4.163,3.742-4.38,5.746c2.491,0.392,4.396,2.547,4.396,5.149c0,3.182-2.584,4.979-5.199,4.979c-3.015,0-5.801-2.305-5.801-6.275zm-13,0c0-5.141,3.892-10.519,10-11.725l0.984,2.126c-2.215,0.835-4.163,3.742-4.38,5.746c2.491,0.392,4.396,2.547,4.396,5.149c0,3.182-2.584,4.979-5.199,4.979c-3.015,0-5.801-2.305-5.801-6.275z" />
                </svg>
                </QuoteIcon>
                {story.quote}
              </StoryQuote>
              <StoryText>Recuperado: {story.recovered}</StoryText>
              <StoryDetails>
                <StoryName>{story.name}</StoryName>
                <StoryAge>{story.age}</StoryAge>
              </StoryDetails>
            </StoryContent>
          </StoryCard>
        ))}
      </StoriesCarousel>

      <CarouselButtons>
        <CarouselButton onClick={handlePrevious}>
          {"<"}
        </CarouselButton>
        <CarouselButton onClick={handleNext}>
        {">"}
        </CarouselButton>
      </CarouselButtons>
    </StoriesSectionContainer>
  );
};

export default CasosRecuperados;