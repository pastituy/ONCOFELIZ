import React from 'react';
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

const BlogSection = () => {
  const blogPosts = [
    {
        title: "Milagros de Esperanza: Niños que Vencieron al Cáncer",
        excerpt: "Conoce las historias inspiradoras de niños que superaron el cáncer gracias a tratamientos innovadores y tu apoyo.",
        date: "Mar 10, 2025",
        image: "https://www.gofundme.com/es-es/c/wp-content/uploads/sites/3/2019/10/young-girl-with-cancer-posing-with-doll.jpg?w=600v" 
      },
      {
        title: "Avances en Tratamientos Pediátricos",
        excerpt: "Gracias a las donaciones, hemos logrado implementar terapias avanzadas que aumentan las tasas de recuperación en un 40%.",
        date: "Mar 5, 2025",
        image: "https://th.bing.com/th/id/R.96217a91759fc7bc83bc6507f386c506?rik=4MwAIBz5gxk69Q&pid=ImgRaw&r=0" 
      },
      {
        title: "Voluntarios que Cambian Vidas",
        excerpt: "Conoce a Juan, un voluntario que ha ayudado a más de 20 familias durante el tratamiento de sus hijos contra el cáncer.",
        date: "Feb 28, 2025",
        image: "https://th.bing.com/th/id/OIP.MSEcrma7rilD3KQqP_Ln6wHaFZ?rs=1&pid=ImgDetMain" 
      }
  ];
  
  return (
    <BlogSectionContainer>
      <BlogHeader>
        <SectionTitle>Ultimas <TitleAccent>noticias</TitleAccent> & Historias</SectionTitle>
      </BlogHeader>
      <BlogGrid>
        {blogPosts.map((post,i) => (
          <BlogCard key={i}>
            <BlogImage imageUrl={post.image}>
              <BlogDate>{post.date}</BlogDate>
            </BlogImage>
            <BlogTitle>{post.title}</BlogTitle>
            <BlogExcerpt>{post.excerpt}</BlogExcerpt>
            <ReadMoreButton>Leer mas</ReadMoreButton>
          </BlogCard>
        ))}
      </BlogGrid>
    </BlogSectionContainer>
  );
};

export default BlogSection;
