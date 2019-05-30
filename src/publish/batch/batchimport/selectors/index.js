import { createSelector } from 'reselect'

const getListData = state => state.listData


// export const getCompletedTodoCount = createSelector(
//   [getListData],
//   todos => todos
  // (
  //   todos.reduce((count, todo) =>
  //     todo.completed ? count + 1 : count,
  //     0
  //   )
  // )
// )