//This is homepage component.

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ArrowBackIosIcon from "@material-ui/icons/ChevronLeft";

import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
import data from "./data";
import firebase from "../firebase";
import { CardMedia } from "@material-ui/core";

const useStyles =  makeStyles({
  root: {
    Width: "100vh",
    height: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
   
  },
  media: {
    height: 150,
    width:150,
    marginLeft:'40%',
  
  },
  left: {
    width: "200px",
    height: 200,

    marginTop: 150,
  },
  right: {
    width: "200px",
    height: 200,
    marginTop: 150,
  },
  actionArea: {
    backgroundColor: "#FFFFF",
  },
});

export default function Home() {
  const classes = useStyles();
  const [count, setcount] = React.useState(0);

  const [username, setusername] = React.useState("");

  React.useEffect(() => {
    const subscribers = () => {
      if (firebase.auth().currentUser) {
        setusername(firebase.auth().currentUser.displayName);
      }
    };
    subscribers();
  }, [count]);

  React.useEffect(() => {
    //this function trigger automatic after 5 sec 
    setTimeout(() => {
      if (count < 4) {
        setcount(count + 1);
      }
      if (count > 4 && count < 6) {
        alert(`${username}, you have rated all the images. Thank You!`);
      }
    }, 5000);
  }, [count]);
  const left = () => {
    //this function trigger on Clickk event- Left button with respective message

    if (count < 4) {
      alert(`${username} , you have rejected image ${data[count].name}`);

      setcount(count + 1);
    } else {
      alert("user name, you have rated all the images. Thank You!");
    }
  };
  const right = () => {
    //this function trigger on Click event- Right button with respective message

    if (count < 4) {
      alert(`${username} , you have selected image ${data[count].name}`);

      setcount(count + 1);
    } else {
      alert("user name, you have rated all the images. Thank You!");
    }
  };
  const logout = () => {
    // this function trigger on click event to Logout the user
    firebase
      .auth()
      .signOut()
      .then(() => {
        alert("You have signed out");
        localStorage.removeItem("sessiontree");
        window.location.reload();
      });
  };
  return (
    // Rendering part of a Home component
    <>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h1>Welcome {username}</h1>
        <span style={{ cursor: "pointer" }} onClick={logout}>
          <h2>Logout</h2>
        </span>
      </div>
      <Card className={classes.root}>
        <div className={classes.left}>
          {
            <ArrowBackIosIcon
              style={{
                position: "relative",
                left: "5%",
                fontSize: 80,
                cursor: "pointer",
              }}
              onClick={left}
            />
          }
        </div>
        <CardActionArea className={classes.actionArea}>
        <CardMedia
          className={classes.media}
          image={data[count].src}
          title={data[count].name}
        />
          

          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data[count].name}
            </Typography>
         
          </CardContent>
        </CardActionArea>
        <div className={classes.right}>
          <ChevronRightIcon
            style={{
              position: "relative",
              left: "40%",
              fontSize: 80,
              cursor: "pointer",
            }}
            onClick={right}
          />
        </div>
      </Card>
    </>
  );
}
