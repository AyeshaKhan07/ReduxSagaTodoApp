import { takeEvery, put, call } from 'redux-saga/effects'
import { addTaskAPI, removeTaskAPI } from '../../services/tasks'
import {
    ADD_TODO_SUCCESS,
    ADD_TODO_FAILURE,
    TASK_DONE_SUCCESS,
    TASK_DONE_FAILURE,
    TASK_DONE,
    REMOVE_TASK,
    REMOVE_TASK_SUCCESS
} from '../actions/actionTypes'
import { ADD_TODO } from '../actions/actionTypes'

export function* addTask(action) {
    try {
        const response = yield call(addTaskAPI, action.payload)
        const payload = {
            ...response.data,
            id: action.payload.id + response.data.id,
        }
        console.log("res", response)
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
        yield put({ type: REMOVE_TASK_SUCCESS, payload: action.payload.id })
    }
    catch (error) {
        yield put({ type: TASK_DONE_FAILURE, payload: action.payload.id })
    }
}

export function* watchAddTask() {
    yield takeEvery(ADD_TODO, addTask)
    yield takeEvery(TASK_DONE, markTaskDone)
    yield takeEvery(REMOVE_TASK, removeTask)
}