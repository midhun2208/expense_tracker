import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";


function Login() {

  const navigate = useNavigate()  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const handleLogin = async(e)=>{
        e.preventDefault()
        try {
            if(!email || !password){
                message.error("Enter the email and password")
            } 
            else{
                const {data} = await axios.post('http://localhost:5000/api/v1/login',{password,email})
                message.success('login Sucessful')
                localStorage.setItem('user', JSON.stringify({...data ,password:""}))
                navigate('/')
            }
        } catch (error) {
          message.error('Wrong email or password')
        }
    }
    useEffect(()=>{
      if(localStorage.getItem('user')){
        navigate('/')
      }
    },[])


  return (
    <>
      <Container className="" >
        
        <Row className="mt-2 p-5 ">
        <h1 className=" mb-3 " style={{color:"green",fontFamily:"cursive",fontSize:"45px"}}>Expense Tracker</h1>
          <Col md={12} lg={7} className="card p-5 text-dark shadow" style={{border:""}}><img src="https://img.freepik.com/free-vector/financial-accounting-female-accountant-cartoon-character-making-financial-report-summary-analysis-reporting-financial-statement-income-balance_335657-2380.jpg?w=740&t=st=1703187182~exp=1703187782~hmac=15c7ba89e7aae965bd709d026a70e15fcc03d3bdf6cefccb74ad6a193da6ae52" alt="" /></Col>
          <Col md={12} lg={4} className="card p-4 text-dark shadow " style={{border:""}}>
            <h1 className="text-center mb-4 mt-3">Login</h1>

            <div>
              <MDBInput
                className="mb-4"
                type="email"
                label="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <MDBInput
                className="mb-4"
                type="password"
                id="form1Example1"
                label="Enter the password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <MDBBtn className="form-control" onClick={handleLogin}>Login</MDBBtn>
            </div>
            <div className="mt-4 mb-2">
              <h4>Dont have a account?</h4>
            </div>

            <Link to={"/register"}>
              <MDBBtn className="form-control btn btn-dark">Register</MDBBtn>
            </Link>
          </Col>
          <Col ></Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
