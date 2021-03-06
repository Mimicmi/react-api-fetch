import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Like = () => {
  const [count, setCount] = useState(0)
  const [liked, setLike] = useState(false)
  const [display, setDisplay] = useState(true)

  useEffect(() => {
    if(count>0)console.log('Number of like ' + count)
    if(count>= 5) {
      alert('Arrêt 5 likes')
      setDisplay(false)
    }
  }, [count]) 

    useEffect(() => {
      if(liked) console.log('You hit liked ' + liked)
    }, [liked])

  return(
    <>
    {(() => display ? <button onClick={() => setCount(count+1)}>
       {count} Like(s)</button> : <span>{count} Likes</span> )() } <br />
      <button onClick={()=>setLike(!liked)}>{count} Liked {liked.toString()}</button>
    </>
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
