import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from 'yup';
import { Box, Button, Grid, InputLabel, Paper, Switch, SwitchProps, Typography, styled } from "@mui/material";
import { useGetSiteSettingsQuery, useUpdateSiteSettingsMutation } from "../features/siteSlice";
import { useAuthUser } from "../../../auth/src/hooks/useAuth";
import { UserRole } from '../../../../../backend/src/utils/enums/user.utils';

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? theme.palette.error.main : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

const SiteSettings: React.FC = () => {
    const navigate = useNavigate();
    const goback = () => navigate(-1);
    const { role } = useAuthUser();
    const [isMaintainence, setIsMaintainence] = useState<boolean>();
    const [isUserRegistrationAllowed, setIsUserRegistrationAllowed] = useState<boolean>();
    const [isVendorRegistrationAllowed, setIsVendorRegistrationAllowed] = useState<boolean>();

    const { data, isLoading: isSettingsLoading } = useGetSiteSettingsQuery({});
    const [updateSettings, { isSuccess: isUpdateSuccess, isLoading, data:updateData }] = useUpdateSiteSettingsMutation();

    useEffect(() => {
        if(role !== UserRole.Admin){
            goback();
        }
    },[role]);

    useEffect(() => {
        if(!isSettingsLoading){
            const settings = data?.settings;
            setIsMaintainence(settings.isMaintainence);
            setIsUserRegistrationAllowed(settings.isUserRegistrationAllowed);
            setIsVendorRegistrationAllowed(settings.isVendorRegistrationAllowed);
        }
    }, [data, isSettingsLoading])

    useEffect(() => {
        if(isUpdateSuccess){
            navigate('/admin/site');
        }
    }, [isUpdateSuccess, navigate, updateData]);

    return (
        <>
            {(!isSettingsLoading && isMaintainence !== undefined) && (isUserRegistrationAllowed !== undefined && isVendorRegistrationAllowed !== undefined) && (
            <Formik
                initialValues={{
                    isMaintainence,
                    isUserRegistrationAllowed,
                    isVendorRegistrationAllowed,
                }}

                validationSchema={
                    Yup.object().shape({
                        isMaintainence: Yup.boolean(),
                        isUserRegistrationAllowed: Yup.boolean(),
                        isVendorRegistrationAllowed: Yup.boolean()
                    })
                }

                onSubmit={async (values, { setStatus, setSubmitting }) => {
                    try {
                        console.log(values)
                        await updateSettings(values).unwrap();                          
                        setStatus({ success: true });
                        setSubmitting(false);
                    } catch (err: any) {
                        // const message = err.data.message;
                        // toast.error(message);
                        setStatus({ success: false });
                        setSubmitting(false);
                    }
                }}
            >
                {({
                    handleChange,
                    handleSubmit,
                    handleBlur,
                    values
                }) => (
                    <Box component='section'>
                        <Typography variant="h1" fontSize="1.3rem" fontWeight="bold" sx={{ my: 2 }}>Site Settings</Typography>

                        <Paper sx={{ padding: 4 }}>
                            <Box component='form' noValidate autoComplete="off" onSubmit={handleSubmit}>
                                {isSettingsLoading ? (
                                    <div>Loading...</div>
                                ) : (
                                    <Grid container spacing={2}>
                                        <Grid item md={12}>
                                            <Box mb={2}>
                                                <InputLabel htmlFor='site-maintainence' sx={{ mb: .5 }}>Maintainence</InputLabel>
                                                <IOSSwitch 
                                                    id='site-maintainence'
                                                    name="isMaintainence"  
                                                    checked={values.isMaintainence}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                />
                                                <div>{values.isMaintainence ? 'true' : 'false'}</div>
                                            </Box>

                                            <Box mb={2}>
                                                <InputLabel htmlFor='enable-user-registration' sx={{ mb: .5 }}>User Registration Enabled</InputLabel>
                                                <IOSSwitch
                                                    id="enable-user-registration" 
                                                    name="isUserRegistrationAllowed"  
                                                    checked={values.isUserRegistrationAllowed}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                />
                                                <div>{values.isUserRegistrationAllowed ? 'true' : 'false'}</div>
                                            </Box>

                                            <Box mb={2}>
                                                <InputLabel htmlFor='vendor-registration-enabled' sx={{ mb: .5 }}>Vendor Registration Enabled</InputLabel>
                                                <IOSSwitch 
                                                    id='vendor-registration-enabled'
                                                    name="isVendorRegistrationAllowed"  
                                                    checked={values.isVendorRegistrationAllowed}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                />
                                                <div>{values.isVendorRegistrationAllowed ? 'true' : 'false'}</div>
                                            </Box>

                                            <Button variant="contained" type="submit">
                                                Save Changes
                                                {isLoading ? 'Loading' : ''}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                )}
                            </Box>
                        </Paper>
                    </Box>
                )}
            </Formik>
            )}
        </>
    )
}

export default SiteSettings;