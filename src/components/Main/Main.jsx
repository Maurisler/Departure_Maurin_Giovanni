import './Main.test';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import React, { useState, useEffect, useRef } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



function Main() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [connections, setConnections] = useState([]);

  const fromRef = useRef(null);
  const toRef = useRef(null);

  useEffect(() => {getConnections()},[])

  function setVal(ref, value, response){

  }

  async function deleteConnection(id){
    //let token = sessionStorage.getItem("token")
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiYWxpY2VAZXhhbXBsZS5jb20iLCJpYXQiOjE2ODM1MzQ0NzIsImV4cCI6MTY4MzU0MTY3Mn0.66Jp4LNVbdDMfsxQnUTIdJYjiwH6Ntm6c01wRvAWvr8";
    fetch('http://localhost:4242/api/connections/' + id, { 
        method: 'DELETE', 
        headers: {'x-access-token': token}, 
    }).then(() =>{
      getConnections()
    });
  }

  async function getConnections(){
   //let token = sessionStorage.getItem("token")
   let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiYWxpY2VAZXhhbXBsZS5jb20iLCJpYXQiOjE2ODM1MzQ0NzIsImV4cCI6MTY4MzU0MTY3Mn0.66Jp4LNVbdDMfsxQnUTIdJYjiwH6Ntm6c01wRvAWvr8";
   fetch('http://localhost:4242/api/connections', { 
      method: 'GET', 
      headers: {'x-access-token': token}, 
   }).then(response =>{
    if(response.ok){
      response.json().then(d => {
        setConnections(d)
      });
    }else{
      alert("Error")
    }
   });
  }
  
  async function submitConection(){
    //let token = sessionStorage.getItem("token")
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiYWxpY2VAZXhhbXBsZS5jb20iLCJpYXQiOjE2ODM1MzQ0NzIsImV4cCI6MTY4MzU0MTY3Mn0.66Jp4LNVbdDMfsxQnUTIdJYjiwH6Ntm6c01wRvAWvr8";
    fetch('http://localhost:4242/api/connections', { 
      method: 'POST', 
      headers: {'Content-Type': 'application/json', 'x-access-token': token}, 
      body: JSON.stringify({ from: from, to: to }) 
    });
    getConnections();
  }


  function swapVal(){
    let temp = from;
    setFrom(to)
    setTo(temp)
    try{
      fromRef.current.value = from;
      toRef.current.value = to;
    }catch(e){
    }
  }

  const fromSearch = useFormik({
    initialValues: {
      from: '',
    },
    onSubmit: () => {
      fetch('http://transport.opendata.ch/v1/locations?query=' + from, { 
          method: 'GET', 
        } )
        .then(response => {
          if(response.ok){
            response.json().then(d => {
              try{
                setFrom(fromRef.current.value = d.stations[0].name);
              }catch(error){
                alert("Error")
              }      
            });
          }else{
            alert("Error")
          }
      })
    },
  });
  
  const toSearch = useFormik({
    initialValues: {
      to: '',
    },
    onSubmit: () => {
      fetch('http://transport.opendata.ch/v1/locations?query=' + to, { 
          method: 'GET', 
        } )
        .then(response => {
          response.json().then(d => {
            if(response.ok){
              try{
                setTo(toRef.current.value = d.stations[0].name);
              }catch(error){
                alert("Error")
              }
            }else{
              alert("Error")
            }
          });
        })
    },
  });
  
  //TODO: Insert translation
  return (
    <>
      <div id="main-top">
        <div>
          <Form >
              <Form.Label htmlFor="from">Abfahrt:</Form.Label> 
              <Form.Control
                onBlur={fromSearch.handleSubmit}
                type="text"
                id="from"
                name="from"
                ref={fromRef}
                onChange={(e) => setFrom(e.target.value)}
              />
              <Form.Text id="passwordHelpBlock" muted>
                Abfahrtsort
              </Form.Text>
          </Form>
        </div>
        <Button variant="secondary" onClick={swapVal}>⇄</Button>
        <div>
          <Form >
            <Form.Label htmlFor="to">Ziel:</Form.Label>
            <Form.Control
              onBlur={toSearch.handleSubmit}
              type="text"
              id="to"
              name="to"
              ref={toRef}
              onChange={(e) => setTo(e.target.value)}
            />
            <Form.Text id="passwordHelpBlock" muted>
              Ankunftsort
            </Form.Text>
          </Form>
        </div>
        <Button variant="secondary" onClick={submitConection}>Hinzufügen</Button>
      </div>
      <ul>
        {
          connections.map(connection => (
            <Card>
              <p><b>Von:</b> {connection.from}</p>
              <p><b>Zu:</b> {connection.to}</p>
              <Button variant='danger' onClick={() => deleteConnection(connection.id)}>Entfernen</Button>
            </Card>
          ))
        }
      </ul>
    </>
  );
}

export default Main;
