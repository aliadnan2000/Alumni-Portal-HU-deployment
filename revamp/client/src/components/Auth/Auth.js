import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {Avatar, Button, Paper, Grid, Typography, Container} from "@material-ui/core";
import Select from '@material-ui/core/Select';
import useStyles from "./styles";
import Input from "./Input";
import {signin, signup} from '../../actions/auth';


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword:'', major:'', batch: ''};
const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const history = useHistory();
 

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData, history)).then(() => {
                history.push('/posts');
              });
        }
        else{
            dispatch(signin(formData, history)).then(() => {
                history.push('/posts');
              });
        }
        

    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: [e.target.value]});
    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };
/*
    constructor(){
        this.state = {
          major: selectedOptionId
        }
      };
      
      dropdownChanged(e){
        this.setState({major: e.target.value});
      };
       <Select name="major" value={this.major}  label="Major" onChange={this.dropdownChanged.bind(this)} >
                                                <option value="DEFAULT" disabled>Choose your major</option>
                                                <option value="CS">CS</option>
                                                <option value="CE">CE</option>
                                                <option value="EE">EE</option>
                                                <option value="SDP">SDP</option>
                                                <option value="CND">CND</option>
                                                <option value="CH">CH</option>
                                            </Select>
*/
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} eleveation={3}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign up' : 'Sign in' }</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                </>
                            )}
                            <Input name="email" label="HU Email" handleChange={handleChange} type="email"/>
                            
                            {isSignup &&  <Input name="major" label="Major" handleChange={handleChange} type="text"/>}
                            
                                           
                                        
                            
                            {isSignup && <Input name="batch" label="Batch" handleChange={handleChange} type="text"/>}
                            <Input name="password" label="Password" handleChange={handleChange} type={showPassword? "text" : "password"} handleShowPassword={handleShowPassword}/>
                            {isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password"/>}
                            <Button type="submit" fullWidth variant="contained"  className={classes.submit}>
                                {isSignup ? "Sign up" : "Sign in"}
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Button onClick={switchMode}>
                                    {isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                                </Button>
                            </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;