import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'
import logger from "redux-logger";
import rootReducer from "./reducers/todos";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware()
export default createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga)
