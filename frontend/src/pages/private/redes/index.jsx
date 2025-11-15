import React, { useState } from 'react';

const Container = ({ children }) => (
  <div style={{
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  }}>
    {children}
  </div>
);

const Title = ({ children }) => (
  <h1 style={{
    color: '#333',
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '2.5rem'
  }}>
    {children}
  </h1>
);

const FormSection = ({ children }) => (
  <div style={{
    background: '#fff',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '30px'
  }}>
    {children}
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 style={{
    color: '#4267B2',
    marginBottom: '20px',
    fontSize: '1.5rem',
    borderBottom: '2px solid #4267B2',
    paddingBottom: '10px'
  }}>
    {children}
  </h2>
);

const FormGroup = ({ children }) => (
  <div style={{ marginBottom: '20px' }}>
    {children}
  </div>
);

const Label = ({ children }) => (
  <label style={{
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#333'
  }}>
    {children}
  </label>
);

const Input = ({ ...props }) => (
  <input
    style={{
      width: '100%',
      padding: '12px',
      border: '2px solid #ddd',
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'border-color 0.3s',
      boxSizing: 'border-box'
    }}
    onFocus={(e) => e.target.style.borderColor = '#4267B2'}
    onBlur={(e) => e.target.style.borderColor = '#ddd'}
    {...props}
  />
);

const TextArea = ({ ...props }) => (
  <textarea
    style={{
      width: '100%',
      padding: '12px',
      border: '2px solid #ddd',
      borderRadius: '8px',
      fontSize: '16px',
      minHeight: '120px',
      resize: 'vertical',
      transition: 'border-color 0.3s',
      boxSizing: 'border-box',
      fontFamily: 'Arial, sans-serif'
    }}
    onFocus={(e) => e.target.style.borderColor = '#4267B2'}
    onBlur={(e) => e.target.style.borderColor = '#ddd'}
    {...props}
  />
);

