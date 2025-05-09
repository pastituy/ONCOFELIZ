import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTimes, FaCheck, FaCreditCard, FaQrcode, FaPaypal, FaMoneyBillWave } from 'react-icons/fa';

const DonateModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nombreDonante: '',
    cantidad: '',
    metodoPago: '',
    descripcion: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const metodosDisponibles = [
    { id: 'tarjeta', nombre: 'Tarjeta de Crédito/Débito', icon: <FaCreditCard /> },
    { id: 'qr', nombre: 'Pago con QR', icon: <FaQrcode /> },
    { id: 'paypal', nombre: 'PayPal', icon: <FaPaypal /> },
    { id: 'transferencia', nombre: 'Transferencia Bancaria', icon: <FaMoneyBillWave /> }
  ];

  const cantidadesSugeridas = ['100', '200', '500', '1000'];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:3000/donaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Error al procesar la donación');
      }
      
      setSubmitted(true);
      setFormData({
        nombreDonante: '',
        cantidad: '',
        metodoPago: '',
        descripcion: ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const resetForm = () => {
    setSubmitted(false);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        
        {submitted ? (
          <SuccessContainer>
            <SuccessIcon>
              <FaCheck />
            </SuccessIcon>
            <SuccessTitle>¡Gracias por tu donación!</SuccessTitle>
            <SuccessMessage>
              Tu generosidad nos ayuda a seguir apoyando a niños con cáncer y sus familias.
            </SuccessMessage>
            <CloseSuccessButton onClick={resetForm}>Cerrar</CloseSuccessButton>
          </SuccessContainer>
        ) : (
          <>
            <ModalHeader>
              <ModalTitle>Haz tu donación</ModalTitle>
              <ModalSubtitle>
                Tu apoyo transforma vidas. Juntos podemos hacer la diferencia.
              </ModalSubtitle>
            </ModalHeader>
            
            <DonateForm onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="nombreDonante">Nombre</Label>
                <Input
                  type="text"
                  id="nombreDonante"
                  name="nombreDonante"
                  value={formData.nombreDonante}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Selecciona o ingresa una cantidad (BS)</Label>
                <AmountButtonsContainer>
                  {cantidadesSugeridas.map(cantidad => (
                    <AmountButton
                      key={cantidad}
                      type="button"
                      isSelected={formData.cantidad === cantidad}
                      onClick={() => setFormData(prev => ({ ...prev, cantidad }))}
                    >
                      {cantidad} Bs
                    </AmountButton>
                  ))}
                  <CustomAmountInput
                    type="number"
                    name="cantidad"
                    value={!cantidadesSugeridas.includes(formData.cantidad) ? formData.cantidad : ''}
                    onChange={handleChange}
                    placeholder="Otra cantidad"
                    min="1"
                  />
                </AmountButtonsContainer>
              </FormGroup>
              
              <FormGroup>
                <Label>Método de Pago</Label>
                <PaymentMethodsContainer>
                  {metodosDisponibles.map(metodo => (
                    <PaymentMethodButton
                      key={metodo.id}
                      type="button"
                      isSelected={formData.metodoPago === metodo.id}
                      onClick={() => setFormData(prev => ({ ...prev, metodoPago: metodo.id }))}
                    >
                      <PaymentIcon>{metodo.icon}</PaymentIcon>
                      <span>{metodo.nombre}</span>
                    </PaymentMethodButton>
                  ))}
                </PaymentMethodsContainer>
              </FormGroup>
              
              {formData.metodoPago === 'qr' && (
                <QRCodeContainer>
                  <QRCodeImage src="https://tse4.mm.bing.net/th/id/OIP.U1S5NpMGxCdvgw4EJcMuegHaHa?rs=1&pid=ImgDetMain" alt="Código QR para pago" />
                  <QRInstructions>
                    Escanea este código QR con tu aplicación bancaria para realizar tu donación.
                    Una vez realizado el pago, continúa con el formulario.
                  </QRInstructions>
                </QRCodeContainer>
              )}
              
              <FormGroup>
                <Label htmlFor="descripcion">Mensaje (opcional)</Label>
                <Textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  placeholder="Deja un mensaje de apoyo o indica el propósito de tu donación"
                  rows="3"
                />
              </FormGroup>
              
              {error && <ErrorMessage>{error}</ErrorMessage>}
              
              <SubmitButton 
                type="submit" 
                disabled={loading || !formData.nombreDonante || !formData.cantidad || !formData.metodoPago}
              >
                {loading ? 'Procesando...' : 'Completar Donación'}
              </SubmitButton>
              
              <SecurityNote>
                <strong>Donación segura:</strong> Toda la información proporcionada está protegida y encriptada.
              </SecurityNote>
            </DonateForm>
          </>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 650px;
  position: relative;
  overflow-y: auto;
  max-height: 90vh;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #777;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
    color: #333;
  }
`;

const ModalHeader = styled.div`
  padding: 30px 30px 20px;
  text-align: center;
  border-bottom: 1px solid #eaeaea;
`;

const ModalTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
`;

const ModalSubtitle = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.5;
`;

const DonateForm = styled.form`
  padding: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #444;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #ff6347;
  }
  
  &::placeholder {
    color: #aaa;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #ff6347;
  }
  
  &::placeholder {
    color: #aaa;
  }
`;

const AmountButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 12px;
  
  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const AmountButton = styled.button`
  padding: 12px;
  border: 1px solid ${props => props.isSelected ? '#ff6347' : '#ddd'};
  background-color: ${props => props.isSelected ? '#fff4f2' : 'white'};
  color: ${props => props.isSelected ? '#ff6347' : '#333'};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.isSelected ? '#fff4f2' : '#f9f9f9'};
  }
`;

const CustomAmountInput = styled.input`
  grid-column: span 4;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  
  @media (max-width: 500px) {
    grid-column: span 2;
  }
  
  &:focus {
    outline: none;
    border-color: #ff6347;
  }
  
  &::placeholder {
    color: #aaa;
  }
`;

const PaymentMethodsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const PaymentMethodButton = styled.button`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid ${props => props.isSelected ? '#ff6347' : '#ddd'};
  background-color: ${props => props.isSelected ? '#fff4f2' : 'white'};
  color: ${props => props.isSelected ? '#ff6347' : '#333'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.isSelected ? '#fff4f2' : '#f9f9f9'};
  }
`;

const PaymentIcon = styled.span`
  font-size: 20px;
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const QRCodeContainer = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const QRCodeImage = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 15px;
`;

const QRInstructions = styled.p`
  font-size: 14px;
  text-align: center;
  color: #666;
  line-height: 1.4;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: ${props => props.disabled ? '#cccccc' : '#ff6347'};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${props => props.disabled ? '#cccccc' : '#ff5233'};
  }
`;

const SecurityNote = styled.p`
  font-size: 12px;
  color: #777;
  text-align: center;
  margin-top: 16px;
`;

const ErrorMessage = styled.div`
  background-color: #ffeaea;
  color: #d32f2f;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
`;

const SuccessContainer = styled.div`
  padding: 40px 30px;
  text-align: center;
`;

const SuccessIcon = styled.div`
  width: 70px;
  height: 70px;
  background-color: #4caf50;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin: 0 auto 20px;
`;

const SuccessTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 15px;
`;

const SuccessMessage = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 25px;
`;

const CloseSuccessButton = styled.button`
  padding: 12px 30px;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #ff5233;
  }
`;

export default DonateModal;