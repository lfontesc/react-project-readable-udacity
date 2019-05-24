import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { callEditComment, callLoadingComment } from '../actions'
import { connect } from 'react-redux'

class EditComment extends Component {
  state = {
    author: '',
    body: ''
  }

  componentDidMount() {
    this.props.callLoadingComment(this.props.match.params.id)

    let comment = this.props.comment.comment

    this.setState({
      author: comment.author,
      body: comment.body
    })
  }

  componentWillReceiveProps(nextProps) {
    let comment = nextProps.comment.comment

    if(comment.deleted === true) {
      window.location = '/notfound'
    }

    this.setState({
      author: comment.author,
      body: comment.body
    })
  }

  handleEditComment = (e) => {
    e.preventDefault()

    let comment = {
      id: this.props.match.params.id,
      parentId: this.props.comment.comment.parentId,
      timestamp: Date.now(),
      author: e.target.author.value,
      body: e.target.body.value,
    }

    this.props.callEditComment(comment)

    window.location = '/posts/' + this.props.comment.comment.parentId
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <main>
           <div class="setanewpost">
              <a class="color"><Link to="/"><i class="fas fa-arrow-left color"></i></Link></a>
           </div>



        <section id="box-newpost" className="main-content">
          <h3 className="post-form-title roxo">Edit Comment</h3> <hr></hr>
          <form className="post-form" onSubmit={this.handleEditComment}>

          <div class="form-group col-md-12">
                <label for="exampleInputEmail1" className="roxo">Author</label>
                <input 
                type="text" 
                class="form-control" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                placeholder="Author"
                name="author" 
                value={this.state.author}
                onChange={(e) => this.handleInput(e)}
                />
          </div>

          <div class="form-group col-md-12">
            <label for="exampleFormControlTextarea1" className="roxo">Body: </label>
            <textarea name="body" class="form-control" id="exampleFormControlTextarea1" value={this.state.body} onChange={(e) => this.handleInput(e)} rows="3"></textarea>
          </div>

            <div className="form-group col-md-6">
              <button class="btn btn-roxo">Submit</button>
            </div>
          </form>
        </section>
      </main>
    )
  }
}

const mapStateToProps = ({ comment }) => ({
  comment
})

export default connect(mapStateToProps, { callLoadingComment, callEditComment })(EditComment)