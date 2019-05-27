import * as API from '../utils/api'

//CONSTS
export const LOADING_CATEGORY = 'LOADING_CATEGORY'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const LOADING_POSTS = 'LOADING_POSTS'
export const LOADING_POST_BY_CATEGORY = 'LOADING_POST_B?Y_CATEGORY'
export const LOADING_POST = 'LOADING_POST'
export const SELECT_ORDER = 'SELECT_ORDER'
export const REMOVE_POST = 'REMOVE_POST'
export const VOTE_POST = 'VOTE_POST'
export const VOTE_POST_FROMPOST = 'VOTE_POST_FROMPOST'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const EDIT_POST = 'EDIT_POST'
export const LOADING_COMMENTS = 'LOADING_COMMENTS'
export const LOADING_COMMENT = 'LOADING_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const NOT_FOUND = 'NOT_FOUND'

//Complet
  export function loadingCategories(categories) {
    return {
      type: LOADING_CATEGORY,
      categories
    }
  }
//Complet  
  export function callLoadingCategories() {
    return (dispatch) => {
      API.getCategories().then(
        (response) => dispatch(loadingCategories(response))
      )
    }
  }
//Complet 
  export function selectCategory(category) {
    return {
      type: SELECT_CATEGORY,
      category
    }
  }
//Complet
  export function loadingPosts(posts) {
    return {
      type: LOADING_POSTS,
      posts
    }
  }
//Complet
  export function loadingPostsByCategory(category, posts) {
    return {
      type: LOADING_POST_BY_CATEGORY,
      category,
      posts
    }
  }
//complet
  export function callLoadingPosts() {
    return (dispatch) => {
      API.getPosts().then(
        (response) => dispatch(loadingPosts(response))
      )
    }
  }

//complet
  export function callLoadingPostsByCategory(category) {
    return (dispatch) => {
      API.getPostsByCategory(category).then(
        (response) => dispatch(loadingPostsByCategory(category, response))
      )
    }
  }
  
  export function selectOrder(order) {
    return {
      type: SELECT_ORDER,
      order
    }
  }
  
  export function loadingPost(post) {
    return {
      type: LOADING_POST,
      post
    }
  }
  
  export function callLoadingPost(id) {
    return (dispatch) => {
      API.getPost(id).then(
        (response) => dispatch(loadingPost(response))
      )
    }
  }

  

  export function removePost(id) {
    return {
      type: REMOVE_POST,
      id
    }
  }
  
  export function callRemovePost(id) {
    return (dispatch) => {
      API.deletePost(id).then(
        () => dispatch(removePost(id))
      )
    }
  }

  export function vote(id, vote, path, fromPost) {
    let type
  
    if(fromPost === true) {
      type = VOTE_POST_FROMPOST
    } else {
      type = (path === 'posts') ? VOTE_POST : VOTE_COMMENT
    }
  
    return {
      type: type,
      id,
      vote
    }
  }
  
  export function callVote(id, data, path, fromPost) {
    let voter = (data.option === 'upVote') ? 1 : -1
  
    return (dispatch) => {
      API.votePost(id, data, path).then(
        () => dispatch(vote(id, voter, path, fromPost))
      )
    }
  }
  
  export function callNewPost(post) {
    return (dispatch) => {
      API.createPost(post).then(
        (response) => dispatch(loadingPost(response))
      )
    }
  }
  
  export function callEditPost(post) {
    return (dispatch) => {
      API.editPost(post).then(
        (response) => dispatch(post(response))
      )
    }
  }
  
  //comments
  export function loadingComments(id, comments) {
    return {
      type: LOADING_COMMENTS,
      id,
      comments
    }
  }
  
  export function callLoadingComments(id) {
    return (dispatch) => {
      API.getComments(id).then(
        (response) => dispatch(loadingComments(id, response))
      )
    }
  }
  
  export function loadingComment(id, comment) {
    return {
      type: LOADING_COMMENT,
      id,
      comment
    }
  }
  
  export function callLoadingComment(id) {
    return (dispatch) => {
      API.getComment(id).then(
        (response) => dispatch(loadingComment(id, response))
      )
    }
  }
  
  export function callNewComment(id) {
    return (dispatch) => {
      API.createComment(id).then(
        (response) => dispatch(loadingComment(id, response))
      )
    }
  }
  
  export function callEditComment(comment) {
    return (dispatch) => {
      API.editComment(comment).then(
        (response) => dispatch(loadingComment(comment.id, response))
      )
    }
  }
  
  export function removeComment(id) {
    return {
      type: REMOVE_COMMENT,
    }
  }
  
  export function callRemoveComment(id) {
    return (dispatch) => {
      API.deleteComment(id).then(
        () => dispatch(removeComment(id))
      )
    }
  }