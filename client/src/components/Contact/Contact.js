// Dans votre composant Contact.js

import React from 'react';
import { motion } from 'framer-motion';
import { PaddingContainer, Heading, GreenText, FlexContainer, Button } from '../../styles/Global.styled';
import { ContactForm, FormLabel, FormInput, ContactInfo, ContactInfoLine } from '../../styles/Footer.styled';
import { fadeInBottomVariant } from '../../utils/Variants';

const Footer = () => {
  return (
    <PaddingContainer id="Contact" top="5%" bottom="10%">
      <Heading
        as={motion.h4}
        variants={fadeInBottomVariant}
        initial="hidden"
        whileInView="visible"
        size="h4"
        align="center"
      ></Heading>
      <Heading
        as={motion.h2}
        variants={fadeInBottomVariant}
        initial="hidden"
        whileInView="visible"
        size="h2"
        align="center"
        top="0.5rem"
      >
        Nous <GreenText>Contacter</GreenText>
      </Heading>
      <PaddingContainer top="3rem">
        <FlexContainer direction="column" justify="center" align="center">
          <ContactForm
            as={motion.form}
            variants={fadeInBottomVariant}
            initial="hidden"
            whileInView="visible"
          >
            <PaddingContainer bottom="2rem">
              <FormLabel>Nom :</FormLabel>
              <FormInput
                type="text"
                placeholder="Entrer votre nom"
              />
            </PaddingContainer>
            <PaddingContainer bottom="2rem">
              <FormLabel>Email :</FormLabel>
              <FormInput
                type="email"
                placeholder="Entrer votre email"
              />
            </PaddingContainer>
            <PaddingContainer bottom="2rem">
              <FormLabel>Message :</FormLabel>
              <FormInput
                as="textarea"
                placeholder="Entrer votre message"
              />
            </PaddingContainer>
            <FlexContainer justify="center" responsiveFlex>
              <Button>Envoyer</Button>
            </FlexContainer>
          </ContactForm>
          <ContactInfo>
            <ContactInfoLine>
              <p><strong>09.72.92.69.30</strong></p>
            </ContactInfoLine>
            <ContactInfoLine>
              <p><strong>28 Rue Tillet, 60180 Nogent-sur-Oise</strong></p>
            </ContactInfoLine>
          </ContactInfo>
        </FlexContainer>
      </PaddingContainer>
    </PaddingContainer>
  );
}

export default Footer;
