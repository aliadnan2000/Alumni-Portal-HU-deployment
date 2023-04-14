import React from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  avatar: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    color: theme.palette.text.secondary,
    fontWeight: 600,
    marginRight: theme.spacing(1),
  },
}));

const Profile = ({ user: passedUser }) => {
  const classes = useStyles();
  const location = useLocation();
  const profile = location.state?.user;
  console.log(profile);

  if (!profile) {
    return <div>No user to display</div>;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Avatar className={classes.avatar}>{profile.name[0]}</Avatar>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.subtitle} variant="subtitle1">
            Name:
          </Typography>
          <Typography variant="subtitle1">{profile.name}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.subtitle} variant="subtitle1">
            Email:
          </Typography>
          <Typography variant="subtitle1">{profile.email}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.subtitle} variant="subtitle1">
            Batch:
          </Typography>
          <Typography variant="subtitle1">{profile.batch}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.subtitle} variant="subtitle1">
            Major:
          </Typography>
          <Typography variant="subtitle1">{profile.major}</Typography>
        </Grid>
        {profile.isgradschool && (
          <Grid item xs={12} sm={6}>
            <Typography className={classes.subtitle} variant="subtitle1">
              Grad School:
            </Typography>
            <Typography variant="subtitle1">{profile.gradschool}</Typography>
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <Typography className={classes.subtitle} variant="subtitle1">
            Location:
          </Typography>
          <Typography variant="subtitle1">{profile.location}</Typography>
        </Grid>
        {profile.isemployed && (
          <Grid item xs={12} sm={6}>
            <Typography className={classes.subtitle} variant="subtitle1">
              Employment:
            </Typography>
            <Typography variant="subtitle1">{profile.employment}</Typography>
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <Typography className={classes.subtitle} variant="subtitle1">
            HU ID:
          </Typography>
          <Typography variant="subtitle1">{profile.huID}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
