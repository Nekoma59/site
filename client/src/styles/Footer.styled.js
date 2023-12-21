// Dans Footer.styled.js

import styled from 'styled-components';

export const ContactForm = styled.form`
  width: 60%;
  margin: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 90%;
  }
`;

export const FormLabel = styled.p`
  color: ${({ theme }) => theme.colors.para_text_color};
  padding-bottom: 10px;
`;

export const FormInput = styled.input`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary_light};
  border: 1px solid ${({ theme }) => theme.colors.para_text_color};
  color: ${({ theme }) => theme.colors.para_text_color};
  border-radius: 5px;
  padding: 15px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.para_text_color};
  }
`;

export const ContactInfo = styled.div`
  color: ${({ theme }) => theme.colors.para_text_color};
  font-size: 20px;
  text-align: center;
  margin-top: 100px; /* Ajoutez une marge supérieure pour déplacer le texte plus bas */
  margin-bottom: 20px;
`;

export const ContactInfoLine = styled.div`
  margin-bottom: 50px; /* Augmentez la marge entre les lignes d'informations */
`;

// ... Autres styles ...

