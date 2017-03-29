import { createStore, compose, applyMiddleware } from "redux";
import { routerMiddleware } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import createLogger from "redux-logger";
import rootReducer from "../reducers";
import rootSaga from "../sagas/";


const configureStore = (history: any) => {
  const sagaMiddleware = createSagaMiddleware();
  const logger = createLogger();
  let middlewares = null;

  if (process.env.NODE_ENV === "production") {
    middlewares = applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware
    );

  } else {
    middlewares = applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
      logger
    );
  }

  const store = createStore(
    rootReducer,
    {},
    compose(middlewares)
  );

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("../reducers", () => {
        const nextRootReducer = require("../reducers").default;
        store.replaceReducer(nextRootReducer);
      });
    }
  }

  sagaMiddleware.run(rootSaga);

  return store;
};


export default configureStore;
