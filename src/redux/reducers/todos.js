import { ADD_TODO, ADD_TODO_FAILURE, ADD_TODO_SUCCESS, EDIT_TASK, EDIT_TASK_FAILURE, EDIT_TASK_SUCCESS, REMOVE_TASK, REMOVE_TASK_FAILURE, REMOVE_TASK_SUCCESS, TASK_DONE, TASK_DONE_FAILURE, TASK_DONE_SUCCESS } from "../actions/actionTypes";

const initialState = {
    tasksToBeDone: [],
    tasksCompleted: [],
    addTaskLoading: false,
    updateTaskLoading: false,
    removeTaskLoading: false
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
            return { ...state, removeTaskLoading: true }
        }

        case REMOVE_TASK_SUCCESS: {
            const { id } = action.payload;
            const tempTasksToBeDone = state.tasksToBeDone.filter(task => task.id != id)
            return {
                ...state,
                tasksToBeDone: tempTasksToBeDone,
                removeTaskLoading: false
            }
        }

        case REMOVE_TASK_FAILURE: {
            return { ...state, removeTaskLoading: false }
        }

        case EDIT_TASK: {
            return {
                ...state, updateTaskLoading: true
            }
        }

        case EDIT_TASK_SUCCESS: {
            const { id, content } = action.payload;
            const index = state.tasksToBeDone.findIndex(task => task.id == id)
            state.tasksToBeDone[index].content = content
            return {
                ...state,
                updateTaskLoading: false
            }
        }

        case EDIT_TASK_FAILURE: {
            return {
                ...state, updateTaskLoading: false
            }
        }
        default:
            return state;
    }
}
