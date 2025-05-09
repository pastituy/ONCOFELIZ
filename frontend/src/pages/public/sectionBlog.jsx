import React, { useState } from 'react';
import { 
  BlogSectionContainer, 
  SectionTitle, 
  BlogGrid, 
  BlogCard, 
  BlogImage, 
  BlogDate, 
  BlogTitle, 
  BlogExcerpt, 
  ReadMoreButton,
  TitleAccent,
  BlogHeader
} from '../../styles/styleSectionBlog';
import styled from 'styled-components';
import { FaCalendarAlt, FaArrowLeft, FaShare, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const BlogSection = () => {
  const [showDetailView, setShowDetailView] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const blogPosts = [
    {
      id: 1,
      title: "Milagros de Esperanza: Niños que Vencieron al Cáncer",
      excerpt: "Conoce las historias inspiradoras de niños que superaron el cáncer gracias a tratamientos innovadores y tu apoyo.",
      content: `
        <p>Las historias de supervivencia infantil al cáncer son una poderosa fuente de esperanza e inspiración. En nuestra fundación, hemos sido testigos de increíbles milagros que demuestran la fuerza del espíritu humano y el impacto positivo de los tratamientos innovadores.</p>
        
        <h3>La historia de Sofía</h3>
        
        <p>A sus 8 años, Sofía fue diagnosticada con leucemia linfoblástica aguda, un tipo de cáncer que afecta los glóbulos blancos. Su familia quedó devastada, pero nunca perdió la esperanza. Gracias a un tratamiento innovador financiado por donaciones como la tuya, Sofía pudo acceder a una terapia personalizada que atacaba específicamente las células cancerígenas sin dañar el resto de su cuerpo.</p>
        
        <p>Después de 18 meses de tratamiento, Sofía recibió la noticia que tanto esperaba: estaba libre de cáncer. Hoy, tres años después, disfruta de una vida normal, juega fútbol y sueña con ser médica para ayudar a otros niños como ella.</p>
        
        <h3>Martín y su batalla contra el neuroblastoma</h3>
        
        <p>El caso de Martín, de 5 años, parecía especialmente complicado. Un neuroblastoma en etapa avanzada amenazaba su vida, y los tratamientos convencionales no mostraban resultados. Gracias a un ensayo clínico pionero que pudimos ofrecer en nuestra fundación, Martín recibió una inmunoterapia que entrenó a su propio sistema inmunológico para combatir el cáncer.</p>
        
        <p>La respuesta fue sorprendente. En seis meses, los tumores comenzaron a reducirse, y hoy Martín está en remisión completa, disfrutando de su infancia y compartiendo su historia para dar esperanza a otros niños.</p>
        
        <h3>El impacto de tu apoyo</h3>
        
        <p>Estas historias no serían posibles sin el apoyo de personas como tú. Cada donación, por pequeña que sea, contribuye a financiar tratamientos innovadores, mejorar la calidad de vida durante la hospitalización y apoyar a las familias en los momentos más difíciles.</p>
        
        <p>Con tu ayuda, seguiremos escribiendo historias de esperanza y superación, demostrando que el cáncer infantil puede ser vencido.</p>
      `,
      date: "Mar 10, 2025",
      author: "Dra. Carmen Mendoza",
      image: "https://tse1.explicit.bing.net/th/id/OIP.UI3DRMPyWu0JkBRdC6PyaAHaGC?rs=1&pid=ImgDetMain",
      tags: ["Esperanza", "Tratamientos", "Testimonios"]
    },
    {
      id: 2,
      title: "Avances en Tratamientos Pediátricos",
      excerpt: "Gracias a las donaciones, hemos logrado implementar terapias avanzadas que aumentan las tasas de recuperación en un 40%.",
      content: `
        <p>Los últimos años han sido testigos de avances revolucionarios en el tratamiento del cáncer infantil. Gracias a la generosidad de nuestros donantes y al trabajo incansable de investigadores y médicos, hemos logrado implementar terapias pioneras que están cambiando radicalmente el pronóstico para muchos niños.</p>
        
        <h3>Inmunoterapia personalizada</h3>
        
        <p>Una de las innovaciones más prometedoras es la inmunoterapia personalizada, un tratamiento que aprovecha el propio sistema inmunológico del paciente para combatir el cáncer. Mediante técnicas avanzadas, se modifican las células T del niño para que puedan reconocer y atacar específicamente las células cancerosas.</p>
        
        <p>En nuestra fundación, hemos implementado este tratamiento para casos de leucemia resistente a terapias convencionales, logrando tasas de remisión del 80% en casos que antes se consideraban intratables.</p>
        
        <h3>Radioterapia de precisión</h3>
        
        <p>La radioterapia ha evolucionado significativamente. Los nuevos equipos de protonterapia permiten dirigir la radiación con una precisión milimétrica, destruyendo las células cancerosas mientras preservan los tejidos sanos circundantes. Esto es especialmente importante en niños, cuyos órganos aún están en desarrollo.</p>
        
        <p>Gracias a las donaciones recibidas, hemos podido adquirir un equipo de última generación que ha beneficiado ya a más de 50 niños con tumores cerebrales y otros cánceres de difícil acceso.</p>
        
        <h3>Diagnóstico molecular avanzado</h3>
        
        <p>La detección temprana sigue siendo crucial para el éxito del tratamiento. Las nuevas técnicas de diagnóstico molecular permiten identificar marcadores genéticos específicos del cáncer, lo que posibilita tratamientos más dirigidos y efectivos.</p>
        
        <p>Con tu apoyo, hemos implementado un laboratorio de diagnóstico molecular que ha reducido el tiempo promedio de diagnóstico de 15 a 5 días, permitiendo iniciar los tratamientos con mayor rapidez.</p>
        
        <h3>El futuro es prometedor</h3>
        
        <p>Estos avances son solo el comienzo. Con el continuo apoyo de la comunidad, estamos trabajando en nuevas investigaciones que prometen transformar aún más el panorama del cáncer infantil, acercándonos cada día a nuestro objetivo final: que ningún niño pierda su infancia a causa del cáncer.</p>
      `,
      date: "Mar 5, 2025",
      author: "Dr. Roberto Altamirano",
      image: "https://www.lostiempos.com/sites/default/files/media_imagen/2018/7/17/15_me_2_rochaaa.jpg",
      tags: ["Investigación", "Tecnología", "Tratamientos"]
    },
    {
      id: 3,
      title: "Voluntarios que Cambian Vidas",
      excerpt: "Conoce a Juan, un voluntario que ha ayudado a más de 20 familias durante el tratamiento de sus hijos contra el cáncer.",
      content: `
        <p>Detrás de cada niño que lucha contra el cáncer hay un equipo de profesionales médicos dedicados, familias resilientes y, a menudo, voluntarios extraordinarios cuya compasión y compromiso marcan una diferencia significativa en el viaje hacia la recuperación.</p>
        
        <h3>La historia de Juan</h3>
        
        <p>Juan Méndez nunca imaginó que perder a su sobrino por leucemia cambiaría completamente el rumbo de su vida. Tras el duelo, decidió honrar la memoria del pequeño Pablo convirtiéndose en voluntario en nuestra fundación. Durante los últimos cinco años, Juan ha dedicado sus fines de semana a acompañar a niños durante sus tratamientos, ofreciendo apoyo tanto práctico como emocional.</p>
        
        <p>"Lo más importante es estar presente", explica Juan. "A veces solo se trata de jugar una partida de ajedrez, leer un cuento o simplemente escuchar. Estos momentos de normalidad en medio de una situación tan difícil son invaluables para los niños y sus familias".</p>
        
        <h3>El impacto del voluntariado</h3>
        
        <p>Los estudios han demostrado que el apoyo emocional adecuado puede mejorar significativamente la experiencia del tratamiento e incluso influir positivamente en los resultados médicos. Los voluntarios como Juan crean un entorno más cálido y humano dentro del hospital, aliviando el estrés tanto de los niños como de los padres.</p>
        
        <p>María, madre de Lucía, una niña de 7 años en tratamiento por un tumor óseo, comparte: "Los días de quimioterapia solían ser una pesadilla para nosotras. Desde que Juan comenzó a visitarnos, Lucía espera con ansias ir al hospital para verlo. Ha transformado completamente nuestra experiencia".</p>
        
        <h3>Un programa en crecimiento</h3>
        
        <p>Inspirados por el ejemplo de Juan y el impacto positivo de su labor, hemos expandido nuestro programa de voluntariado, que ahora cuenta con más de 50 personas dedicadas. Ofrecemos formación especializada en apoyo emocional a pacientes oncológicos pediátricos y sus familias, creando una red de soporte que se extiende más allá de las paredes del hospital.</p>
        
        <p>Los voluntarios apoyan a las familias de múltiples maneras: desde actividades recreativas con los niños hasta ayuda logística para familias que deben trasladarse lejos de casa para recibir tratamiento, pasando por grupos de apoyo para padres y hermanos.</p>
        
        <h3>Únete a nuestro equipo</h3>
        
        <p>Si te inspira la historia de Juan y quieres marcar la diferencia en la vida de un niño con cáncer y su familia, te invitamos a unirte a nuestro programa de voluntariado. No se requiere experiencia médica, solo un corazón dispuesto a servir y la capacidad de brindar apoyo con sensibilidad y respeto.</p>
        
        <p>Como dice Juan: "Recibo mucho más de lo que doy. Estos niños me han enseñado el verdadero significado de la valentía y la esperanza. Es un privilegio formar parte de sus vidas".</p>
      `,
      date: "Feb 28, 2025",
      author: "Ana Gutiérrez",
      image: "https://tse2.mm.bing.net/th/id/OIP.yNgWRR2d3-iU6_DvKH1a_AHaE6?rs=1&pid=ImgDetMain",
      tags: ["Voluntariado", "Comunidad", "Apoyo"]
    }
  ];
  
  const handleReadMore = (blog) => {
    setSelectedBlog(blog);
    setShowDetailView(true);
    window.scrollTo(0, 0);
  };
  
  const handleBack = () => {
    setShowDetailView(false);
    setSelectedBlog(null);
  };
  
  return (
    <BlogSectionContainer>
      {!showDetailView ? (
        <>
          <BlogHeader>
            <SectionTitle>Ultimas <TitleAccent>noticias</TitleAccent> & Historias</SectionTitle>
          </BlogHeader>
          <BlogGrid>
            {blogPosts.map((post, i) => (
              <BlogCard key={i}>
                <BlogImage imageUrl={post.image}>
                  <BlogDate>{post.date}</BlogDate>
                </BlogImage>
                <BlogTitle>{post.title}</BlogTitle>
                <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                <ReadMoreButton onClick={() => handleReadMore(post)}>Leer más</ReadMoreButton>
              </BlogCard>
            ))}
          </BlogGrid>
        </>
      ) : (
        <BlogDetailView>
          <BlogDetailHeader>
            <BackButton onClick={handleBack}>
              <FaArrowLeft /> Volver a noticias
            </BackButton>
            <ShareContainer>
              <ShareText>Compartir:</ShareText>
              <SocialIcons>
                <SocialIcon>
                  <FaFacebook />
                </SocialIcon>
                <SocialIcon>
                  <FaTwitter />
                </SocialIcon>
                <SocialIcon>
                  <FaInstagram />
                </SocialIcon>
              </SocialIcons>
            </ShareContainer>
          </BlogDetailHeader>
          
          <BlogDetailHero imageUrl={selectedBlog?.image}>
            <BlogDetailOverlay>
              <BlogDetailCategory>{selectedBlog?.tags[0]}</BlogDetailCategory>
              <BlogDetailTitle>{selectedBlog?.title}</BlogDetailTitle>
              <BlogDetailMeta>
                <BlogDetailAuthor>Por {selectedBlog?.author}</BlogDetailAuthor>
                <BlogDetailDateWrapper>
                  <FaCalendarAlt />
                  <span>{selectedBlog?.date}</span>
                </BlogDetailDateWrapper>
              </BlogDetailMeta>
            </BlogDetailOverlay>
          </BlogDetailHero>
          
          <BlogDetailContent 
            dangerouslySetInnerHTML={{ __html: selectedBlog?.content }} 
          />
          
          <BlogDetailTags>
            {selectedBlog?.tags.map((tag, index) => (
              <BlogDetailTag key={index}>{tag}</BlogDetailTag>
            ))}
          </BlogDetailTags>
          
          <BlogDetailFooter>
            <RelatedArticlesTitle>Artículos relacionados</RelatedArticlesTitle>
            <RelatedArticlesGrid>
              {blogPosts
                .filter(post => post.id !== selectedBlog?.id)
                .slice(0, 2)
                .map((post, i) => (
                  <RelatedArticleCard key={i} onClick={() => handleReadMore(post)}>
                    <RelatedArticleImage imageUrl={post.image}>
                      <RelatedArticleDate>{post.date}</RelatedArticleDate>
                    </RelatedArticleImage>
                    <RelatedArticleTitle>{post.title}</RelatedArticleTitle>
                  </RelatedArticleCard>
                ))}
            </RelatedArticlesGrid>
          </BlogDetailFooter>
        </BlogDetailView>
      )}
    </BlogSectionContainer>
  );
};

export default BlogSection;

const BlogDetailView = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

const BlogDetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #555;
  font-weight: 600;
  cursor: pointer;
  padding: 10px 0;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors?.primary || '#FF6347'};
  }
