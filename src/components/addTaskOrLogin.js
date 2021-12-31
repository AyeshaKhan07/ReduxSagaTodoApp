import { useState } from 'react';
import { Button, Grid, TextField, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { addTodo } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { UserService } from '../services/storage.service';

export default function AddTaskOrLogin({ loginView }) {

    const dispatch = useDispatch()
    let loading = useSelector(state => state.addTaskLoading)
    const [value, setValue] = useState("");
    const history = useHistory();
    const logInUser = () => {
        UserService.saveUser(value); history.push("/")
    }
    const handleAddTodo = () => {
        dispatch(addTodo(value))
    }

    const handelButtonClick = () => {
        !loginView ? handleAddTodo() : logInUser();
        setValue("");
    }
    return (
        <Grid container justifyContent='center'>
            <Grid item xs={6}>
                <Grid container alignItems='center' justifyContent='center' spacing={2}>
                    <Grid item>
                        <TextField label={loginView ? "Username" : "Task title"} variant="outlined" size="small" value={value} onChange={(e) => setValue(e.target.value)} />
                    </Grid>
                    <Grid item>
                        {loading ? <CircularProgress/> : <Button variant='contained' color="primary" onClick={handelButtonClick}>{loginView ? "Login" : "Add"}</Button>}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}