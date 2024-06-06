import React, { useState, useEffect} from 'react';
import './Category.css';
import { CCard, CPlaceholder, CCardBody, CCardImage, CCardTitle, CCol } from '@coreui/react';
import useCachedFetch from "../../customhooksFolder/useFetch";
import { Navigate, useNavigate } from 'react-router-dom';


const CardComponent = ({ img, name, }) => {
  const navigate = useNavigate();
  const loading=false;
  const placeHoldersList = [];
  const [populerList, setPopulerList] = useState([]);

  const populerRequest = {
    inputs:
    {
        restaurant_id: "66378cd6bed0587fd82cabb3",
        user: "hari"
    },
    action: "populer"
}
  
  const { data: populerData, loading: populerLoading, error: populerError } = useCachedFetch("home", populerRequest);
  useEffect(() => {
      if (populerData) setPopulerList(populerData);
  }, [populerData]);


  const PlaceholderCard = () => (
    <CCard style={{ border: "0px" }} className="card">
      <CPlaceholder as="div" style={{ width: "100px", height: "100px", backgroundColor: "gray", borderRadius: "50%" }} animation="wave" />
      <CCardBody style={{ width: "100%" }}>
        <CPlaceholder style={{ width: "100%" }} as={CCardTitle} animation="wave">
          <CPlaceholder style={{ width: '100%', borderRadius: "20px" }} />
        </CPlaceholder>
      </CCardBody>
    </CCard>
  );

  for (let i = 0; i < 3; i++) {
    placeHoldersList.push(
      <CCol xs>
        <PlaceholderCard/>
        <PlaceholderCard/>
      </CCol>
    );
  }

  return (
    (loading) ?
      (
        <div className="scroll-container" style={{ paddingTop: "10px" }}>
          {
            placeHoldersList.map((item) => item)
          }
        </div>
      ) : (
     
        <div className="scroll-container" style={{ paddingTop: "10px" }}>
          {
            populerList.map((value,index) => {
              const item = value;
              return (
                <CCol xs style={{ marginRight: "5px" }}>
                  <CCard style={{ border: "0px" }} >
                    <CCardImage onClick={() => {navigate("/menu",{ state: { initActiveTab: index } })}} orientation="top" src={item.img_url} style={{ width: "100px", height: "100px", backgroundColor: "gray", borderRadius: "50%", boxShadow: "0 4px 6px rgb(128, 128, 128)" }} />
                    <CCardBody style={{ width: "100%" }}>
                      <CCardTitle className='card-title'>{item.name}</CCardTitle>
                    </CCardBody>
                  </CCard>
                  <CCard style={{ border: "0px" }} >
                    <CCardImage orientation="top" src={item.img_url} style={{ width: "100px", height: "100px", backgroundColor: "gray", borderRadius: "50%", boxShadow: "0 4px 6px rgb(128, 128, 128)" }} />
                    <CCardBody style={{ width: "100%" }}>
                      <CCardTitle className='card-title'>{item.name}</CCardTitle>
                    </CCardBody>
                  </CCard>
                </CCol> 
                
              )
            })}
        </div>
        )
  );
};


export { CardComponent };
