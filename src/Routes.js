import React from 'react';
import {Switch, Route} from 'react-router-dom';

import GlobalFeed from './pages/globalFeed/GlobalFeed';
import Article from './pages/article/Article';
import Authentication from './pages/authentication/Authentication';
import TagFeed from './pages/tagFeed/TagFeed';
import YourFeed from './pages/yourFeed/YourFeed';

export default () => {
    return (
        <Switch>
            <Route path="/" component={GlobalFeed} exact />
            <Route path="/feed" component={YourFeed} />
            <Route path="/tags/:slug" component={TagFeed} />
            <Route path="/login" component={Authentication} />
            <Route path="/register" component={Authentication} />
            <Route path='/articles/:slug' component={Article}/>
        </Switch>
    )
}