import './Main.test';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



function Main() {
  const fromSearch = useFormik({
    initialValues: {
      from: '',
    },
    onSubmit: values => {
      fetch('http://localhost:4242/api/login', { 
          method: 'POST', 
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify({ email: values.email, password: values.password }) 
        } )
        .then(response => {
          let data = response.json();
          if(response.ok){
            sessionStorage.setItem("token", data.token);
            alert("Sucess!") //TODO: Delete this
          }else{
            alert("The email or password is incorrect! Try again.")
          }
        })
    },
  });
  
  const toSearch = useFormik({
    initialValues: {
      to: '',
    },
    onSubmit: values => {
      fetch('http://localhost:4242/api/login', { 
          method: 'POST', 
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify({ email: values.email, password: values.password }) 
        } )
        .then(response => {
          let data = response.json();
          if(response.ok){
            sessionStorage.setItem("token", data.token);
            alert("Sucess!") //TODO: Delete this
          }else{
            alert("The email or password is incorrect! Try again.")
          }
        })
    },
  });
  
  //TODO: Insert translation
  return (
    <>
      <div id="main-top">
        <div>
          <Form onBlur={fromSearch.handleSubmit}>
              <Form.Label htmlFor="from">Abfahrt:</Form.Label> 
              <Form.Control
                type="text"
                id="from"
                name="from"
              />
              <Form.Text id="passwordHelpBlock" muted>
                Abfahrtsort
              </Form.Text>
          </Form>
        </div>
        <Button variant="light">⇄</Button>
        <div>
        <Form onBlur={toSearch.handleSubmit}>
            <Form.Label htmlFor="to">Ziel:</Form.Label>
            <Form.Control
              type="text"
              id="to"
              name="to"
            />
            <Form.Text id="passwordHelpBlock" muted>
              Ankunftsort
          </Form.Text>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Main;
