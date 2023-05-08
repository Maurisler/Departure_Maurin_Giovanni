import './Main.test';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
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

  let token = useRef()


  useEffect(() => {
    token.current = window.sessionStorage.getItem("token");
    getConnections(); 
  },[])

  function setVal(ref, value, response){

  }

  async function deleteConnection(id){
    fetch('http://localhost:4242/api/connections/' + id, { 
        method: 'DELETE', 
        headers: {'x-access-token': token.current}, 
    }).then(() =>{
      getConnections()
    });
  }

  async function getConnections(){
   fetch('http://localhost:4242/api/connections', { 
      method: 'GET', 
      headers: {'x-access-token': token.current}, 
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
    fetch('http://localhost:4242/api/connections', { 
      method: 'POST', 
      headers: {'Content-Type': 'application/json', 'x-access-token': token.current}, 
      body: JSON.stringify({ from: from, to: to }) 
    });
    getConnections();
  }


  async function swapVal(){
    await fromSearch.handleSubmit();
    await toSearch.handleSubmit();
    let temp = from;
    setFrom(to)
    setTo(temp)
    fromRef.current.value = temp;
    toRef.current.value = to;
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
      <h4>Gespeicherte Verbindungen:</h4>
        {
          connections.map(connection => (
            <Card>
              <p><b>Von:</b> {connection.from}</p>
              <p><b>Zu:</b> {connection.to}</p>
              <Button variant='danger' onClick={() => deleteConnection(connection.id)}>Entfernen</Button>
              <Link to={`/connection/` + connection.id}>
                <Button variant='primary'>Anschauen</Button>
              </Link>
            </Card>
          ))
        }
    </>
  );
}

export default Main;
