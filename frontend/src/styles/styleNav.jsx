import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  background-color: transparent;
  position: absolute;
  width: 100%;
  z-index: 10;
`;

export const Logo = styled.div`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 2rem;
  font-weight: 700;
  
  span:first-child {
    color: ${props => props.theme.colors.dark};
  }
  
  span:last-child {
    color: ${props => props.theme.colors.primary};
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const NavItem = styled.a`
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.dark};
  text-decoration: none;
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

export const ContributeButton = styled.button`
  background-color: transparent;
  color: ${props => props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }
  
  span {
    font-size: 1.2rem;
  }
`;
