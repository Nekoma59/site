import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FlexContainer, PaddingContainer, Container, GreenText } from '../../styles/Global.styled';
import { NavbarContainer, Logo, MenuIcon } from '../../styles/Navbar.styled';
import { GiHamburgerMenu } from 'react-icons/gi';
import { theme } from "../../utils/Theme";
import NavMenu from '../layouts/NavMenu';

// Import your logo image
import logoImage from '../../assets/header.png';

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [sticky, setSticky] = useState(false);

    useEffect(() => {
        // OnScroll
        const onScroll = () => {
            window.pageYOffset > 50 ? setSticky(true) : setSticky(false);
        }

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [])

    // Fonction pour faire remonter la page en haut
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Pour une animation de défilement en douceur
        });
    };

    return (
        <NavbarContainer bgColor={sticky ? theme.colors.primary : 'transparent'}>
            <PaddingContainer
                top="1.2rem"
                bottom="1.2rem"
                responsiveLeft="1rem"
                responsiveRight="1rem"
            >
                <Container>
                    <FlexContainer justify="space-between" responsiveFlex>

                        {/* left-logo */}
                        <Logo onClick={scrollToTop}>
                            <img src={logoImage} alt="Header Logo" />
                        </Logo>

                        {/* right-menu-icon */}
                        <MenuIcon
                            as={motion.a}
                            whileHover={{ scale: 1.2 }}
                            onClick={() => { setOpenMenu(true) }}
                        >
                            <GiHamburgerMenu />
                        </MenuIcon>
                    </FlexContainer>
                </Container>

                <AnimatePresence>
                    {openMenu && <NavMenu setOpenMenu={setOpenMenu} />}
                </AnimatePresence>

            </PaddingContainer>
        </NavbarContainer>
    )
}

export default Navbar;
