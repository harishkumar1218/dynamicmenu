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
  const [cartItems, setCartItems] = useState({});
  useEffect(()=>(setCartItems(localStorage.getItem('cart')!=null? JSON.parse(localStorage.getItem('cart')):{})),[localStorage.getItem('cart')])
  var Total=0.0;
  Object.keys(cartItems).map((val)=>Total+=cartItems[val].price*(cartItems[val].count))
  Total=(Math.round(Total * 100) / 100);
  var finalTotal=0.0;
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


    finalTotal=Total+Total*(bill.GST-bill.discount)/100
    finalTotal=(Math.round(finalTotal * 100) / 100);

 


  return (
    <div style={{backgroundColor:"white",padding:"10px",margin:"0px 5px" ,borderRadius:"20px",border: "1px solid #ccc"}}>

    <div className='cardFooter'>
        <h6>Subtotal</h6>
        <div>${Total}</div>
    </div>
    <div className='cardFooter'>
        <div style={{display: "inline-flex",alignItems: "center"}}><FaPercent/><span style={{marginLeft:"5px"}} >Discount</span></div>
        <div style={{color:"green"}}>{bill.discount}%</div>
    </div>
    <div className='cardFooter'>
        <div style={{display: "inline-flex",alignItems: "center"}}><FaBuildingColumns /><span style={{marginLeft:"5px"}}> Tax and Charges</span></div>
        <div>+{bill.GST}%</div>
    </div>
    <hr />
    <div className='cardFooter'>
        <h6>Grand Total</h6>
        <div>${finalTotal}</div>
    </div>
    </div>
  );
};



const Bill = () => {
  return <Invoice />;
};

export default Bill;
