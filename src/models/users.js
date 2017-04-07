import * as userService from '../services/users';


export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    page: null,
  },
  reducers: {
    save(state, { payload:{ data: list, total, page }}) {
      console.log('reducers save ', arguments);
      return Object.assign(state, {list, total, page });
    }
  },
  effects: {
      // 抓数据
      *fetch({ payload: { page = 1 }}, { call, put }) {
      console.log('effects 1 ', arguments[0]);

      const { data, headers } = yield call(userService.fetch, { page });
      console.log('effects 2 ', arguments[0]);

      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10)
        }
      });
      console.log('effects 3 ', arguments[0]);
    },
    // 删除操作
    *remove({ payload: id}, { call, put }) {
      console.log('删除用户');
      yield call(userService.remove, id);
      yield put({ type: 'reload'});
    },
    // 修改用户信息
    *patch({ payload: {id, values} }, { call, put }) {
      console.log('修改用户信息 ' + id, values);
      yield call(userService.patch, id, values);
      yield put({ type: 'reload'});
    },
    // 添加用户
    *create({ payload: values }, {call, put}) {
      console.log('添加用户 ', values);
      yield call(userService.create, values);
      yield put({ type: 'reload'});
    },
    // 重新加载
    *reload(action, {put, select}) {
        const page = yield select(state => state.users.page);
        yield put({ type: 'fetch', payload: {page} });
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      console.log('subscriptions ', arguments);
      return history.listen(({ pathname, query }) => {
        console.log('pathname = ', query);
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query});
        }
      });
    }
  },
};
