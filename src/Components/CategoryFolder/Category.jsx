import React from 'react';
import './Category.css';
import { CCard, CPlaceholder, CCardBody, CCardImage, CCardTitle, CCol } from '@coreui/react';
import useCachedFetch from "../../customhooksFolder/useFetch";


const CardComponent = ({ img, name }) => {

  const url = "https://jsonplaceholder.typicode.com/todos/1";
  const loading=false;
  const placeHoldersList = [];
  

  const catogorylist = {
    0: {
      name: "biryani",
      imgUrl: "https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png",
    },
    1: {
      name: "Pizza",
      imgUrl: "https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c643349e97211634401116.png",
    },
    2: {
      name: "Veg biryani",
      imgUrl: "https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c643349e97211634401116.png",
    },
    3: {
      name: "biryani",
      imgUrl: "https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png",
    },
    4: {
      name: "biryani",
      imgUrl: "https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png",
    },
    5: {
      name: "biryani",
      imgUrl: "https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png",
    },
    6: {
      name: "biryani",
      imgUrl: "https://b.zmtcdn.com/data/dish_images/c2f22c42f7ba90d81440a88449f4e5891634806087.png",
    },
    7: {
      name: "biryani",
      imgUrl: "https://b.zmtcdn.com/data/dish_images/c2f22c42f7ba90d81440a88449f4e5891634806087.png",
    },
    8: {
      name: "biryani",
      imgUrl: "https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png",
    },
    9: {
      name: "biryani",
      imgUrl: "https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png",
    },
    10: {
      name: "biryani",
      imgUrl: "https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png",
    }
  };


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
            Object.keys(catogorylist).map((key) => {
              const item = catogorylist[key];
           
              return (
                <CCol xs style={{ marginRight: "5px" }}>
                  <CCard style={{ border: "0px" }} >
                    <CCardImage orientation="top" src={item.imgUrl} style={{ width: "100px", height: "100px", backgroundColor: "gray", borderRadius: "50%", boxShadow: "0 4px 6px rgb(128, 128, 128)" }} />
                    <CCardBody style={{ width: "100%" }}>
                      <CCardTitle className='card-title'>{item.name}</CCardTitle>
                    </CCardBody>
                  </CCard>
                  <CCard style={{ border: "0px" }} >
                    <CCardImage orientation="top" src={item.imgUrl} style={{ width: "100px", height: "100px", backgroundColor: "gray", borderRadius: "50%", boxShadow: "0 4px 6px rgb(128, 128, 128)" }} />
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