`;

const ShareContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ShareText = styled.span`
  font-size: 14px;
  color: #555;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 10px;
`;

const SocialIcon = styled.a`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors?.primary || '#FF6347'};
    color: white;
  }
`;

const BlogDetailHero = styled.div`
  height: 400px;
  width: 100%;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  margin-bottom: 30px;
`;

const BlogDetailOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
  color: white;
`;

const BlogDetailCategory = styled.span`
  background-color: ${props => props.theme.colors?.primary || '#FF6347'};
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 15px;
  display: inline-block;
`;

const BlogDetailTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 15px;
  line-height: 1.2;
`;

const BlogDetailMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 14px;
`;

const BlogDetailAuthor = styled.span`
  font-weight: 500;
`;

const BlogDetailDateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const BlogDetailContent = styled.div`
  font-size: 16px;
  line-height: 1.8;
  color: #444;
  margin-bottom: 30px;
  
  p {
    margin-bottom: 20px;
  }
  
  h3 {
    font-size: 22px;
    font-weight: 700;
    margin: 30px 0 15px;
    color: #333;
  }
  
  img {
    max-width: 100%;
    border-radius: 8px;
    margin: 20px 0;
  }
`;

const BlogDetailTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 40px;
`;

const BlogDetailTag = styled.span`
  background-color: #f5f5f5;
  color: #555;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background-color: #e5e5e5;
  }
`;

const BlogDetailFooter = styled.div`
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid #eee;
`;

const RelatedArticlesTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #333;
`;

const RelatedArticlesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RelatedArticleCard = styled.div`
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const RelatedArticleImage = styled.div`
  height: 200px;
  width: 100%;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  margin-bottom: 15px;
`;

const RelatedArticleDate = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
`;

const RelatedArticleTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  color: #333;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors?.primary || '#FF6347'};
  }
`;