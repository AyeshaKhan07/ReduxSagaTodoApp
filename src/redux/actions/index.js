import { ADD_TODO, ADD_TODO_FAILURE, ADD_TODO_SUCCESS, EDIT_TASK, REMOVE_TASK, TASK_DONE } from "./actionTypes";

let nextIdToAdd = 0;

export const addTodo = task => (
    {
        type: ADD_TODO,
        payload: {
            id: nextIdToAdd++,
            content: task
        }
    })

export const addTodoSuccess = task => (
    {
        type: ADD_TODO_SUCCESS,
        payload: {
            id: nextIdToAdd++,
            content: task
        }
    })

export const addTodoFailure = (
    {
        type: ADD_TODO_FAILURE
    })
export const markTaskDone = id => (
    {
        type: TASK_DONE,
        payload: { id }
    }
)

export const removeTask = id => (
    {
        type: REMOVE_TASK,
        payload: { id }
    }
)

export const editTask = taskDetails => (
    {
        type: EDIT_TASK,
        payload: { id: taskDetails.id, content: taskDetails.content }
    }
)

