import React from "react";
import styled, { keyframes } from "styled-components";
import { MdDeleteOutline } from "react-icons/md";
import { LuPencilLine } from "react-icons/lu";

const Table = ({ columns, data, onDelete, onEdit }) => {
  return (
    <StyledTable>
      <TableHead>
        <HeaderRow>
          <HeaderCell>Nro</HeaderCell>
          {columns?.map((colum, i) => (
            <HeaderCell key={i}>{colum.header}</HeaderCell>
          ))}
          {onEdit ? (
            <>
              <HeaderCell>Editar</HeaderCell>
            </>
          ) : (
            <></>
          )}
          {onDelete ? (
            <>
              <HeaderCell>Eliminar</HeaderCell>
            </>
          ) : (
            <></>
          )}
        </HeaderRow>
      </TableHead>
      <TableBody>
        {data?.length > 0 ? (
          data.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              {columns?.map((colum, j) => (
                <TableCell key={j}>
                  {colum.render ? colum.render(item) : item[colum.acceso]}
                </TableCell>
              ))}
              {onEdit ? (
                <>
                  <TableCell>
                    <EditButton onClick={() => onEdit(item)}>
                      <LuPencilLine size={16} />
                    </EditButton>
                  </TableCell>
                </>
              ) : onDelete ? (
                <>
                  <TableCell>
                    <DeleteButton onClick={() => onDelete(item.id)}>
                      <MdDeleteOutline size={16} />
                    </DeleteButton>
                  </TableCell>
                </>
              ) : (
                <></>
              )}
              {onDelete ? (
                <>
                  <TableCell>
                    <DeleteButton onClick={() => onDelete(item.id)}>
                      <MdDeleteOutline size={16} />
                    </DeleteButton>
                  </TableCell>
                </>
              ) : (
                <></>
              )}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns?.length + 3}>
              <EmptyState>No hay datos disponibles</EmptyState>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </StyledTable>
  );
};

export default Table;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: inherit;
  animation: ${fadeIn} 0.5s ease-in-out;
  background: #fff;
  margin: 1rem 0;
`;

const TableHead = styled.thead`
  background-color: ${(props) => props.theme?.colors?.primary || "#FF6347"};
  color: white;
`;

const HeaderRow = styled.tr`
  height: 45px;
`;

const HeaderCell = styled.th`
  padding: 12px 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  font-size: 14px;
  text-align: left;
`;

const TableBody = styled.tbody`
  background-color: #f8f9fa;
`;

const TableRow = styled.tr`
  transition: all 0.2s ease;
  border-bottom: 1px solid #e0e0e0;

  &:nth-child(even) {
    background-color: #f0f4f8;
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;

const TableCell = styled.td`
  padding: 12px 16px;
  font-size: 14px;
  color: #333;

  &:first-child {
    font-weight: 600;
    text-align: center;
    width: 60px;
    background-color: ${(props) => props.theme?.colors?.primary || "#FF6347"};
    color: white;
  }
`;

const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const EditButton = styled(ActionButton)`
  color: #007bff;

  &:hover {
    background-color: rgba(0, 123, 255, 0.1);
  }
`;

const DeleteButton = styled(ActionButton)`
  color: ${(props) => props.theme?.colors?.primary || "#FF6347"};

  &:hover {
    background-color: rgba(255, 99, 71, 0.1);
  }
`;

const EmptyState = styled.div`
  padding: 20px;
  text-align: center;
  color: #999;
  font-style: italic;
`;
