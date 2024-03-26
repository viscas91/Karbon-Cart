import { Outlet, useLocation } from 'react-router-dom';
import Navbar from "../../../common/src/components/Navbar";
import { styled } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { SideNav } from '../../../common/src/components/Sidebar';

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    [theme.breakpoints.up('lg')]: {
        paddingLeft: SIDE_NAV_WIDTH
    }
}));

const LayoutContainer = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%',
    padding: '2rem'
});

const Layout: React.FC = () => {
    const location = useLocation();
    const [openNav, setOpenNav] = useState(false);

    const handlePathnameChange = useCallback(
        () => {
            if (openNav) {
                setOpenNav(false);
            }
        },
        [openNav]
    );

    useEffect(
        () => {
            handlePathnameChange();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [location.pathname]
    );

    return (
        <>
            <Navbar onNavOpen={() => setOpenNav(true)} />
            <SideNav
                onClose={() => setOpenNav(false)}
                open={openNav}
            />
            <LayoutRoot>
                <LayoutContainer>
                    <Outlet />
                </LayoutContainer>
            </LayoutRoot>
        </>
    )
}

export default Layout;