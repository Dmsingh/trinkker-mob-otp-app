// Sign Up and Login Component with mobile otp verification functionality!
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import PhonelinkLockIcon from "@material-ui/icons/PhonelinkLock";
import Typography from "@material-ui/core/Typography";

import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import firebase from "../firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [mobile, setmobile] = React.useState({
    number: "",
    otp: "",
    profile: "",
  });
  const [verify, setverify] = React.useState(false);
  const [profile, setprofile] = React.useState(false);
  const [login, setlogin] = React.useState(false);
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (key) => (e) => {
    const { value = "" } = e.target;
    let newUser = { ...mobile };
    newUser[key] = value;

    setmobile(newUser);
  };
  React.useEffect(() => {
    const session = () => {
      if (localStorage.getItem("sessiontree")) {
        history.push({ pathname: "/homepage" });
      }
    };
    return session();
  });

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.

          onSignInSubmit();
        },
        defaultCountry: "IN",
      }
    );
  };
  const onSignInSubmit = (e) => {
    e.preventDefault();
    configureCaptcha();
    const phoneNumber = "+91" + mobile.number;
    setOpen(true);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setverify(true);

        alert("OTP has been sent to your entered mobile");
        // ...
      })
      .catch((error) => {
        alert("SMS not sent");
        setOpen(false);
        window.location.reload();
      });
  };
  React.useEffect(() => {
    const loader = () => {
      if (verify) {
        handleClose();
      }
    };
    loader();
  }, [verify]);
  const onSubmitOTP = (e) => {
    e.preventDefault();
    const code = mobile.otp;

    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        localStorage.setItem("refreshToken", user.refreshToken);
        alert("Phone number is verified");

        if (login) {
          localStorage.setItem("sessiontree", true);
          window.location.reload();
        } else {
          setprofile(true);
        }
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        alert(error);
        // ...
      });
  };
  const onSubmitProfile = () => {
    firebase.auth().currentUser.updateProfile({
      displayName: mobile.profile,
    });
    alert(`${mobile.profile}, Your Profile has been created successfully!!!`);
    firebase.auth().currentUser.updateProfile({
      displayName: mobile.profile,
    });
    localStorage.setItem("sessiontree", true);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PhonelinkLockIcon />
        </Avatar>

        {!login ? (
          <>
            <Typography component="h1" variant="h5">
              {profile ? "Complete Your Profile" : "Sign Up"}
            </Typography>
            <form className={classes.form} noValidate>
              <div id="sign-in-button"></div>
              {!verify ? (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Phone Number"
                  name="number"
                  autoComplete="tel"
                  type="tel"
                  placeholder="0123-456-789"
                  pattern="[0-9]{3}[0-9]{2}[0-9]{3}[0-9]{2}"
                  autoFocus
                  value={mobile.number}
                  onChange={handleChange("number")}
                />
              ) : !profile ? (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="otp"
                  label="OTP Verification "
                  name="otp"
                  type="text"
                  placeholder="Enter 6 digit pin"
                  value={mobile.otp}
                  onChange={handleChange("otp")}
                  autoFocus
                />
              ) : (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="profile"
                  label="Enter Username"
                  name="profile"
                  type="text"
                  placeholder="Enter Username"
                  value={mobile.profile}
                  onChange={handleChange("profile")}
                  autoFocus
                />
              )}
              <Backdrop
                className={classes.backdrop}
                open={open}
                onClick={handleClose}
              >
                <CircularProgress color="inherit" />
              </Backdrop>

              {!verify ? (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={onSignInSubmit}
                >
                  Get OTP
                </Button>
              ) : profile ? (
                <Link to="/homepage">
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={onSubmitProfile}
                  >
                    Submit
                  </Button>
                </Link>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={onSubmitOTP}
                >
                  verify OTP
                </Button>
              )}

              <Grid container>
                <Grid item>
                  <Link
                    to="/"
                    onClick={() => setlogin(true)}
                    style={{ cursor: "pointer" }}
                    variant="body2"
                  >
                    {"Do you have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </>
        ) : (
          <>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <form className={classes.form} noValidate>
              <div id="sign-in-button"></div>
              {!verify ? (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Phone Number"
                  name="number"
                  autoComplete="tel"
                  type="tel"
                  placeholder="0123-456-789"
                  pattern="[0-9]{3}[0-9]{2}[0-9]{3}[0-9]{2}"
                  autoFocus
                  value={mobile.number}
                  onChange={handleChange("number")}
                />
              ) : (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="otp"
                  label="OTP Verification "
                  name="otp"
                  type="text"
                  placeholder="Enter 6 digit pin"
                  value={mobile.otp}
                  onChange={handleChange("otp")}
                  autoFocus
                />
              )}
              <Backdrop
                className={classes.backdrop}
                open={open}
                onClick={handleClose}
              >
                <CircularProgress color="inherit" />
              </Backdrop>

              {!verify ? (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={onSignInSubmit}
                >
                  Get OTP
                </Button>
              ) : (
                <Link to="/homepage">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={onSubmitOTP}
                  >
                    login
                  </Button>
                </Link>
              )}

              <Grid container>
                <Grid item>
                  <Link
                    to="/"
                    onClick={() => setlogin(false)}
                    style={{ cursor: "pointer" }}
                    variant="body2"
                  >
                    {"Do not have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </>
        )}
      </div>
    </Container>
  );
}
