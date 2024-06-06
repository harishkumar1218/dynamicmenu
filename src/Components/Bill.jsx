import React,{useState,useEffect} from 'react';
import { FaPercent,FaBuildingColumns } from "react-icons/fa6";
import useCachedFetch from '../customhooksFolder/useFetch';


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

  const [bill, setBill] = useState([]);
  const billRequest = {
    inputs:
    {
        restaurant_id: "66378cd6bed0587fd82cabb3",
        user: "hari"
    },
    action: "bill"
}
  const { data: billData, loading: billLoading, error: billError } = useCachedFetch("data", billRequest);
    useEffect(() => {
        if (billData) setBill(billData);
    }, [billData]);
 


  return (
    <div style={{backgroundColor:"white",padding:"10px",margin:"0px 5px" ,borderRadius:"20px",border: "1px solid #ccc"}}>

    <div className='cardFooter'>
        <h5>Subtotal</h5>
        <div>{bill.total}</div>
    </div>
    <div className='cardFooter'>
        <div><FaPercent/> Discount</div>
        <div style={{color:"green"}}>{bill.discount}%</div>
    </div>
    <div className='cardFooter'>
        <div><FaBuildingColumns/> Tax and Charges</div>
        <div>{bill.GST}</div>
    </div>
    <hr />
    <div className='cardFooter'>
        <div>Grand Total</div>
        <div>{bill.total-bill.discount-bill.GST}</div>
    </div>
    </div>
  );
};



const Bill = () => {
  return <Invoice />;
};

export default Bill;
