import Todo from "Todo";
import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import Perf from "react-addons-perf";
const { reducers, actions, models } = Todo;

//use const for PROD
let store = createStore(
  combineReducers({
    todoLists: reducers.todoLists,
    todos: reducers.todos,
    users: reducers.users,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

// store.subscribe(() => {
//   console.log(store.getState());
// });

let todoID = 0;
let userID = 0;

// local store hydration
store.dispatch(actions.user.add(userID++, `user ${userID}`));
store.dispatch(actions.user.add(userID++, `user ${userID}`));

store.dispatch(actions.todo.add(todoID++, 0, `Hello World - ${todoID}`, "Description"));
store.dispatch(actions.todo.add(todoID++, 0, `Hello World - ${todoID}`, "Description"));
store.dispatch(actions.todo.add(todoID++, 0, `Hello World - ${todoID}`, "Description"));

store.dispatch(actions.todo.add(todoID++, 1, `Hello World - ${todoID}`, "Description"));
store.dispatch(actions.todo.add(todoID++, 1, `Hello World - ${todoID}`, "Description"));
store.dispatch(actions.todo.add(todoID++, 1, `Hello World - ${todoID}`, "Description"));


const getTodos = state => state.todos;

let todosBy0 = models.TodoCollection.getIndicesByCreatorID(getTodos(store.getState()), 0);
let todosBy1 = models.TodoCollection.getIndicesByCreatorID(getTodos(store.getState()), 1);

//TODO: add user buckets to TodoCollection and query

store.dispatch(actions.todoList.add(0, todosBy0));
store.dispatch(actions.todoList.add(1, todosBy1));
store.dispatch(actions.todoList.add(2, [0, 1, 2, 3, 4, 5]));


export default store;
