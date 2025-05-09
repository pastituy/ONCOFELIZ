import React from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrash, FaCalendarAlt, FaExclamationCircle } from 'react-icons/fa';
import { formatDistanceToNow, isPast, parseISO, format } from 'date-fns';
import { es } from 'date-fns/locale';

const TreatmentTable = ({ data, onEdit, onDelete }) => {
  if (!data || data.length === 0) {
    return (
      <EmptyState>
        <FaExclamationCircle size={50} color="#ccc" />
        <h3>No hay tratamientos registrados</h3>
        <p>Agrega un nuevo tratamiento haciendo click en el botón "Agregar"</p>
      </EmptyState>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "No definida";
    try {
      return format(parseISO(dateString), "dd/MM/yyyy", { locale: es });
    } catch (error) {
      return dateString;
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "No definida";
    try {
      return format(parseISO(dateString), "dd/MM/yyyy HH:mm", { locale: es });
    } catch (error) {
      return dateString;
    }
  };

  const getTimeRemaining = (dateString) => {
    if (!dateString) return { isPast: true, text: "No programada" };
    try {
      const date = parseISO(dateString);
      const past = isPast(date);
      
      const timeText = formatDistanceToNow(date, { 
        addSuffix: true,
        locale: es
      });
      
      return { isPast: past, text: timeText };
    } catch (error) {
      return { isPast: true, text: "Fecha inválida" };
    }
  };

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Telefono padre</th>
            <th>Descripción</th>
            <th>Fecha Inicio</th>
            <th>Estado</th>
            <th>Próxima Cita</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((treatment) => {
            const nextAppointment = getTimeRemaining(treatment.siguienteCita);
            
            return (
              <tr key={treatment.id}>
                <td>
                  <TreatmentType>{treatment.paciente.nombre}</TreatmentType>
                </td>
                <td>
                  <Description>{treatment.paciente.padre.telefono}</Description>
                </td>
                <td>
                  <Description>{treatment.descripcion}</Description>
                </td>
                <td>
                  <DateValue>{formatDate(treatment.fecha)}</DateValue>
                </td>
                <td>
                  <StatusBadge active={treatment.estado}>
                    {treatment.estado ? 'Activo' : 'Inactivo'}
                  </StatusBadge>
                </td>
                <td>
                  <AppointmentInfo isPast={nextAppointment.isPast}>
                    <FaCalendarAlt />
                    <span>
                      {formatDateTime(treatment.siguienteCita)}
                      <TimeRemaining>{nextAppointment.text}</TimeRemaining>
                    </span>
                  </AppointmentInfo>
                </td>
                <td>
                  <ActionButtons>
                    <ActionButton 
                      onClick={() => onEdit(treatment)}
                      color="#4A90E2"
                      title="Editar"
                    >
                      <FaEdit />
                    </ActionButton>
                    <ActionButton 
                      onClick={() => onDelete(treatment.id)}
                      color="#E25C5C"
                      title="Eliminar"
                    >
                      <FaTrash />
                    </ActionButton>
                  </ActionButtons>
                </td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default TreatmentTable;

const TableContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  overflow: auto;
  margin-bottom: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #f0f0f0;
  }
  
  th {
    background-color: #f9f9f9;
    color: #555;
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  tr:hover {
    background-color: #f8f9ff;
  }
  
  @media (max-width: 768px) {
    th, td {
      padding: 10px;
      font-size: 14px;
    }
  }
`;

const TreatmentType = styled.div`
  font-weight: 600;
  color: #2c3e50;
`;

const Description = styled.div`
  color: #555;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`;

const DateValue = styled.div`
  color: #555;
  font-size: 14px;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background-color: ${props => props.active ? '#5CB85C' : '#999'};
`;

const AppointmentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${props => props.isPast ? '#E25C5C' : '#555'};
  
  svg {
    color: ${props => props.isPast ? '#E25C5C' : '#5CB85C'};
  }
  
  span {
    display: flex;
    flex-direction: column;
    font-size: 14px;
  }
`;

const TimeRemaining = styled.small`
  font-style: italic;
  opacity: 0.8;
  margin-top: 2px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: none;
  background-color: ${props => props.color}15;
  color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.color}30;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  
  h3 {
    margin: 15px 0 5px;
    color: #555;
  }
  
  p {
    color: #888;
    text-align: center;
  }
`;