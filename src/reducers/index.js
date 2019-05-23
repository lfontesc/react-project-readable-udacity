import { combineReducers } from 'redux'
import {  
LOADING_CATEGORY, 
SELECT_CATEGORY,
LOADING_POST,
LOADING_POSTS,
LOADING_POST_BY_CATEGORY,
REMOVE_POST,
VOTE_POST,
SELECT_ORDER,
VOTE_POST_FROMPOST,
LOADING_COMMENTS,
VOTE_COMMENT,
LOADING_COMMENT,
REMOVE_COMMENT,
NOT_FOUND
 } from '../actions'

function categories(state = {}, action) {
  switch(action.type) {
    case LOADING_CATEGORY:
      return {
        ...state,
        categories: action.categories
      }
    case SELECT_CATEGORY:
      return {
        ...state,
        category: action.category
      }
    default:
      return state
  }
}

const initialStatePosts = {
  posts: []
}

function posts(state = initialStatePosts, action) {
  switch(action.type) {
    case LOADING_POSTS:
      return {
        ...state,
        posts: action.posts
      }
    case LOADING_POST_BY_CATEGORY:
      return {
        ...state,
        category: action.category,
        posts: action.posts
      }
    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.id)
      }
    case VOTE_POST:
      return {
        ...state,
        posts: state.posts.map(post => {
          if(post.id === action.id) {
            post.voteScore = post.voteScore + action.vote
          }

          return post;
        })
      }
    default:
      return state
  }
}

const initialStateOrder = {
  ordem: 'id'
}

function order(state = initialStateOrder, action) {
  switch(action.type) {
    case SELECT_ORDER:
      return {
        ...state,
        order: action.order
      }
    default:
      return state
  }
}

const initialStatePost = {
  posts: [],
  post: {}
}

function post(state = initialStatePost, action) {
  switch(action.type) {
    case LOADING_POST:
      return {
        ...state,
        post: action.post
      }
    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.id)
      }
    case VOTE_POST_FROMPOST:
      return {
        ...state,
        post: {
          ...state.post,
          voteScore: state.post.voteScore + action.vote
        }
      }
      case NOT_FOUND:
      return {
        ...state,
      error:true 
    }
    default:
      return state
  }
}

const initialStateComments = {
  comments: []
}

function comments(state = initialStateComments, action) {
  switch(action.type) {
    case LOADING_COMMENTS:
      return {
        ...state,
        comments: action.comments
      }
    case VOTE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment => {
          if(comment.id === action.id) {
            comment.voteScore = comment.voteScore + action.vote
          }

          return comment;
        })
      }
    default:
      return state
  }
}

const initialStateComment = {
  comments: [],
  comment: {}
}

function comment(state = initialStateComment, action) {
  switch(action.type) {
    case LOADING_COMMENT:
      return {
        ...state,
        comments: state.comments.concat(action.comment),
        comment: action.comment
      }
    case REMOVE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comments => comments.id !== action.id)
      }
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  order,
  post,
  comments,
  comment
})