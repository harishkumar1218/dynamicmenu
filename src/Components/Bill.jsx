import React from 'react';
import { FaPercent,FaBuildingColumns } from "react-icons/fa6";


const InvoiceItem = ({ item }) => {
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.quantity}</td>
      <td>{item.price}</td>
      <td>{item.quantity * item.price}</td>
    </tr>
  );
};



const Invoice = () => {
 


  return (
    <div style={{backgroundColor:"white",padding:"10px",margin:"0px 5px" ,borderRadius:"20px",border: "1px solid #ccc"}}>
    <div className='card-footer'>
        <h5>Subtotal</h5>
        <div>109.00</div>
    </div>
    <div className='card-footer'>
        <div><FaPercent/> Discount</div>
        <div style={{color:"green"}}>-8.00</div>
    </div>
    <div className='card-footer'>
        <div><FaBuildingColumns/> Tax and Charges</div>
        <div>25.00</div>
    </div>
    <hr />
    <div className='card-footer'>
        <div>Grand Total</div>
        <div>588.00</div>
    </div>
    </div>
  );
};



const Bill = () => {
  return <Invoice />;
};

export default Bill;
