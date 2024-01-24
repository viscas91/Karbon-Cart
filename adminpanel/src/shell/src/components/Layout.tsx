import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Navbar from "../../../common/src/components/Navbar";
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import { Sidebar } from '../../../common/src/components/Sidebar';

const Layout: React.FC = () => {
    return (
        <>
            <Navbar />
            <Grid container sx={{ height: 'calc(100vh - 4rem)', marginTop: '4rem', backgroundColor: '#F6F9FC' }}>
                <Grid item xs={2}>
                    <Sidebar />
                </Grid>
                <Grid item xs={10}>
                    <Box component="main">
                        <Container>
                            <Outlet />
                        </Container>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default Layout;