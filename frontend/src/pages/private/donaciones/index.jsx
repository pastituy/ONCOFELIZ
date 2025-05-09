import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { FaRegFilePdf } from "react-icons/fa6";
import Table from "../../../components/ui/table";
import toast from "react-hot-toast";
import dayjs from "dayjs";

const Donaciones = () => {
  const [donaciones, setDonaciones] = useState([]);
  const [totalMes, setTotalMes] = useState(0);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/donaciones");
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.mensaje || "Error al obtener donaciones");
        return;
      }

      setDonaciones(data.data);

      // Calcular total del mes
      const mesActual = new Date().getMonth();
      const total = data.data.reduce((acc, don) => {
        const fecha = new Date(don.fecha);
        const cantidad = parseFloat(don.cantidad);
        return fecha.getMonth() === mesActual ? acc + cantidad : acc;
      }, 0);

      setTotalMes(total);
    } catch (error) {
      toast.error("Hubo un problema al obtener las donaciones");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const exportToExcel = () => {
    alert("Exportando donaciones a Excel...");
  };

  const exportToPDF = () => {
    alert("Exportando donaciones a PDF...");
  };

  const columns = [
    { header: "Nombre del Donante", acceso: "nombreDonante" },
    { header: "Cantidad", acceso: "cantidad" },
    { header: "Método de Pago", acceso: "metodoPago" },
    {
      header: "Fecha",
      acceso: "fecha",
      render: (row) => dayjs(row.fecha).format("DD/MM/YYYY"),
    },
  ];

  return (
    <Container>
      <TopSection>
        <TotalBox>
          <h3>Total Donado en el Mes</h3>
          <Total>{totalMes.toFixed(2)} Bs</Total>
        </TotalBox>
        <Actions>
          <ButtonExcel onClick={exportToExcel}>
            <PiMicrosoftExcelLogoFill color="#2ba84a" style={{ fontSize: "1.4rem" }} />
            Excel
          </ButtonExcel>
          <ButtonPDF onClick={exportToPDF}>
            <FaRegFilePdf color="#f25c54" style={{ fontSize: "1rem" }} />
            PDF
          </ButtonPDF>
        </Actions>
      </TopSection>

      <Table columns={columns} data={donaciones} />
    </Container>
  );
};

export default Donaciones;


const Container = styled.div`
  padding: 20px;
`;

const TotalBox = styled.div`
  background: #f0f0f0;
  padding: 1rem 2rem;
  border-radius: 12px;
  box-shadow: 0 0 10px #ddd;
`;

const Total = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #3c3c3c;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
`;
const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  font-size: 1rem;
  outline: none;
  background-color: #fff;
  color: #333;
  transition: border 0.3s ease;

  &:focus {
    border-color: #007bff;
  }
`;

const DateFile = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: row;
`;

const LoginButton = styled.button`
  width: 100px;
  height: 35px;
  background-color: ${(props) => props.theme?.colors?.primary || "#FF6347"};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.5;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 0.9;
  }
`;

const ButtonExcel = styled.button`
  width: 70px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  font-weight: 600;
  cursor: pointer;
  color: #595959;
  transition: 0.5s;
  &:hover {
    color: rgba(43, 168, 74, 0.63);
  }
`;

const ButtonPDF = styled.button`
  width: 70px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  color: #595959;
  transition: 0.5s;
  &:hover {
    color: rgba(242, 92, 84, 0.63);
  }
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #e0e0e0;

  h2 {
    margin: 0;
    font-size: 18px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #777;

  &:hover {
    color: #333;
  }
`;

const ModalContent = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;


const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 14px;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme?.colors?.primary || "#FF6347"};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`;

const CancelButton = styled.button`
  padding: 8px 15px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const SubmitButton = styled.button`
  padding: 8px 15px;
  border: none;
  background-color: ${(props) => props.theme?.colors?.primary || "#FF6347"};
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    opacity: 0.9;
  }
`;