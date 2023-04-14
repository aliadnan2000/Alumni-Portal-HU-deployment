import React, {useState, useEffect} from "react";
import {TextField, Button, Typography, Paper} from "@material-ui/core";
import FileBase from "react-file-base64";
import {useDispatch} from "react-redux";
import {createPost, updatePost} from "../../actions/posts";
import useStyles from "./styles";
import {useSelector} from "react-redux";

const AlumniForm = ({currentId, setCurrentId}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [postData, setPostData] = useState({
        user: user.result.name, title: "", body: "", image: "", forum: "Alumni"
    });
   
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId): null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])
    const handleSubmit = (e) => {
        e.preventDefault(); 

        if(currentId) {
            dispatch(updatePost(currentId, postData));
        }
        else{
            dispatch(createPost(postData));
        }
        clear();
        
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ title: "", body: "", image: ""})
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId? "Edit" : "Create"} a Post</Typography>
            
            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})}/>
            <TextField name="body" multiline maxRows={8} variant="outlined" label="Body" fullWidth value={postData.body} onChange={(e) => setPostData({...postData, body: e.target.value})}/>

            <div className={classes.fileInput}> <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({...postData, image: base64})}/></div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Post</Button>
            <Button variant="contained"  size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default AlumniForm;