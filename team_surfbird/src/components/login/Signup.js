import {React, Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { firebaseApp } from "./../../firebase";


const styles = theme => ({
    paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    },
    avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    },
    form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    },
    submit: {
    margin: theme.spacing(3, 0, 2),
    },
});


class Signup extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
        };

        function Copyright() {
            return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://material-ui.com/">
                Your Website
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
            );
        }
        
        
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    
    signup(e) {
        e.preventDefault();
        firebaseApp
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then((u) => {})
          .then((u) => {
            console.log(u);
          })
          .catch((error) => {
            console.log(error);
          });

          console.log(firebaseApp.auth().currentUser);

          localStorage.setItem("firstName", this.state.firstName);
          localStorage.setItem("lastName", this.state.lastName);
          
      }
  
    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign up
                </Typography>
                <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        defaultValue={this.state.firstName}
                        onChange={this.handleChange}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        defaultValue={this.state.lastName}
                        onChange={this.handleChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        defaultValue={this.state.email}
                        onChange={this.handleChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        defaultValue={this.state.password}
                        onChange={this.handleChange}
                    />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.signup}
                >
                    Sign Up
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                    <Link href="#" variant="body2">
                        Already have an account? Sign in
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
            <Box mt={5}>
                {/* <Copyright /> */}
            </Box>
            </Container>
        );
    }
}
export default withStyles(styles, { withTheme: true })(Signup);;