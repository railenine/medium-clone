import React from 'react';
import {Switch, Route} from 'react-router-dom';

import GlobalFeed from './components/globalFeed/GlobalFeed';
import Article from './components/article/Article';

export default () => {
    return (
        <Switch>
            <Route path="/" component={GlobalFeed} exact />
            <Route path='/articles/:slug' component={Article}/>
        </Switch>
    )
}