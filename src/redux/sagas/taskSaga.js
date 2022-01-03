import { takeEvery, put, call } from 'redux-saga/effects'
import { addTaskAPI, removeTaskAPI, updateTaskAPI } from '../../services/tasks'
import {
    ADD_TODO_SUCCESS,
    ADD_TODO_FAILURE,
    TASK_DONE_SUCCESS,
    TASK_DONE_FAILURE,
    TASK_DONE,
    REMOVE_TASK,
    REMOVE_TASK_SUCCESS,
    REMOVE_TASK_FAILURE,
    EDIT_TASK,
    EDIT_TASK_SUCCESS,
    EDIT_TASK_FAILURE
} from '../actions/actionTypes'
import { ADD_TODO } from '../actions/actionTypes'

export function* addTask(action) {
    try {
        const response = yield call(addTaskAPI, action.payload)
        const payload = {
            ...response.data,
            id: action.payload.id + response.data.id,
        }
        yield put({ type: ADD_TODO_SUCCESS, payload: payload })
    }
    catch (error) {
        yield put({ type: ADD_TODO_FAILURE })
    }
}

export function* markTaskDone(action) {
    try {
        yield put({ type: TASK_DONE_SUCCESS, payload: action.payload })
    }
    catch (error) {
        yield put({ type: TASK_DONE_FAILURE })
    }
}

export function* removeTask(action) {
    try {
        yield call(removeTaskAPI, action.payload.id)
        yield put({ type: REMOVE_TASK_SUCCESS, payload: action.payload })
    }
    catch (error) {
        yield put({ type: REMOVE_TASK_FAILURE })
    }
}

export function* updateTask(action) {

    try {
        yield call(updateTaskAPI, action.payload)
        yield put({type: EDIT_TASK_SUCCESS, payload: action.payload})
    }
    catch (error)
    {
        yield put({type: EDIT_TASK_FAILURE})
    }
}

export function* watchAddTask() {
    yield takeEvery(ADD_TODO, addTask)
    yield takeEvery(TASK_DONE, markTaskDone)
    yield takeEvery(REMOVE_TASK, removeTask)
    yield takeEvery(EDIT_TASK, updateTask)
}