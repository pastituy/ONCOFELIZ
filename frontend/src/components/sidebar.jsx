import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { useUser } from "../context/userContext";
import toast from "react-hot-toast";
import { FaNewspaper } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import { FaMoneyBill } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { PiTreePalmThin } from "react-icons/pi";
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useUser();
  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Salio del sistema");
  };
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <SidebarContainer collapsed={collapsed}>
      <LogoContainer>
        <LogoWrapper>
          <LogoText collapsed={collapsed}>OF</LogoText>
        </LogoWrapper>
        {!collapsed && <BrandName>OncoFeliz</BrandName>}
      </LogoContainer>

      <NavMenu>
        <NavItem
          active={isActive("/dasboard/eventos")}
          onClick={() => handleNavigation("/dasboard/eventos")}
        >
          <NavIconWrapper active={isActive("/dasboard/eventos")}>
            <EventIcon />
          </NavIconWrapper>
          {!collapsed && <NavText>Eventos</NavText>}
          {!collapsed && isActive("/dasboard/eventos") && <ActiveIndicator />}
        </NavItem>

        <NavItem
          active={isActive("/dasboard/campana")}
          onClick={() => handleNavigation("/dasboard/campana")}
        >
          <NavIconWrapper active={isActive("/dasboard/campana")}>
            <CampaignIcon />
          </NavIconWrapper>
          {!collapsed && <NavText>Campañas</NavText>}
          {!collapsed && isActive("/dasboard/campana") && <ActiveIndicator />}
        </NavItem>
        <NavItem
          active={isActive("/dasboard/noticias")}
          onClick={() => handleNavigation("/dasboard/noticias")}
        >
          <NavIconWrapper active={isActive("/dasboard/noticias")}>
            <FaNewspaper />
          </NavIconWrapper>
          {!collapsed && <NavText>Noticias</NavText>}
          {!collapsed && isActive("/dasboard/noticias") && <ActiveIndicator />}
        </NavItem>
        <NavItem
          active={isActive("/dasboard/usuario")}
          onClick={() => handleNavigation("/dasboard/usuario")}
        >
          <NavIconWrapper active={isActive("/dasboard/usuario")}>
            <FaUserPlus />
          </NavIconWrapper>
          {!collapsed && <NavText>Usuario</NavText>}
          {!collapsed && isActive("/dasboard/usuario") && <ActiveIndicator />}
        </NavItem>
        <NavItem
          active={isActive("/dasboard/donaciones")}
          onClick={() => handleNavigation("/dasboard/donaciones")}
        >
          <NavIconWrapper active={isActive("/dasboard/donaciones")}>
            <FaMoneyBill />
          </NavIconWrapper>
          {!collapsed && <NavText>Donaciones</NavText>}
          {!collapsed && isActive("/dasboard/donaciones") && <ActiveIndicator />}
        </NavItem>
        <NavItem
          active={isActive("/dasboard/paciente")}
          onClick={() => handleNavigation("/dasboard/paciente")}
        >
          <NavIconWrapper active={isActive("/dasboard/paciente")}>
            <FaUserAlt />
          </NavIconWrapper>
          {!collapsed && <NavText>Pacientes</NavText>}
          {!collapsed && isActive("/dasboard/paciente") && <ActiveIndicator />}
        </NavItem>
        <NavItem
          active={isActive("/dasboard/tratamiento")}
          onClick={() => handleNavigation("/dasboard/tratamiento")}
        >
          <NavIconWrapper active={isActive("/dasboard/tratamiento")}>
            <PiTreePalmThin />
          </NavIconWrapper>
          {!collapsed && <NavText>Tratamiento</NavText>}
          {!collapsed && isActive("/dasboard/tratamiento") && <ActiveIndicator />}
        </NavItem>
        <NavItem
          active={isActive("/dasboard/donaciones-campana")}
          onClick={() => handleNavigation("/dasboard/donaciones-campana")}
        >
          <NavIconWrapper active={isActive("/dasboard/donaciones-campana")}>
            <FaMoneyBill />
          </NavIconWrapper>
          {!collapsed && <NavText>Recuperados</NavText>}
          {!collapsed && isActive("/dasboard/donaciones-campana") && <ActiveIndicator />}
        </NavItem>
        <NavItem
          active={isActive("/dasboard/chat")}
          onClick={() => handleNavigation("/dasboard/chat")}
        >
          <NavIconWrapper active={isActive("/dasboard/chat")}>
            <FaMoneyBill />
          </NavIconWrapper>
          {!collapsed && <NavText>Chat</NavText>}
          {!collapsed && isActive("/dasboard/chat") && <ActiveIndicator />}
        </NavItem>
      </NavMenu>

      <UserSection onClick={handleLogout}>
        <UserAvatar>
          <HiOutlineLogout
            color="#FF6347"
            style={{
              fontSize: "1.5rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </UserAvatar>
        <UserInfo>
          <UserName>Salir</UserName>
        </UserInfo>
      </UserSection>
    </SidebarContainer>
  );
};

export default Sidebar;

const EventIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 2V6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 2V6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 10H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 14H8.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 14H12.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 14H16.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 18H8.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 18H12.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 18H16.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CampaignIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background: linear-gradient(180deg, #ffffff 0%, #f9fafc 100%);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;

  left: 0;
  top: 0;
  z-index: 100;
  overflow-x: hidden;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem 1.5rem;
  margin-bottom: 1rem;
`;

const LogoWrapper = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme?.colors?.primary || "#FF6347"} 0%,
    #ff8a70 100%
  );
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(255, 99, 71, 0.3);
  margin-right: 16px;
`;

const LogoText = styled.h2`
  color: white;
  font-weight: bold;
  font-size: 16px;
  margin: 0;
  letter-spacing: 1px;
`;

const BrandName = styled.h2`
  font-size: 1.25rem;
  color: #2d3748;
  font-weight: 700;
  margin: 0;
  letter-spacing: -0.5px;
`;

const NavMenu = styled.ul`
  list-style: none;
  padding: 0 1rem;
  margin: 1rem 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  padding: ${(props) => (props.active ? "8px 10px" : "8px 10px")};
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 12px;
  position: relative;
  background-color: ${(props) =>
    props.active ? "rgba(255, 99, 71, 0.1)" : "transparent"};

  &:hover {
    background-color: ${(props) =>
      props.active ? "rgba(255, 99, 71, 0.15)" : "rgba(0, 0, 0, 0.03)"};
  }
`;

const NavIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.active ? "white" : "transparent")};
  box-shadow: ${(props) =>
    props.active ? "0 4px 8px rgba(0, 0, 0, 0.05)" : "none"};
  margin-right: 16px;
  color: ${(props) =>
    props.active ? props.theme?.colors?.primary || "#FF6347" : "#718096"};
  transition: all 0.2s ease;
`;

const NavText = styled.span`
  font-size: 0.9rem;
  color: #4a5568;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ActiveIndicator = styled.div`
  position: absolute;
  right: 16px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => props.theme?.colors?.primary || "#FF6347"};
`;

const UserSection = styled.button`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  background-color: rgba(249, 250, 252, 0.8);
  margin: 1rem;
  border-radius: 12px;
  cursor: pointer;
  background: transparent;
  height: 20px;
  border: none;
  &:hover {
    background: linear-gradient(
      135deg,
      ${(props) => props.theme?.colors?.primary || "#FF6347"}20 0%,
      ${(props) => props.theme?.colors?.primary || "#FF6347"}40 100%
    );
  }
`;

const UserAvatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #2d3748;
`;

const UserRole = styled.span`
  font-size: 0.8rem;
  color: #718096;
`;
