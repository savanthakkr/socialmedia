import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';




const Login = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    

    
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        // login authentication
        try {
          const setCookie = (name, value, days) => {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            const expires = "expires=" + date.toUTCString();
            document.cookie = name + "=" + value + ";" + expires + ";path=/";
           
          };
          const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
          setCookie('jwt', 'Bearer ' + response.data.token);
          
      
          if (response.status === 200) {

            const token = response.data.token;
            console.log('Token:', token);


            localStorage.setItem('accessToken', token);

      
            navigate('/allPost');
          } else {
            console.log('Login failed:', response.data.message);
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };



      


    // const handleSubmit = async (e) => {
        
    //     e.preventDefault();
    //     // login authentication 
    //     try {
    //         const setCookie = (name, value, days) => {
    //             const date = new Date();
    //             date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    //             const expires = "expires=" + date.toUTCString();
    //             document.cookie = name + "=" + value + ";" + expires + ";path=/";
    //           };
              
    //           // Usage example
              
    //         const response = await axios.post('http://localhost:5000/login', { email, password });
    //         setCookie('jwt','Bearer '+response.data.token, );

            
    //         if ( response.status===200) {

    //            // response.status==200
    //            //document.cookie('jwt', response.headers['Set-Cookie'],{maxage:24*60*60*1000})
    //            //document.cookie = `jwt=Bearer ${response.data.token};max-age=604800;HttpOnly=true`;


    //            navigate('/search');
    //         } else {
    //           console.log('Login failed:', response.data.message);
    //         }
    //       } catch (error) {
    //         console.error('An error occurred:', error);
    //       }
    //     console.log('email:', email);
    //     console.log('Password:', password);
    //     // console.log(token);
    // };


    // show token on console when user can login success 

    return (
        <Container className="">
            <div className="login-form ">
                <h3 className="text-center">Login</h3>
                <Form onSubmit={handleSubmit} className="mt-3">
                    <Form.Group controlId="formUsername">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 mt-3">
                        Login
                    </Button>
                </Form>
            </div>
            
        </Container>
    );
};

export default Login;


