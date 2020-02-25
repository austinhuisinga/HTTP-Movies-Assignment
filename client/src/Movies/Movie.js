import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Link } from 'react-router-dom';
// Add a button in the movie component that routes you to your new route with the movies's id as the URL param

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  // handleUpdate = id => {
  //   // e.preventDefault();
  //   axios
  //     .put(`http://localhost:5000/api/movies/${id}`)
  //     .then(res => {
  //       this.props.history.push(`/update-movie:id`)
  //     })
  // }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div>
        <div className="save-wrapper">
          <MovieCard movie={this.state.movie} />
          <div className="save-button" onClick={this.saveMovie}>
            Save
          </div>

          
          {/* <div className='update-button' onClick={this.handleUpdate}>
            Update
          </div> */}
        </div>
        <Link 
          to={`/update-movie/${this.props.match.params.id}`}
          className='update-button'  
        >
          Update
        </Link>

      </div>
    );
  }
}
