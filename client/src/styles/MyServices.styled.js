import styled from "styled-components";

export const ServicesCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 colonnes égales par défaut */
  grid-gap: 1rem;
  padding: 0 5%;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(1, 1fr); /* 1 colonne pour les écrans plus petits */
    padding: 0;
  }
`;

export const ServicesCard = styled.div`
  width: 100%;
  border: 1px solid #fff;
  padding: 1rem 0;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary_light};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-top: 2rem;
  }
`;
