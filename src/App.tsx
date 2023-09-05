import { useEffect, useState } from 'react'
import './App.css'

interface Person {
  firstName: string,
  lastName: string,
  age: number,
  email: string,
  phone: string,
}

interface User extends Pick<Person, "lastName" | "firstName" | "email"> {
  id: number,
  image:string,
  user: string,
  password: string
}

function App() {
  const [counter, setCounter] = useState(1)

  const [userData, setUserData] = useState<any>([])

  function getUser() {
    fetch('https://dummyjson.com/users/'+counter).then(res => res.json()).then(json => {
      console.log(json);
      setUserData([json]);
    });
  }

  function next(){
    if(counter>100) return;
    setCounter(counter+1);
  }
  function prev(){
    if(counter-1<=0) return;
    setCounter(counter-1);
  }

  const cards = userData.map((data: User, id: number) => { return (<div key={id}>
    <p>Name: {data.firstName} {data.lastName}</p>
    <p>Email: {data.email}</p>
    <img src={data.image}></img>
  </div>)})
  
  useEffect(getUser, [counter]);
  
  return (
    <div>
      <button onClick={() => next()}>Next</button>
      <button onClick={() => prev()}>Prev</button>
      {cards}
    </div>
  )
}
export default App
