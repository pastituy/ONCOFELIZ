  import React from 'react';
  import { 
    EventsSectionContainer, 
    SectionTitle, 
    EventsGrid, 
    EventCard, 
    EventDate, 
    EventMonth, 
    EventDay, 
    EventContent,
    EventTitle, 
    EventLocation, 
    EventTime,
    EventButton,
    TitleAccent,
    SectionHeader,
    IconContainer
  } from '../../styles/styleEvento';

  const Eventos = () => {
    const events = [
      {
        id: 1,
        title: "Carrera por la Esperanza",
        day: "15",
        month: "Abr",
        time: "8:00 AM - 12:00 PM",
        location: "Parque Central, Ciudad de México",
        description: "Únete a nuestra carrera anual para recaudar fondos para tratamientos oncológicos pediátricos."
      },
      {
        id: 2,
        title: "Gala Benéfica Anual",
        day: "22",
        month: "May",
        time: "7:00 PM - 11:00 PM",
        location: "Hotel Ambassador, Ciudad de México",
        description: "Nuestra gala más importante del año con cena, subasta y presentaciones especiales."
      },
      {
        id: 3,
        title: "Taller para Familias",
        day: "05",
        month: "Jun",
        time: "10:00 AM - 2:00 PM",
        location: "Hospital Infantil, Ciudad de México",
        description: "Taller de apoyo psicológico y recursos para familias con niños en tratamiento."
      }
    ];
    
    return (
      <EventsSectionContainer>
        <SectionHeader>
          <SectionTitle>Próximos <TitleAccent>Eventos</TitleAccent></SectionTitle>
        </SectionHeader>
        <EventsGrid>
          {events.map(event => (
            <EventCard key={event.id}>
              <EventDate>
                <EventMonth>{event.month}</EventMonth>
                <EventDay>{event.day}</EventDay>
              </EventDate>
              <EventContent>
                <EventTitle>{event.title}</EventTitle>
                <EventTime>
                  <IconContainer>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </IconContainer>
                  {event.time}
                </EventTime>
                <EventLocation>
                  <IconContainer>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </IconContainer>
                  {event.location}
                </EventLocation>
                <EventButton>Inscribirme</EventButton>
              </EventContent>
            </EventCard>
          ))}
        </EventsGrid>
      </EventsSectionContainer>
    );
  };

  export default Eventos;
