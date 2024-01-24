import SendIcon from "@mui/icons-material/Send";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
	Box,
	Button,
	Container,
	FormControl,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Stack,
	Typography,
} from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react";
// import { GrPowerReset } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import * as Yup from "yup";
// import Spinner from "../../../components/Spinner";
// import StyledDivider from "../../../components/StyledDivider";
// import useTitle from "../../../hooks/useTitle";
// import {
// 	strengthColor,
// 	strengthIndicator,
// } from "../../../utils/password-strength";
import { usePasswordResetRequestMutation } from "../features/authApiSlice";
import zxcvbn, { ZXCVBNResult } from "zxcvbn";
import { PasswordStrength, strengthColor } from "../forms/RegisterForm";
// import AuthWrapper from "../forms/AuthWrapper";

export const PasswordResetPage = () => {
	// useTitle("Request Reset Password");
	const navigate = useNavigate();

	// level state will help manage the color to display when passwordConfirm field is  changed
	const [level, setLevel] = useState<PasswordStrength>();

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleShowHidePassword = () => {
		setShowPassword(!showPassword);
	};

	const handleShowHideConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	// prevent default behavior when a mouse is pressed when the pointer is inside the passwordConfirm field
	const handleMouseDownPassword = (event: React.MouseEvent) => {
		event.preventDefault();
	};

	// when the password is typed/changed run this function to show the password strength
	const changePassword = (value: string) => {
		const temp: ZXCVBNResult = zxcvbn(value);
        const score: number = temp.score;
		const color: PasswordStrength = strengthColor(score);
        setLevel(color);
	};
    
	useEffect(() => {
		changePassword("");
	}, []);

	const [resetPassword, { data, isLoading, isSuccess }] =
		usePasswordResetRequestMutation();

	useEffect(() => {
		if (isSuccess) {
			navigate("/login");
			// const message = data.message;
			// toast.success(message);
		}
	}, [data, isSuccess, navigate]);

	return (
		<>
			<Formik
				initialValues={{ password: "", passwordConfirm: "" }}
				validationSchema={Yup.object().shape({
					password: Yup.string()
						.max(255)
						.required("Password is required"),
					passwordConfirm: Yup.string()
						// reference the password field and check if passwords match
						.oneOf([Yup.ref("password")], "Passwords Must Match")
						.required("Please confirm your password"),
				})}
				onSubmit={async (values, { setStatus, setSubmitting }) => {
					try {
						await resetPassword(values).unwrap();
						setStatus({ success: true });
						setSubmitting(false);
					} catch (err) {
						// const message = err.data.message;
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
						<Container
							component="main"
							maxWidth="sm"
							sx={{
								border: "2px solid  #e4e5e7",
								borderRadius: "25px",
								py: 2,
							}}
						>
							<form
								noValidate
								autoComplete="off"
								onSubmit={handleSubmit}
							>
								<Grid>
									<Grid item xs={12}>
										<Box
											sx={{
												display: "flex",
												flexDirection: "row",
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											{" "}
											{/* <GrPowerReset className="auth-svg" /> */}
											<Typography variant="h2">
												Reset Password?
											</Typography>
										</Box>
										{/* <StyledDivider /> */}
									</Grid>
									<Box
										sx={{
											display: "flex",
											flexDirection: "row",
											justifyContent: "center",
											alignItems: "center",
											marginBottom: "20px",
										}}
									>
										<Typography
											variant="body1"
											component="div"
										>
											Enter your new password to finish
											the reset process
										</Typography>
									</Box>
								</Grid>
								{isLoading ? (
									<div>Loading...</div>
								) : (
									<Grid container>
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
														changePassword(
															e.target.value
														);
													}}
													endAdornment={
														<InputAdornment position="end">
															<IconButton
																aria-label="toggle password visibility"
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
											{/* password strength indicator */}
											<FormControl
												fullWidth
												sx={{ mt: 2 }}
											>
												<Grid
													container
													spacing={2}
													alignItems="center"
												>
													<Grid item>
														<Box
															sx={{
																bgcolor:
																	level?.color,
																width: 350,
																height: 8,
																borderRadius:
																	"7px",
															}}
														/>
													</Grid>
													<Grid item>
														<Typography
															variant="subtitle1"
															fontSize="0.75rem"
														>
															{level?.label}
														</Typography>
													</Grid>
												</Grid>
											</FormControl>
										</Grid>

										{/* passwordConfirm */}
										<Grid item xs={12}>
											<Stack spacing={1}>
												<InputLabel htmlFor="passwordConfirm-signup">
													Confirm Password
												</InputLabel>
												<OutlinedInput
													fullWidth
													error={Boolean(
														touched.passwordConfirm &&
															errors.passwordConfirm
													)}
													id="passwordConfirm-signup"
													type={
														showConfirmPassword
															? "text"
															: "password"
													}
													value={
														values.passwordConfirm
													}
													name="passwordConfirm"
													onBlur={handleBlur}
													onChange={(e) => {
														handleChange(e);
													}}
													endAdornment={
														<InputAdornment position="end">
															<IconButton
																aria-label="toggle passwordConfirm visibility"
																onClick={
																	handleShowHideConfirmPassword
																}
																onMouseDown={
																	handleMouseDownPassword
																}
																edge="end"
																size="large"
															>
																{showConfirmPassword ? (
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
												{touched.passwordConfirm &&
													errors.passwordConfirm && (
														<FormHelperText
															error
															id="helper-text-passwordConfirm-signup"
														>
															{
																errors.passwordConfirm
															}
														</FormHelperText>
													)}
											</Stack>
										</Grid>
										{/* button */}
										<Grid item xs={12}>
											<Button
												sx={{ mt: 3, mb: 2 }}
												type="submit"
												fullWidth
												variant="contained"
												color="success"
												size="large"
												endIcon={<SendIcon />}
												disabled={
													!values.password &&
													!values.passwordConfirm
												}
											>
												{isSubmitting}
												Reset Password
											</Button>
										</Grid>
									</Grid>
								)}
							</form>
						</Container>
				)}
			</Formik>
		</>
	);
};