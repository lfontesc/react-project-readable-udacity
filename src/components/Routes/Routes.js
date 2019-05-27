import React from 'react';
import { Link } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'

//Components
import CategoryList from '../CategoryList'
import PostList from '../Posts/PostList'
import NewPost from '../Posts/NewPost'
import EditPost from '../Posts/EditPost'
import Post from '../Posts/Post'
import EditComment from '../Comments/EditComment'
import NotFound from '../Global/NotFound'


function Routes() {
  return (
      <div>
            <Route exact path='/' render={(props) => (
                  <main>
                     <CategoryList />
                     <PostList {...props}/>
                  </main>
            )}/>

        <Switch>
          <Route exact path='/:category' render={(props) => (
            <main>
              <CategoryList />
              <PostList {...props}/>
            </main>
          )}/>
          <Route exact path='/404/notfound' component={NotFound}/>
          <Route exact path='/posts/new' component={NewPost}/>
          <Route exact path='/posts/:id/edit' component={EditPost}/>
          <Route exact path='/:category/:id' component={Post}/>
          <Route exact path='/comments/:id/edit' component={EditComment}/>
        </Switch>
        </div>
 );
}

export default Routes;
