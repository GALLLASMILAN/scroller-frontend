/*import { createStore, compose } from 'redux'; // applyMiddleware
// import thunk from 'redux-thunk';
import DevTools from './dev-tools';
import rootReducer from './root-reduces';*/

import rootReducer from './root-reduces';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware: any[] = [];

export default function configureStore(initialState = {}) {
    const store = createStore(rootReducer, initialState, composeWithDevTools(
        applyMiddleware(...middleware),
        // other store enhancers if any
    ));
    return store;
}

/**
const enhancer = compose(
    // Middleware you want to use in development:
    // applyMiddleware(d1, d2, d3),
    // Required! Enable Redux DevTools with the monitors you chose
    DevTools.instrument()
);

export default function configureStore(initialState = {}) {
    const store = createStore(
        rootReducer,
        initialState,
        enhancer
    );

    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    // @ts-ignore
    if (module.hot) {
        // @ts-ignore
        module.hot.accept('./root-reduces', () =>
            store.replaceReducer(
                require('./root-reduces')
            )
        );
    }

    return store;
}*/
