// import { createStore, combineReducers } from 'redux';
// import favoriteReducer from './favoriteReducer';

// const rootReducer = combineReducers({
//   favorite: favoriteReducer,
// });

// const store = createStore(rootReducer);

// export default store;
// store.js
import { createStore, combineReducers } from 'redux';
import favoriteReducer from './favoriteReducer';

// Lấy trạng thái từ localStorage (nếu có)
const savedState = localStorage.getItem('reduxState');
const initialState = savedState ? JSON.parse(savedState) : undefined;

const rootReducer = combineReducers({
  favorite: favoriteReducer,
});

// Khởi tạo store với trạng thái ban đầu
const store = createStore(rootReducer, initialState);

// Subscribe để lưu trạng thái mới vào localStorage khi có thay đổi
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('reduxState', JSON.stringify(state));
});

export default store;
