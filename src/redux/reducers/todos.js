import { ADD_TODO, ADD_TODO_FAILURE, ADD_TODO_SUCCESS, EDIT_TASK, REMOVE_TASK, REMOVE_TASK_FAILURE, REMOVE_TASK_SUCCESS, TASK_DONE, TASK_DONE_FAILURE, TASK_DONE_SUCCESS } from "../actions/actionTypes";

const initialState = {
    tasksToBeDone: [],
    tasksCompleted: [],
    addTaskLoading: false,
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO: {
            return { ...state, addTaskLoading: true }
        }

        case ADD_TODO_SUCCESS: {
            const { id, content } = action.payload;
            return {
                ...state,
                tasksToBeDone: [
                    ...state.tasksToBeDone,
                    {
                        id,
                        content,
                        loading: false
                    }
                ],
                addTaskLoading: false
            };
        }

        case ADD_TODO_FAILURE:
            return { ...state, addTaskLoading: false }

        case TASK_DONE: {
            return state
        }

        case TASK_DONE_SUCCESS: {
            const { id } = action.payload;
            const index = state.tasksToBeDone.findIndex(task => task.id == id)
            const payload = state.tasksToBeDone[index];
            const tempTasksToBeDone = state.tasksToBeDone.filter(task => task.id != id)
            return {
                ...state,
                tasksToBeDone: tempTasksToBeDone,
                tasksCompleted: [
                    ...state.tasksCompleted,
                    payload
                ]
            }
        }

        case TASK_DONE_FAILURE: {
            return state
        }

        case REMOVE_TASK: {
            const { id } = action.payload;
            const index = state.tasksToBeDone.findIndex(task => task.id == id)
            state.tasksToBeDone[index].loading = true;
            return state
        }

        case REMOVE_TASK_SUCCESS: {
            const { id } = action.payload;
            const index = state.tasksToBeDone.findIndex(task => task.id == id)
            state.tasksToBeDone[index].loading = false;
            const tempTasksToBeDone = state.tasksToBeDone.filter(task => task.id != id)
            return {
                ...state,
                tasksToBeDone: tempTasksToBeDone
            }
        }

        case REMOVE_TASK_FAILURE: {
            const { id } = action.payload;
            const index = state.tasksToBeDone.findIndex(task => task.id == id)
            state.tasksToBeDone[index].loading = false;
            return state
        }

        case EDIT_TASK: {
            const { id, content } = action.payload;
            const index = state.tasksToBeDone.findIndex(task => task.id == id)
            state.tasksToBeDone[index].content = content
            return {
                ...state
            }
        }
        default:
            return state;
    }
}
