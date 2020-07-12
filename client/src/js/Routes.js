import React, { Suspense } from 'react';
import thunk from 'redux-thunk';
import { Route, Switch, Link } from 'react-router-dom';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import rootReducer from "./reducers";
import history from "./history";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from 'react-redux';

const middleware = [
    thunk,
    routerMiddleware(history)
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer(history),
    composeEnhancers(
        applyMiddleware(...middleware)
    ),
);

const Homepage = React.lazy(() => import("./pages/Homepage"));

export default class Routes extends React.Component {
    render() {
        return (
            <Provider store={ store }>
                <ConnectedRouter history={history}>
                    <div id="content" className="site-content">
                        <Suspense fallback={''}>
                            <Switch>
                                <Route exact path="/" component={Homepage} />
                            </Switch>
                        </Suspense>
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}
