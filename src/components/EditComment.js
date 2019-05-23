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
        <div className="voltar-btn-wrapper">
          <button><Link to="/post/${}">Voltar</Link></button>
        </div>
        <section className="main-content">
          <h3 className="post-form-title">Edit Comment</h3>
          <form className="post-form" onSubmit={this.handleEditComment}>
            <div className="form-group">
              <label>Author:</label>
              <input
                name="author"
                type="text"
                placeholder="Author"
                required
                value={this.state.author}
                onChange={(e) => this.handleInput(e)}
              />
            </div>
            <div className="form-group">
              <label>Body:</label>
              <textarea name="body" value={this.state.body} onChange={(e) => this.handleInput(e)}/>
            </div>
            <div className="form-group">
              <button>Edit</button>
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