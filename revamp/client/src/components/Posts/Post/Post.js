import React from "react";
import {Card, CardActions, CardMedia, CardContent, Button, Typography} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import {useDispatch,  useSelector} from "react-redux";
import {deletePost, likePost} from "../../../actions/posts";
import { getUserById } from '../../../actions/users';
import { useState, useEffect} from "react";
import { Link } from "react-router-dom";

import useStyles from "./styles";
const Post = ({post, setCurrentId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
      if (post.user) {
        dispatch(getUserById(post.user));
      }
    }, [post.user, dispatch]);


    return (
        <Card className={classes.card}>
            <CardActions className={classes.cardActions}>
            <div className={classes.card}>
            {user ? (
            <Link
              to={{
                pathname: `/profile`,
                state: { user: user },
              }}
              style={{ textDecoration: 'none', color: 'inherit' }}
            > {user.name}
            </Link>
          ) : (
            <Typography variant="h6">Unknown</Typography>
          )}
                <Typography variant="body2">{moment(post.createdOn).fromNow()}</Typography>
            </div>
            <div >
                <Button style={{color: "black"}} size="small" onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="medium"/>
                </Button>
            </div>
            </CardActions>
            {post.image !== "" && <CardMedia component="img" image={post.image} title={post.title}/>}
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" gutterBottom>{post.body}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary"onClick={() => dispatch(likePost(post._id))}>
                    <ThumbUpAltIcon fontSize="small"/>
                    &nbsp; Like &nbsp;
                    {post.likes}
                </Button>
                <Button size="small" color="primary"onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small"/>
                    Delete 
                </Button>
            </CardActions>
            
        </Card>
    );
}

export default Post;