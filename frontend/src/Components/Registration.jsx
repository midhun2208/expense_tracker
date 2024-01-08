import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
    MDBInput,
    MDBBtn
  } from 'mdb-react-ui-kit';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import {message} from "antd"


function Registration() {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    console.log(name,password,email);
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)

    const handleSubmit =async (e)=>{
        e.preventDefault()
       try {
        if(!name||!email||!password){
            message.error("Enter all the details")
        }
        else{
                setLoading(true)
                await axios.post('http://localhost:5000/api/v1/register',{name,password,email,})
                message.success("Register Succeful")
                setLoading(false)
                navigate('/login')
        }
       } catch (error) {
        setLoading(false)
        message.error("user Already registed")
       }
    }

    useEffect(()=>{
      if(localStorage.getItem('user')){
        navigate('/')
      }
    },[])


  return (
    <>
      <Container>
        <Row className="p-5 mt-2">
        <h1 className=" mb-3 " style={{color:"green",fontFamily:"cursive",fontSize:"45px"}}>Expense Tracker</h1>
        <Col md={12} lg={7} className="card p-5 text-dark shadow"><img src="https://img.freepik.com/free-vector/audit-concept-illustration_114360-6777.jpg?w=740&t=st=1703187076~exp=1703187676~hmac=1b3c01cdec50e69b9d9d1b5b6d135e6dfbaf3995b32e9e2e66e0510730e77638" alt="" /></Col>
          <Col md={12} lg={4} className="card p-4 text-dark shadow " style={{border:"" }}>
            <h1 className="text-center mb-4 mt-3">Regsitration</h1>
            <div>
              <MDBInput
                className="mb-4"
                type="text"
                label="Enter the Name"
                onChange={(e)=>setName(e.target.value)}
              />
            </div>

            <div>
              <MDBInput
                className="mb-4"
                type="email"
                label="Email address"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div>
              <MDBInput
                className="m"
                type="password"
                id="form1Example1"
                label="Enter the password"
                onChange={(e)=>setPassword(e.target.value)}
              />
              {/* <p className="mb-3 text-danger">password must conatin specialsymbols,numbers</p> */}
            </div>
            <div>
                <MDBBtn className="form-control mt-4" onClick={handleSubmit} >
                    Register
                </MDBBtn>
            </div>
            <div className="mt-4 mb-2">
                <h4>Already Registered?</h4>
            </div>
            
                    <Link to={"/login"}>
                    <MDBBtn className="form-control btn btn-dark">
                    Login
                    </MDBBtn>
                    </Link>
                
          </Col>
          <Col ></Col>
        </Row>
      </Container>
    </>
  );
}

export default Registration;
