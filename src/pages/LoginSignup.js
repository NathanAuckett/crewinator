
import Grid from '@mui/material/Unstable_Grid2';

import {LoginSignupField} from "../components/LoginSignupField"

export function LoginSignup() {

    return (
        <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80%"
        >
            
            <LoginSignupField/>
        </Grid>
    )

}