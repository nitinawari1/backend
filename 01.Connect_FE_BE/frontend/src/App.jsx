import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios  from 'axios'

function App() {
  const [jokes, setjokes] = useState([])


  useEffect(() => {
   axios.get('/api/jokes')
   .then((responce)=>{
    setjokes(responce.data)
  }
   )
    .catch((error) => {
      // Handle error
      console.error('Error:', error.message);
    })
   })

  

  return (
    <>
     <h2>jokes{jokes.length}</h2>

     { jokes.map((joke)=>(
      <div key={joke.id}>
        <h3>{joke.title}</h3>
        <p>{joke.content}</p>
      </div>
     ))}

    </>
  )
}

export default App
