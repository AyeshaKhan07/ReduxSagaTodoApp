import React, { useEffect, useState } from 'react';
import '../App.css';
import { Button, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import AddTask from '../components/addTaskOrLogin';
import TaskList from '../components/taskList';
import { UserService } from '../services/storage.service';

export default function ToDoList() {
  let history = useHistory();
  const handleLogoutClick = () => {
    UserService.removeUser()
    history.push("/login")
  }
  return (
    <Grid container justifyContent='center'>
      <Grid item xs={9}>
        <Grid container spacing = {2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom align="center">TODO LIST</Typography>
          </Grid>
          <Grid item xs={12}>
            <AddTask loginView={false} />
          </Grid>
          <Grid item xs={12}>
            <TaskList />
          </Grid>
          <Grid item xs={8} align="right">
            <Button variant="contained" color="secondary" onClick={handleLogoutClick}>Logout</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}