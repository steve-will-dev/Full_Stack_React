import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Container, Card, Row } from 'react-bootstrap'

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fetchData, setFetchData] = useState([]);
  const [reload, setReload] = useState(false)
  const [lastNameUpdate, setLastNameUpdate] = useState("");

  useEffect(() => {
    setReload(false)
    console.log("DOM update")
    getData()
    console.log(fetchData)
  }, [reload]);

  const getData = async () => {
    try {
      axios.get("/api/get")
        .then((response) => {
          setFetchData(response.data)
        })
    }
    catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    if (name === "setFirstName") {
      setFirstName(value)
    } else {
      setLastName(value)
    }


    console.log("name =", name)
    console.log("value =", value)

  }

  const handleChange2 = (event) => {
    let value = event.target.value
    setLastNameUpdate(value)
    console.log("update", lastNameUpdate)
  }

  const submit = async () => {
    try {
      axios.post('/api/insert',
        {
          firstName,
          lastName
        }
      ).then(() => { setReload(true) })
    }
    catch (err) {
      // Handle Error Here
      console.error(err);
    };
    console.log(firstName, lastName)
  }

  const deleteIt = async (id) => {
    try {
      axios.delete(`/api/delete/${id}`)
        .then(() => { setReload(true) })
    }
    catch (err) {
      // Handle Error Here
      console.error(err);
    };
  }


  const edit = async (id) => {
    try {
      axios.put(`/api/update/${id}`, { lastNameUpdate })
        .then(() => { setReload(true) })
    }
    catch (err) {
      // Handle Error Here
      console.error(err);
    };
  }

  const card = (fetchData) =>
    fetchData.map((val, key) => {
      return (
        <Card key={key} style={{ width: '18rem' }} className='m-2'>
          <Card.Body>
            <Card.Title>{val.first_name}</Card.Title>
            <Card.Text>
              {val.last_name}
            </Card.Text>
            <input name='setLastName' onChange={handleChange2} placeholder='Update Last Name' ></input>
            <Button className='m-2' onClick={() => { edit(val.id) }}>Update</Button>
            <Button onClick={() => { deleteIt(val.id) }}>Delete</Button>
          </Card.Body>
        </Card>
      )
    })
  return (
    <div className='App'>
      <h1>Dockerized Fullstack React Application</h1>
      <div className='form'>
        <input name='setFirstName' placeholder='Enter First Name' onChange={handleChange} />
        <input name='setLastName' placeholder='Enter Last Name' onChange={handleChange} />
      </div>

      <Button className='my-2' variant="primary" onClick={submit}>Submit</Button> <br /><br />

      <Container>
        <Row>
          {card(fetchData)}
        </Row>
      </Container>
    </div>
  );
}

export default App;
