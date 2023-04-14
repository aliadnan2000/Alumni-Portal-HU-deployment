import React, { useState, useEffect }  from "react";
import {Container, Grow, Grid, Card, Typography} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {getPosts} from "../../actions/posts";
import Posts from "../Posts/Posts";
import useStyles from "../../styles";
import Form from "../Form/Form";


const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return(
        <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={3}>
                            <Card className={classes.card}>
                                <Typography variant="h6" align="center">Following</Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
    )
}

export default Home;