import { Grid } from "@mui/material";
import Register from "Components/Main/Register";
import { Helmet } from "react-helmet-async";

function PageRegister() {
    return (
        <>
            <Helmet>
                <title>Rejestracja</title>
                <meta
                    name="description"
                    content="Zarejestruj się do serwisu aby w pełni móc wykorzystać możliwości aplikacji."
                />
                <link rel="canonical" href="/register" />
            </Helmet>

            <Register />
        </>
    );
}

export default PageRegister;
