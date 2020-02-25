import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// const initialMovie = {
//   title: '',
//   director: '',
//   metascore: '',
//   stars: '',
//   actors: [],
// };

const UpdateMovie = props => {
  // const [movie, setMovie] = useState(initialMovie);
  // jason used useState({ id: props.match.params.id }) for line above^
  const [ movie, setMovie ] = useState({ id: props.match.params.id })
  // const { id } = useParams();

  const { handleSubmit, register, errors } = useForm({});

  useEffect(() => {
    // const movieToUpdate = props.
  })

  const onSubmit = e => {
    // e.preventDefault();
    const movieUpdate = {
      ...movie,
      stars: movie.stars.split(', '),
    };

    axios
      .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movieUpdate)
      .then(res => {
        props.history.push('/')
      })
    // this.props.history.push('/');
  }

  const handleChange = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>Form Form Form
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name='title'
          placeholder='Title'
          onChange={handleChange}
          ref={register({
            required: 'Title required.'
          })}
        />
        {errors.title && errors.title.message}

        <input
          name='director'
          placeholder='Director'
          onChange={handleChange}
          ref={register({
            required: 'Director required.'
          })}
        />
        {errors.director && errors.director.message}

        <input
          name='metascore'
          placeholder='Metascore'
          onChange={handleChange}
          ref={register({
            required: 'Metascore required.'
          })}
        />
        {errors.metascore && errors.metascore.message}

        <input
          name='stars'
          placeholder='Stars'
          onChange={handleChange}
          ref={register({
            required: 'Stars required.'
          })}
        />
        {errors.stars && errors.stars.message}

        <button type='submit'>
          Edit Movie
        </button>
      </form>
    </div>
  )
}

export default UpdateMovie;

