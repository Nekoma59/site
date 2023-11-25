import React from 'react';
import { motion } from 'framer-motion';

// Import Global Styles
import {
    PaddingContainer,
    Heading,
    GreenText,
    FlexContainer,
    Button,
} from '../../styles/Global.styled';

// Import Footer Styles
import {
    ContactForm,
    FormLabel,
    FormInput,
} from '../../styles/Footer.styled';

import { fadeInBottomVariant } from '../../utils/Variants';

const Footer = () => {
    return (
        <PaddingContainer
            id="Contact"
            top="5%"
            bottom="10%"
        >

            <Heading
                as={motion.h4}
                variants={fadeInBottomVariant}
                initial="hidden"
                whileInView="visible"
                size="h4"
                align="center"
            >
                
            </Heading>

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
                <FlexContainer justify="center">

                    <ContactForm
                        as={motion.form}
                        variants={fadeInBottomVariant}
                        initial="hidden"
                        whileInView="visible"
                    >
                        <PaddingContainer bottom="2rem">
                            <FormLabel>Name :</FormLabel>
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

                        <FlexContainer justify="center"
                            responsiveFlex
                        >
                            <Button>Envoyer</Button>
                        </FlexContainer>
                    </ContactForm>

                </FlexContainer>
            </PaddingContainer>
        </PaddingContainer>
    )
}

export default Footer