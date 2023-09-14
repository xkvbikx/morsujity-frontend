import { Box, Button, Container, Unstable_Grid2 as Grid2, Stack, Typography } from "@mui/material";
import { MyTextField } from "components/my/MyTextField";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import * as Yup from "yup";
import { ImageOptions } from "./ImageOptions";
import { changePseudonym, changePassword } from "store/user/user.actions";


const PSEUDONYM_FORM_STATE = {
    pseudonym: "",
};

const NEW_PASSWORD_FORM_STATE = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
};

const PSEUDONYM_VALIDATION = Yup.object().shape({
    pseudonym: Yup.string()
        .required("Wymagane")
        .min(3, "Ksywka za krótka - Co najmniej 3 znaki")
        .max(30, "Ksywka za długa - Maksymalnie 30 znaków"),
});

const NEW_PASSWORD_VALIDATION = Yup.object().shape({
    oldPassword: Yup.string().required("Wymagane"),
    newPassword: Yup.string()
        .required("Wymagane")
        .min(8, "Hasło za krótkie - co najmniej 8 znaków")
        .max(20, "Hasło za długie - maksymalnie 20 znaków")
        .matches(/(?=.*[a-z])/, "Musi zawierać mała literę")
        .matches(/(?=.*[A-Z])/, "Musi zawierać dużą literę")
        .matches(/(?=.*[0-9])/, "Musi zawierać cyfrę")
        .matches(/(?=.*[!@#$%^&*])/, "Musi zawierać znak specjalny (! @ # $ % ^ & *)"),
    confirmNewPassword: Yup.string()
        .required("Wymagane")
        .oneOf([Yup.ref("newPassword")], "Hasła muszą być takie same"),
});

export function Settings() {
    const dispatch = useAppDispatch();

    const pseudonym = useAppSelector((state) => state.user.pseudonym);

    const formikPseudonym = useFormik({
        initialValues: PSEUDONYM_FORM_STATE,
        validationSchema: PSEUDONYM_VALIDATION,
        onSubmit: ({ pseudonym }, { resetForm }) => {
            dispatch(changePseudonym(pseudonym));
            resetForm();
        },
    });

    const formikNewPassword = useFormik({
        initialValues: NEW_PASSWORD_FORM_STATE,
        validationSchema: NEW_PASSWORD_VALIDATION,
        onSubmit: ({ oldPassword, newPassword }) => {
            dispatch(changePassword(oldPassword, newPassword));
        },
    });

    return (
        <Container
            component='main'
            sx={{
                px: { xs: 0, sm: 10, md: 5, lg: 10, xl: 10 },
            }}
        >
            <Stack p={5} borderRadius={5} boxShadow={5}>
                <Typography variant='h5' fontWeight={"bold"}>
                    Konto
                </Typography>
                <Typography variant='h3' fontWeight={"bold"}>
                    Ustawienia
                </Typography>
                <Grid2 container>
                    <Grid2 xs={12} xl={6}>
                        <Box component={"form"} noValidate onSubmit={formikPseudonym.handleSubmit}>
                            <Typography variant='h5' fontWeight={"bold"} mt={2}>
                                Zmiana Ksywki
                            </Typography>
                            <Grid2 container columns={20}>
                                <Grid2 xs={20} sm={10} xl={8}>
                                    <MyTextField
                                        name='pseudonym'
                                        label='Ksywka'
                                        placeholder={pseudonym!}
                                        formik={formikPseudonym}
                                    />
                                </Grid2>
                                <Grid2
                                    xs={20}
                                    sm={10}
                                    xl={12}
                                    sx={{ display: { xs: "none", sm: "flex" } }}
                                ></Grid2>
                                <Grid2 xs={20} sm={10} xl={8}>
                                    <Button
                                        color='primary'
                                        type='submit'
                                        variant='contained'
                                        size='medium'
                                        fullWidth
                                        disabled={
                                            !(formikPseudonym.isValid && formikPseudonym.dirty)
                                        }
                                    >
                                        Aktualizuj
                                    </Button>
                                </Grid2>
                            </Grid2>
                        </Box>

                        <Box
                            component={"form"}
                            noValidate
                            onSubmit={formikNewPassword.handleSubmit}
                        >
                            <Typography variant='h5' fontWeight={"bold"} mt={2}>
                                Zmiana Hasła
                            </Typography>
                            <Grid2 container columns={20}>
                                <Grid2 xs={20} sm={10} xl={8}>
                                    <MyTextField
                                        type='password'
                                        name='oldPassword'
                                        label='Aktualne Hasło'
                                        formik={formikNewPassword}
                                    />
                                </Grid2>
                                <Grid2
                                    sm={10}
                                    lg={15}
                                    xl={16}
                                    sx={{ display: { xs: "none", sm: "flex" } }}
                                ></Grid2>
                                <Grid2 xs={20} sm={10} xl={8}>
                                    <MyTextField
                                        type='password'
                                        name='newPassword'
                                        label='Nowe Hasło'
                                        formik={formikNewPassword}
                                    />
                                </Grid2>

                                <Grid2 xs={20} sm={10} xl={8}>
                                    <MyTextField
                                        type='password'
                                        name='confirmNewPassword'
                                        label='Pot. Nowego Hasła'
                                        formik={formikNewPassword}
                                    />
                                </Grid2>
                                <Grid2
                                    sm={10}
                                    xl={12}
                                    sx={{ display: { xs: "none", lg: "flex" } }}
                                ></Grid2>
                                <Grid2 xs={20} xl={16}>
                                    <Button
                                        type='submit'
                                        fullWidth
                                        variant='contained'
                                        disabled={
                                            !(formikNewPassword.isValid && formikNewPassword.dirty)
                                        }
                                    >
                                        Aktualizuj Hasło
                                    </Button>
                                </Grid2>
                            </Grid2>
                        </Box>
                    </Grid2>
                    <Grid2 xs={12} xl={6}>
                        <Typography variant='h5' fontWeight={"bold"} mt={2}>
                            Zmiana Profilowego
                        </Typography>
                        <ImageOptions />
                    </Grid2>
                </Grid2>
            </Stack>
        </Container>
    );
}
