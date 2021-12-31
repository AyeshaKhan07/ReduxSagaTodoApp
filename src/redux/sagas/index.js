
import { all } from 'redux-saga/effects'
import { watchAddTask } from './taskSaga'

export default function* rootSaga() {
  yield all([
    watchAddTask(),
  ])
}
