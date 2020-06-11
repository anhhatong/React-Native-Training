import { TOGGLE_TODO, REMOVE_TODO, GOTO_EDIT, EDIT_TODO, GOTO_DETAIL, ADD_TODO, ADD_LIST, EDIT_LIST, REMOVE_LIST } from "./actionTypes";

export const addTodo = (listId , title, date) => ({
  type: ADD_TODO,
  payload: { listId ,title, date }
});

export const toggleTodo = (listId, todoId) => ({
  type: TOGGLE_TODO,
  payload: { listId, todoId }
});

export const removeTodo = (listId, todoId) => ({
  type: REMOVE_TODO,
  payload: { listId, todoId }
});

export const addList = (title) => ({
  type: ADD_LIST,
  payload: { title }
});

export const editList = (title) => ({
  type: EDIT_LIST,
  payload: { title}
});

export const removeList = (listId) => ({
  type: REMOVE_LIST,
  payload: { listId }
});

export const gotoEdit = (listId, todoId, title, currentDate) => ({
  type: GOTO_EDIT,
  payload: { listId, todoId, title, currentDate }
});

export const editTodo = (listId, todoId, title, currentDate) => ({
  type: EDIT_TODO,
  payload: { listId, todoId, title, currentDate }
});

export const gotoDetail = (listId) => ({
  type: GOTO_DETAIL,
  payload: { listId }
});
