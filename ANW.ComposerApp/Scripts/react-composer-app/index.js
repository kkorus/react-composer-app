import React from 'react';
import ReactDOM from 'react-dom';
import ComposersList from './components/ComposersList';
import ComposerDetails from './components/ComposerDetails';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { getComposers, getComposer } from './composersApi';

ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route
                path='/details/:id'
                render={(routeProps) => <ComposerDetails {...routeProps} getComposer={getComposer} />} />
            <Route
                path='/'
                render={(routeProps) => <ComposersList {...routeProps} getComposers={getComposers} />} />
        </Switch>
    </HashRouter>,
    document.getElementById('app'));
