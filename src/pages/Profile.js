import React, { useState, useEffect } from "react";
// import { useSelector } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import test2 from '../images/test2.png'
import "./DashboardTabs.css";
import "./Profile.css"

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { selectUser } from "../features/UserSlice";
import { useHistory } from "react-router";
import { Avatar } from "@material-ui/core";
import { Sidebars } from "./Sidebars";
import "./DashboardTabs.css";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    marginTop: 40,
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  con: {
    fontSize: 18,
  }

}));

const Profile = (props) => {
  const classes = useStyles()
  const user = useSelector(selectUser)
  console.log(user)
  return (
    <div className="div">
      <div>
        <Sidebars/>
      </div>

    <div className={classes.root}>
      
      <main className={classes.content}>
        <Grid item >
          <div className={classes.iconsize} >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap-reverse' ,flexDirection:'column' }}>
                <div className="test2">
                  <img src={test2} />
                </div>
                <div className={classes.con}>
                  <h2 style={{ textAlign: 'center' }}>{user?.displayName}</h2>
                  <p></p>
                  <p style={{ textAlign: 'center' }}>Email:{user?.email}</p>
                </div>
                {/* <p>Invite Link: <a style={{ fontStyle: 'italic', fontSize: 14 }} href={`http://member.mshoppingworld.com/register/${loggedInUser.user.userCode}`}>http://member.mshoppingworld.com/register/${loggedInUser.user.userCode}</a></p> */}
              </div>
            </div>
          </div>
        </Grid>
      </main>
      {/* whatsapp icon */}

    </div>
    </div>

  );
}

export default withRouter(Profile)