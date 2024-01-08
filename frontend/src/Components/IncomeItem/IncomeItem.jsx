import React, { useState } from "react";
import styled from "styled-components";
import { dateFormat } from "../../utils/dateFormat";
import {
  bitcoin,
  book,
  calender,
  card,
  circle,
  clothing,
  comment,
  dollar,
  food,
  freelance,
  medical,
  money,
  pen,
  piggy,
  stocks,
  takeaway,
  trash,
  tv,
  users,
} from "../../utils/Icons";
import Button from "../Button/Button";
import { MDBInput } from "mdb-react-ui-kit";
import Modal from "react-bootstrap/Modal";
import axios from 'axios'
import { message } from "antd";
import { useGlobalContext } from "../../context/globalContext";

function IncomeItem({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  indicatorColor,
  type,
}) {
  const categoryIcon = () => {
    switch (category) {
      case "salary":
        return money;
      case "freelancing":
        return freelance;
      case "investments":
        return stocks;
      case "stocks":
        return users;
      case "bitcoin":
        return bitcoin;
      case "bank":
        return card;
      case "other":
        return piggy;
      default:
        return "";
    }
  };

  const [update, setUpdate] = useState({
    title: "",
    amount: "",
    date: "",
    description: "",
  });
  console.log(update);

  const {getIncomes,getExpenses} = useGlobalContext()


 

  const handleSubmit = async()=>{
    if(!update.title || !update.amount || !update.date || !update.description){
      message.error("Fill all")
    }
    else{
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        await axios.post(("http://localhost:5000/api/v1/edit-incomes" ),{payload:{
        ...update,userid:user._id
        },id:id})
        message.success("Income Updated")
        handleClose()
        getIncomes()
        getExpenses()
        
      } catch (error) {
        message.error("Something Went Wrong")
      }
    }


  }
  const handleSubmitt = async()=>{
    if(!update.title || !update.amount || !update.date || !update.description){
      message.error("Fill all")
    }
    else{
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        await axios.post(("http://localhost:5000/api/v1/edit-expenses" ),{payload:{
        ...update,userid:user._id
        },id:id})
        message.success("Expense Updated")
        handleClose()
        getIncomes()
        getExpenses()
        
      } catch (error) {
        message.error("Something Went Wrong")
      }
    }


  }


  const expenseCatIcon = () => {
    switch (category) {
      case "education":
        return book;
      case "groceries":
        return food;
      case "health":
        return medical;
      case "subscriptions":
        return tv;
      case "takeaways":
        return takeaway;
      case "clothing":
        return clothing;
      case "travelling":
        return freelance;
      case "other":
        return circle;
      default:
        return "";
    }
  };
  const [show, setShow] = useState(false);

  const handleClose = () =>{
    
    setShow(false);
    setUpdate({
      title: "",
    amount: "",
    date: "",
    description: "",
    })
  } 
  const handleShow = () => setShow(true);

  return (
    <>
      <IncomeItemStyled indicator={indicatorColor}>
        <div className="icon">
          {type === "expense" ? expenseCatIcon() :  categoryIcon()}
        </div>
        <div className="content">
          <h5>{title}</h5>
          <div className="inner-content">
            <div className="text">
              <p>
                {dollar} {amount}
              </p>
              <p>
                {calender} {dateFormat(date)}
              </p>
              <p>
                {comment}
                {description}
              </p>
            </div>
            <div className="btn-con">
              <Button
                icon={trash}
                bPad={"1rem"}
                bRad={"50%"}
                bg={"var(--primary-color"}
                color={"#fff"}
                iColor={"#fff"}
                hColor={"var(--color-green)"}
                onClick={() => deleteItem(id)}
              />
              
              <Button
                icon={pen}
                bPad={"1rem"}
                bRad={"50%"}
                bg={"var(--primary-color"}
                color={"#fff"}
                iColor={"#fff"}
                hColor={"var(--color-green)"}
                
                onClick={handleShow }
              />
            </div>
          </div>
        </div>
      </IncomeItemStyled>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MDBInput
          
            placeholder={title}
            type="text"
            label="Title"
            className="mt-3"
            onChange={e=>setUpdate({...update,title:e.target.value})}
            
          />
          <MDBInput
          onChange={(e)=>setUpdate({...update,amount:e.target.value})}
            placeholder={amount}
            type="number"
            label="Amount"
            className="mt-3"
            
          />
          <MDBInput
          onChange={(e)=>setUpdate({...update,date:e.target.value})}
            placeholder={date}
            type="date"
            label="Date"
            className="mt-3"
          />
          <MDBInput
            type="text"
            label="Description"
            placeholder={description}
            className="mt-3"
            onChange={e=>setUpdate({...update,description:e.target.value})}
          />
        </Modal.Body>
        <Modal.Footer>
          {type == "expense" ? <button className=" btn btn-secondary" onClick={handleSubmitt }>
            Update
          </button> :<button className=" btn btn-secondary" onClick={handleSubmit }>
            Update
          </button>}
          <button className="btn btn-primary" onClick={handleClose} >
            close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const IncomeItemStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: #222260;
  .icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    i {
      font-size: 2.6rem;
    }
  }
  .input-control {
    input {
      width: 100%;
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    h5 {
      font-size: 1.3rem;
      padding-left: 2rem;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background: ${(props) => props.indicator};
      }
    }

    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-color);
          opacity: 0.8;
        }
      }
    }
  }
`;

export default IncomeItem;