const Button = ({ children, disabled, onClick, ...props }) => (
  <button
    style={{
      background: disabled ? '#ccc' : '#FF6B35',
      color: 'white',
      border: 'none',
      padding: '15px 30px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s',
      opacity: disabled ? 0.6 : 1,
      marginRight: '10px'
    }}
    onMouseEnter={(e) => {
      if (!disabled) {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
      }
    }}
    onMouseLeave={(e) => {
      if (!disabled) {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = 'none';
      }
    }}
    disabled={disabled}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

const TestButton = ({ children, onClick, disabled }) => (
  <button
    style={{
      background: disabled ? '#ccc' : '#28a745',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: 'bold',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s',
      opacity: disabled ? 0.6 : 1,
      marginBottom: '10px'
    }}
    onMouseEnter={(e) => {
      if (!disabled) {
        e.target.style.transform = 'translateY(-1px)';
        e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
      }
    }}
    onMouseLeave={(e) => {
      if (!disabled) {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = 'none';
      }
    }}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

const Table = ({ children }) => (
  <table style={{
    width: '100%',
    borderCollapse: 'collapse',
    background: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  }}>
    {children}
  </table>
);

const TableHeader = ({ children }) => (
  <thead style={{
    background: '#4267B2',
    color: 'white'
  }}>
    {children}
  </thead>
);

const TableRow = ({ children, isEven }) => (
  <tr style={{
    background: isEven ? '#f8f9fa' : 'white'
  }}
  onMouseEnter={(e) => e.target.style.background = '#e9ecef'}
  onMouseLeave={(e) => e.target.style.background = isEven ? '#f8f9fa' : 'white'}
  >
    {children}
  </tr>
);

const TableCell = ({ children }) => (
  <td style={{
    padding: '12px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left'
  }}>
    {children}
  </td>
);

const TableHeaderCell = ({ children }) => (
  <th style={{
    padding: '15px 12px',
    textAlign: 'left',
    fontWeight: 'bold'
  }}>
    {children}
  </th>
);

const StatusBadge = ({ status }) => (
  <span style={{
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
    background: status === 'published' ? '#28a745' : status === 'error' ? '#dc3545' : '#6c757d',
    color: 'white'
  }}>
    {status === 'published' ? 'Publicado' : status === 'error' ? 'Error' : 'Pendiente'}
  </span>
);

const LoadingSpinner = () => (
  <div style={{
    display: 'inline-block',
    width: '20px',
    height: '20px',
    border: '3px solid #f3f3f3',
    borderTop: '3px solid #4267B2',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginRight: '10px'
  }}>
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

const Redes = () => {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    imageUrl: '',
    link: ''
  });

  const [scheduleData, setScheduleData] = useState({
    title: '',
    message: '',
    imageUrl: '',
    link: '',
    scheduleDate: ''
  });

  const [publications, setPublications] = useState([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleScheduleInputChange = (e) => {
    const { name, value } = e.target;
    setScheduleData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Test de conexión con Zapier
  const handleTestConnection = async () => {
    setIsTesting(true);
    try {
      const response = await fetch('http://localhost:3000/api/facebook/test', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result = await response.json();

      if (result.success) {
        alert('✅ ¡Conexión exitosa con Zapier!');
      } else {
        alert('❌ Error en la conexión: ' + result.error);
      }
    } catch (error) {
      alert('❌ Error de conexión: ' + error.message);
    } finally {
      setIsTesting(false);
    }
  };

  // Publicación inmediata
  const handleSubmit = async () => {
    if (!postData.message.trim()) {
      alert('El mensaje es requerido');
      return;
    }

    setIsPublishing(true);

    try {
      const response = await fetch('http://localhost:3000/api/facebook/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: postData.title,
          message: postData.message,
          imageUrl: postData.imageUrl,
          link: postData.link
        })
      });

      const result = await response.json();

      const newPublication = {
        id: Date.now(),
        title: postData.title,
        message: postData.message,
        imageUrl: postData.imageUrl,
        link: postData.link,
        status: result.success ? 'published' : 'error',
        publishedAt: new Date().toLocaleString(),
        zapierResponse: result.zapierResponse,
        error: result.success ? null : result.error,
        type: 'immediate'
      };

      setPublications(prev => [newPublication, ...prev]);
      
      if (result.success) {
        // Reset form si todo salió bien
        setPostData({
          title: '',
          message: '',
          imageUrl: '',
          link: ''
        });
        alert('✅ ¡Publicación realizada exitosamente en Facebook!');
      } else {
        alert('❌ Error en la publicación: ' + result.error);
      }
      
    } catch (error) {
      const newPublication = {
        id: Date.now(),
        title: postData.title,
        message: postData.message,
        imageUrl: postData.imageUrl,
        link: postData.link,
        status: 'error',
        publishedAt: new Date().toLocaleString(),
        error: `Error de conexión: ${error.message}`,
        type: 'immediate'
      };

      setPublications(prev => [newPublication, ...prev]);
      alert('❌ Error de conexión: ' + error.message);
    } finally {
      setIsPublishing(false);
    }
  };

  // Publicación programada
  const handleScheduleSubmit = async () => {
    if (!scheduleData.message.trim() || !scheduleData.scheduleDate) {
      alert('El mensaje y la fecha de programación son requeridos');
      return;
    }

    setIsScheduling(true);

    try {
      const response = await fetch('http://localhost:3000/api/facebook/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: scheduleData.title,
          message: scheduleData.message,
          imageUrl: scheduleData.imageUrl,
          link: scheduleData.link,
          scheduleDate: scheduleData.scheduleDate
        })
      });

      const result = await response.json();

      const newPublication = {
        id: Date.now(),
        title: scheduleData.title,
        message: scheduleData.message,
        imageUrl: scheduleData.imageUrl,
        link: scheduleData.link,
        status: result.success ? 'published' : 'error',
        publishedAt: new Date().toLocaleString(),
        scheduledFor: scheduleData.scheduleDate,
        zapierResponse: result.zapierResponse,
        error: result.success ? null : result.error,
        type: 'scheduled'
      };

      setPublications(prev => [newPublication, ...prev]);
      
      if (result.success) {
        // Reset form si todo salió bien
        setScheduleData({
          title: '',
          message: '',
          imageUrl: '',
          link: '',
          scheduleDate: ''
        });
        setShowScheduleForm(false);
        alert('✅ ¡Publicación programada enviada exitosamente!');
      } else {
        alert('❌ Error en la programación: ' + result.error);
      }
      
    } catch (error) {
      const newPublication = {
        id: Date.now(),
        title: scheduleData.title,
        message: scheduleData.message,
        imageUrl: scheduleData.imageUrl,
        link: scheduleData.link,
        status: 'error',
        publishedAt: new Date().toLocaleString(),
        scheduledFor: scheduleData.scheduleDate,
        error: `Error de conexión: ${error.message}`,
        type: 'scheduled'
      };

      setPublications(prev => [newPublication, ...prev]);
      alert('❌ Error de conexión: ' + error.message);
    } finally {
      setIsScheduling(false);
    }
  };

  return (
    <Container>
      <Title>Gestor de Publicaciones - Facebook</Title>
      {!showScheduleForm && (
        <FormSection>
          <SectionTitle>📝 Crear Nueva Publicación en Facebook</SectionTitle>
          <div>
            <FormGroup>
              <Label>Título del Post (opcional)</Label>
              <Input
                name="title"
                value={postData.title}
                onChange={handleInputChange}
                placeholder="Título o encabezado de tu publicación..."
              />
            </FormGroup>

            <FormGroup>
              <Label>Mensaje *</Label>
              <TextArea
                name="message"
                value={postData.message}
                onChange={handleInputChange}
                placeholder="Escribe el mensaje de tu publicación en Facebook..."
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>URL de Imagen (opcional)</Label>
              <Input
                type="url"
                name="imageUrl"
                value={postData.imageUrl}
                onChange={handleInputChange}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </FormGroup>

            <FormGroup>
              <Label>Enlace/Link (opcional)</Label>
              <Input
                type="url"
                name="link"
                value={postData.link}
                onChange={handleInputChange}
                placeholder="https://www.miwebsite.com"
              />
            </FormGroup>

            <Button onClick={handleSubmit} disabled={isPublishing}>
              {isPublishing && <LoadingSpinner />}
              {isPublishing ? 'Publicando...' : '🚀 Publicar Ahora en Facebook'}
            </Button>
          </div>
        </FormSection>
      )}

      {/* Formulario de publicación programada */}
      {showScheduleForm && (
        <FormSection>
          <SectionTitle>⏰ Programar Publicación en Facebook</SectionTitle>
          <div>
            <FormGroup>
              <Label>Título del Post (opcional)</Label>
              <Input
                name="title"
                value={scheduleData.title}
                onChange={handleScheduleInputChange}
                placeholder="Título o encabezado de tu publicación..."
              />
            </FormGroup>

            <FormGroup>
              <Label>Mensaje *</Label>
              <TextArea
                name="message"
                value={scheduleData.message}
                onChange={handleScheduleInputChange}
                placeholder="Escribe el mensaje de tu publicación en Facebook..."
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>URL de Imagen (opcional)</Label>
              <Input
                type="url"
                name="imageUrl"
                value={scheduleData.imageUrl}
                onChange={handleScheduleInputChange}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </FormGroup>

            <FormGroup>
              <Label>Enlace/Link (opcional)</Label>
              <Input
                type="url"
                name="link"
                value={scheduleData.link}
                onChange={handleScheduleInputChange}
                placeholder="https://www.miwebsite.com"
              />
            </FormGroup>

            <FormGroup>
              <Label>Fecha y Hora de Publicación *</Label>
              <Input
                type="datetime-local"
                name="scheduleDate"
                value={scheduleData.scheduleDate}
                onChange={handleScheduleInputChange}
                required
              />
            </FormGroup>

            <Button onClick={handleScheduleSubmit} disabled={isScheduling}>
              {isScheduling && <LoadingSpinner />}
              {isScheduling ? 'Programando...' : '📅 Programar Publicación'}
            </Button>
          </div>
        </FormSection>
      )}
    </Container>
  );
};

export default Redes;