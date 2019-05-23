import React from 'react';
import { Link } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import CategoryList from './CategoryList'
import PostList from './PostList'
import NewPost from './NewPost'
import EditPost from './EditPost'
import Post from './Post'
import EditComment from './EditComment'
import NotFound from './NotFound'

function App() {
  return (
    <div>     
  
      <h2><Link to="/">Readable</Link></h2>
   
            <Route exact path='/' render={(props) => (
                  <main>
                    <CategoryList {...props}/>
                    <PostList {...props}/>
                  </main>
            )}/>

        <Switch>
          <Route exact path='/:category' render={(props) => (
            <main>
              <CategoryList {...props}/>
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

export default App;
