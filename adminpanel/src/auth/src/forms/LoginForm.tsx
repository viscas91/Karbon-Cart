import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../common/src/store";
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from "../features/authApiSlice";

import { Grid, Stack, InputLabel, OutlinedInput, FormHelperText, InputAdornment, IconButton, Box, Typography, Link, Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { logIn } from "../features/authSlice";

const LoginForm = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const location = useLocation();

	const from = location.state?.from?.pathname || "/admin";

	const [showPassword, setShowPassword] = useState(false);

	const handleShowHidePassword = () => {
		setShowPassword(!showPassword);
	}

	const handleMouseDownPassword = (event: React.MouseEvent) => {
		event.preventDefault();
	}

	const [loginUser, { data, isLoading, isSuccess }] = useLoginUserMutation();


	useEffect(() => {
		if (isSuccess) {
			navigate(from, { replace: true });
		}
	}, [data, isSuccess, navigate, from]);

	return (
		<>
			<Formik
				initialValues={{
					email: '',
					password: '',
					submit: null
				}}

				validationSchema={Yup.object().shape({
					email: Yup.string()
						.email("Must be a valid email")
						.max(255)
						.required("Email is required"),
					password: Yup.string()
						.max(255)
						.required("Password is required"),
				})}

				onSubmit={async (values, { setStatus, setSubmitting }) => {
					try {
						const getUserCredentials = await loginUser(
							values
						).unwrap();
						dispatch(logIn({ ...getUserCredentials }));
						setStatus({ success: true });
						setSubmitting(false);
					} catch (err: any) {
						// const message = err.data.message;
						console.log(err)
						// toast.error(message);
						setStatus({ success: false });
						setSubmitting(false);
					}
				}}
			>
				{({
					errors,
					handleBlur,
					handleChange,
					handleSubmit,
					isSubmitting,
					touched,
					values,
				}) => (
					<Box component='section' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
						<Typography variant="h1" fontWeight="bold" sx={{ mb: 4 }}>Login</Typography>
						<Box component='form' noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ width: '30rem' }}>
							{isLoading ? (
								<div>Loading...</div>
							) : (<Grid container spacing={3}>
								{/* Email */}
								<Grid item xs={12}>
									<Stack spacing={1}>
										<InputLabel htmlFor="email-signup">
											Email Address*
										</InputLabel>
										<OutlinedInput
											id="email-signup"
											value={values.email}
											name="email"
											onBlur={handleBlur}
											onChange={handleChange}
											placeholder="email@example.com"
											inputProps={{}}
											fullWidth
											error={Boolean(
												touched.email && errors.email
											)}
										/>
										{touched.email && errors.email && (
											<FormHelperText
												error
												id="helper-text-email-signup"
											>
												{errors.email}
											</FormHelperText>
										)}
									</Stack>
								</Grid>
								{/* password */}
								<Grid item xs={12}>
									<Stack spacing={1}>
										<InputLabel htmlFor="password-signup">
											Password
										</InputLabel>
										<OutlinedInput
											fullWidth
											error={Boolean(
												touched.password &&
												errors.password
											)}
											id="password-signup"
											type={
												showPassword
													? "text"
													: "password"
											}
											value={values.password}
											name="password"
											onBlur={handleBlur}
											onChange={(e) => {
												handleChange(e);
											}}
											endAdornment={
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visiblity"
														onClick={
															handleShowHidePassword
														}
														onMouseDown={
															handleMouseDownPassword
														}
														edge="end"
														size="large"
													>
														{showPassword ? (
															<Visibility />
														) : (
															<VisibilityOff />
														)}
													</IconButton>
												</InputAdornment>
											}
											placeholder="******"
											inputProps={{}}
										/>
										{touched.password &&
											errors.password && (
												<FormHelperText
													error
													id="helper-text-password-signup"
												>
													{errors.password}
												</FormHelperText>
											)}
									</Stack>
								</Grid>
								{/* forgot password */}
								<Grid item xs={12}>
									<Box
										sx={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<Typography variant="h6">
											Forgot Password?{" "}
											<Link
												variant="h6"
												component={RouterLink}
												to="/pcr"
												sx={{ textDecoration: "none" }}
											>
												Click Here to Reset it
											</Link>
										</Typography>
									</Box>
								</Grid>
								{/* Login Button */}
								<Grid item xs={12}>

									<Button
										disableElevation
										disabled={isSubmitting}
										fullWidth
										size="large"
										type="submit"
										variant="contained"
										color="secondary"
									>
										Login
									</Button>

								</Grid>
							</Grid>
							)}
						</Box>
					</Box>
				)}
			</Formik>
		</>
	)
}

export default LoginForm;