import { Button, CircularProgress, Grid, IconButton, TextField, Typography } from "@material-ui/core";
import { Done, RemoveCircleOutline, Edit } from "@material-ui/icons";
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { editTask, markTaskDone, removeTask } from "../redux/actions";
import { useDispatch } from 'react-redux';

export default function TaskList() {
    let dispatch = useDispatch();
    let tasksToBeDone = useSelector(state => state.tasksToBeDone)
    let updateLoading = useSelector(state => state.updateTaskLoading)
    let removeLoading = useSelector(state => state.removeTaskLoading)
    const completedTasks = useSelector(state => state.tasksCompleted)
    const [tab, setTab] = useState(0);
    const [editViewForTaskId, setEditViewForTaskId] = useState();
    const [loadinForTaskId, setLoadingForTaskId] = useState();
    const [taskDetails, setTaskDetails] = useState({
        id: 0,
        content: ""
    })
    const handleCheckTask = (id) => {
        dispatch(markTaskDone(id));
    }
    const handleRemoveTask = (id) => {
        setLoadingForTaskId(id);
        dispatch(removeTask(id));
    }
    const handleEditTaskView = (id) => {
        setEditViewForTaskId(id);
        setTaskDetails({
            ...taskDetails,
            id: id
        })
    }
    const handleUpdateTaskClick = () => {
        dispatch(editTask(taskDetails));
    }
    const AntTabs = withStyles({
        root: {
            borderBottom: '1px solid #e8e8e8',
        },
        indicator: {
            backgroundColor: '#1890ff',
        },
    })(Tabs);

    const AntTab = withStyles((theme) => ({
        root: {
            textTransform: 'none',
            minWidth: 72,
            fontWeight: theme.typography.fontWeightRegular,
            marginRight: theme.spacing(4),
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:hover': {
                color: '#40a9ff',
                opacity: 1,
            },
            '&$selected': {
                color: '#1890ff',
                fontWeight: theme.typography.fontWeightMedium,
            },
            '&:focus': {
                color: '#40a9ff',
            },
        },
        selected: {},
    }))((props) => <Tab disableRipple {...props} />);

    useEffect(() => {
        if (!updateLoading)
            setEditViewForTaskId(null)
        if (!removeLoading)
            setLoadingForTaskId(null)
    }, [updateLoading, removeLoading])
    const mapTasksToBeDone = () => {
        return tasksToBeDone.map((task, index) => editViewForTaskId != task.id ? (
            <Grid container justifyContent='center' alignItems="center" key={index}>
                {removeLoading && loadinForTaskId == task.id ?
                    <>
                        <CircularProgress />
                    </> :
                    <>
                        <Grid item xs={2}><Typography>{task.content}</Typography></Grid>
                        <Grid item>
                            <IconButton onClick={() => handleCheckTask(task.id)}><Done color="primary" /></IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={() => handleRemoveTask(task.id)}><RemoveCircleOutline color="error" /></IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={() => handleEditTaskView(task.id)}><Edit color="action" /></IconButton>
                        </Grid>
                    </>}
            </Grid>
        ) : (
            <Grid container justifyContent='center' alignItems="center" spacing={1} key={index}>
                <Grid item xs={3}>
                    <TextField
                        variant="outlined"
                        size="small"
                        autoFocus={true}
                        defaultValue={task.content}
                        onChange={(e) => setTaskDetails({ ...taskDetails, content: e.target.value })} />
                </Grid>
                <Grid item>
                    {updateLoading ? <CircularProgress /> : <Button color="primary" onClick={handleUpdateTaskClick}>Update</Button>}
                </Grid>
            </Grid>
        ))
    }
    const mapCompletedTasks = () => {
        return completedTasks.map((task, index) => (
            <Grid container justifyContent='center' alignItems="center" key={index}>
                <Grid item xs={3}><Typography>{task.content}</Typography></Grid>
                <Grid item>
                    <IconButton disabled={true}><Done color="disabled" /></IconButton>
                </Grid>
                <Grid item>
                    <IconButton disabled={true}><RemoveCircleOutline color="disabled" /></IconButton>
                </Grid>
            </Grid>
        ))
    }
    return (
        <Grid container justifyContent='center'>
            <Grid item xs={2}>
                <AntTabs value={tab} onChange={(e, value) => setTab(value)}>
                    <AntTab label="To Be Done" />
                    <AntTab label="Completed" />
                </AntTabs>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent="center">
                    <Grid item xs={4}>
                        {tab == 0 && tasksToBeDone && tasksToBeDone.length > 0 && mapTasksToBeDone()}
                        {tab == 1 && completedTasks && completedTasks.length > 0 && mapCompletedTasks()}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}