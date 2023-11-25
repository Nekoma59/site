import styled from "styled-components";

export const SkillsCardContainer = styled.div`
display: grid;
grid-template-columns: repeat(4, 1fr); /* 4 colonnes égales */
grid-gap: 1rem;
padding: 0 5%;

@media(max-width: ${({ theme }) => theme.breakpoints.mobile}){
display: block;
padding: 0;
}
`

export const SkillsCard = styled.div`
width: 100%; /* Largeur de la carte à 100% pour remplir la colonne */
border: 1px solid #fff;
padding: 1rem 0;
border-radius: 1rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: ${({ theme }) => theme.colors.primary_light};

@media(max-width: ${({ theme }) => theme.breakpoints.mobile}){
margin-top: 2rem;
}
`
