import styled from "styled-components";

const BlogPreview = ({ blog }) => {
  return (
    <BlogContainer>
      <h2>{blog.titulo}</h2>
      <p>
        <strong>Autor:</strong> {blog.autor}
      </p>
      <p>
        <strong>Categoría:</strong> {blog.idCategoria}
      </p>
      <p>
        <em>{blog.excerpt}</em>
      </p>

      <hr />

      {blog.contenidos.map((seccion, idx) => (
        <Section key={idx}>
          <h3>{seccion.titulo}</h3>
          <p>{seccion.texto}</p>
        </Section>
      ))}

      <Tags>
        {blog.tags.map((tag, idx) => (
          <span key={idx}>#{tag}</span>
        ))}
      </Tags>
    </BlogContainer>
  );
};
export default BlogPreview;
const BlogContainer = styled.div`
  background: #fff;
  border-left: 4px solid #007acc;
  padding: 20px;
  border-radius: 10px;
  color: #333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h2 {
    margin-top: 0;
    color: #007acc;
  }

  h3 {
    margin-bottom: 5px;
    color: #444;
  }

  p {
    line-height: 1.6;
  }

  hr {
    margin: 20px 0;
  }
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Tags = styled.div`
  margin-top: 10px;

  span {
    background: #e0f0ff;
    color: #007acc;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 13px;
    margin-right: 5px;
    display: inline-block;
  }
`;
