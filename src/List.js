import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Like = () => {
  const [count, setCount] = useState(0)

  return(
    <button onClick={()=>setCount(count+1)}>{count} Like(s)</button>
  )
}

class List extends React.Component {

  state = {
    error: null,
    isLoaded: false,
    items: []
  }

  componentDidMount() {
    console.log("componentDidMount");

    fetch('https://dekpo.herokuapp.com/posts')
      .then(response => response.json())
      .then(
        data => {
          this.setState({
            isLoaded: true,
            items: data
          })
          console.log('Fetch success', data)
        },
        error => {
          this.setState({
            error: error
          })
          console.log(error)
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return (
        <div>Oups ERROR</div>
      )
    } else if (!isLoaded) {
      return (
        <div>Chargement toujours en cours...</div>
      )
    } else {
      return (
        items.map(item => (
          <article key={item._id}>
            <p><Like /></p>
            <NavLink to={"/details/" + item._id}>
            {
            (() => {
              if (item.img) {
                return(
                  <img src={"https://dekpo.herokuapp.com/posts/" + item.img} width="100" alt={item.title} />
                )
              }
            })()
            }
          <p>{item.title}</p>
          </NavLink>
          </article>
        ))
      )
    }
  }
}

export default List;
