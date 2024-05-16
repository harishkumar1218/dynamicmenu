import React from 'react';
import './Category.css';
import { CCard, CPlaceholder, CCardBody, CCardImage, CCardTitle, CCol } from '@coreui/react';
import  useCachedFetch  from "../../customhooksFolder/useFetch";


const CardComponent = ({ img, name }) => {

  const url="https://jsonplaceholder.typicode.com/todos/1";
  
  const { data, loading, error } =  useCachedFetch(url);
  console.log(data);

  return (
    (loading) ? (<div className="scroll-container" style={{ paddingTop: "10px" }}>
      <CCol xs>
        <CCard className="card" >
          <CPlaceholder as="div" style={{ width: "80px", height: "80px", backgroundColor: "gray", borderRadius: "50%", }} animation="wave" />
          <CCardBody style={{ width: "100%" }}>
            <CPlaceholder style={{ width: "100%" }} as={CCardTitle} animation="wave">
              <CPlaceholder style={{ width: '100%' }} />
            </CPlaceholder>
          </CCardBody>
        </CCard>

        <CCard className="card" >
          <CPlaceholder as="div" style={{ width: "80px", height: "80px", backgroundColor: "gray", borderRadius: "50%", }} animation="wave" />
          <CCardBody style={{ width: "100%" }}>
            <CPlaceholder style={{ width: "100%" }} as={CCardTitle} animation="wave">
              <CPlaceholder style={{ width: '100%' }} />
            </CPlaceholder>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs>
        <CCard className="card" >
          <CPlaceholder as="div" style={{ width: "80px", height: "80px", backgroundColor: "gray", borderRadius: "50%", }} animation="wave" />
          <CCardBody style={{ width: "100%" }}>
            <CPlaceholder style={{ width: "100%" }} as={CCardTitle} animation="wave">
              <CPlaceholder style={{ width: '100%' }} />
            </CPlaceholder>
          </CCardBody>
        </CCard>
        <CCard className="card" >
          <CPlaceholder as="div" style={{ width: "80px", height: "80px", backgroundColor: "gray", borderRadius: "50%", }} animation="wave" />
          <CCardBody style={{ width: "100%" }}>
            <CPlaceholder style={{ width: "100%" }} as={CCardTitle} animation="wave">
              <CPlaceholder style={{ width: '100%' }} />
            </CPlaceholder>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs>
        <CCard className="card" >
          <CPlaceholder as="div" style={{ width: "80px", height: "80px", backgroundColor: "gray", borderRadius: "50%", }} animation="wave" />
          <CCardBody style={{ width: "100%" }}>
            <CPlaceholder style={{ width: "100%" }} as={CCardTitle} animation="wave">
              <CPlaceholder style={{ width: '100%' }} />
            </CPlaceholder>
          </CCardBody>
        </CCard>
        <CCard className="card" >
          <CPlaceholder as="div" style={{ width: "80px", height: "80px", backgroundColor: "gray", borderRadius: "50%", }} animation="wave" />
          <CCardBody style={{ width: "100%" }}>
            <CPlaceholder style={{ width: "100%" }} as={CCardTitle} animation="wave">
              <CPlaceholder style={{ width: '100%' }} />
            </CPlaceholder>
          </CCardBody>
        </CCard>
      </CCol> </div>) : 
    (
      <div className="scroll-container" style={{ paddingTop: "10px" }}>
        <CCol xs>
          <CCard style={{border:"0px"}} >
            <CCardImage  orientation="top" src={"https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png"} style={{ width: "80px", height: "80px", backgroundColor: "gray", borderRadius: "50%", boxShadow: "0 4px 6px rgb(128, 128, 128)"}} />
            <CCardBody>
              <CCardTitle className='card-title'>{name}</CCardTitle>
            </CCardBody>
          </CCard>
          <CCard style={{border:"0px"}} >
            <CCardImage orientation="top" src={img} style={{ width: "80px", height: "80px", backgroundColor: "gray", borderRadius: "50%",boxShadow: "0 4px 6px rgb(128, 128, 128)" }} />
            <CCardBody>
              <CCardTitle className='card-title'>{name}</CCardTitle>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs>
          <CCard style={{border:"0px"}} >
            <CCardImage orientation="top" src={"https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c643349e97211634401116.png"} style={{ width: "80px", height: "80px", backgroundColor: "gray", borderRadius: "50%",boxShadow: "0 4px 6px rgb(128, 128, 128)" }} />
            <CCardBody>
              <CCardTitle className='card-title'>{name}</CCardTitle>
            </CCardBody>
          </CCard>
          <CCard style={{border:"0px"}} >
            <CCardImage orientation="top" src={"https://b.zmtcdn.com/data/dish_images/d19a31d42d5913ff129cafd7cec772f81639737697.png"} style={{ width: "80px", height: "80px", backgroundColor: "gray", borderRadius: "50%",boxShadow: "0 4px 6px rgb(128, 128, 128)" }} />
            <CCardBody>
              <CCardTitle className='card-title'>{name}</CCardTitle>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs>
          <CCard style={{border:"0px"}} >
            <CCardImage orientation="top" src={"https://b.zmtcdn.com/data/dish_images/197987b7ebcd1ee08f8c25ea4e77e20f1634731334.png"} style={{ width: "80px", height: "80px", backgroundColor: "gray", borderRadius: "50%",boxShadow: "0 4px 6px rgb(128, 128, 128)" }} />
            <CCardBody>
              <CCardTitle className='card-title'>{name}</CCardTitle>
            </CCardBody>
          </CCard>
          <CCard style={{border:"0px"}} >
            <CCardImage orientation="top" src={"https://b.zmtcdn.com/data/dish_images/d5ab931c8c239271de45e1c159af94311634805744.png"} style={{ width: "80px", height: "80px", backgroundColor: "gray", borderRadius: "50%",boxShadow: "0 4px 6px rgb(128, 128, 128)" }} />
            <CCardBody>
              <CCardTitle className='card-title'>{name}</CCardTitle>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs>
          <CCard style={{border:"0px"}} >
            <CCardImage orientation="top" src={"https://b.zmtcdn.com/data/dish_images/c2f22c42f7ba90d81440a88449f4e5891634806087.png"} style={{ width: "80px", height: "80px", backgroundColor: "gray", borderRadius: "50%",boxShadow: "0 4px 6px rgb(128, 128, 128)" }} />
            <CCardBody>
              <CCardTitle className='card-title'>{name}</CCardTitle>
            </CCardBody>
          </CCard>
          <CCard style={{border:"0px"}} >
            <CCardImage orientation="top" src={"https://b.zmtcdn.com/data/o2_assets/019409fe8f838312214d9211be010ef31678798444.jpeg"} style={{ width: "80px", height: "80px", backgroundColor: "gray", borderRadius: "50%",boxShadow: "0 4px 6px rgb(128, 128, 128)" }} />
            <CCardBody>
              <CCardTitle className='card-title'>{name}</CCardTitle>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs>
          <CCard style={{border:"0px"}} >
            <CCardImage orientation="top" src={"https://b.zmtcdn.com/data/dish_images/c953e5ca07150e9a51f8b21102e20f7e1634805157.png"} style={{ width: "80px", height: "80px", backgroundColor: "gray", borderRadius: "50%",boxShadow: "0 4px 6px rgb(128, 128, 128)" }} />
            <CCardBody>
              <CCardTitle className='card-title'>{name}</CCardTitle>
            </CCardBody>
          </CCard>
          <CCard style={{border:"0px"}} >
            <CCardImage orientation="top" src={"https://b.zmtcdn.com/data/o2_assets/8dc39742916ddc369ebeb91928391b931632716660.png"} style={{ width: "80px", height: "80px", backgroundColor: "gray", borderRadius: "50%",boxShadow: "0 4px 6px rgb(128, 128, 128)" }} />
            <CCardBody>
              <CCardTitle className='card-title'>{name}</CCardTitle>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs>
          <CCard style={{border:"0px"}} >
            <CCardImage orientation="top" src={"https://b.zmtcdn.com/data/dish_images/91c554bcbbab049353a8808fc970e3b31615960315.png"} style={{ width: "80px", height: "80px", backgroundColor: "gray", borderRadius: "50%",boxShadow: "0 4px 6px rgb(128, 128, 128)" }}  />
            <CCardBody>
              <CCardTitle className='card-title'>{name}</CCardTitle>
            </CCardBody>
          </CCard>
          <CCard style={{border:"0px"}} >
            <CCardImage orientation="top" src={"https://b.zmtcdn.com/data/dish_images/e44c42ff4b60b025225c8691ef9735b11635781903.png"} style={{ width: "80px", height: "80px", backgroundColor: "gray", borderRadius: "50%",boxShadow: "0 4px 6px rgb(128, 128, 128)" }} />
            <CCardBody>
              <CCardTitle className='card-title'>{name}</CCardTitle>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs>
          <CCard style={{border:"0px"}}>
            <CCardImage orientation="top" src={"https://d1rgpf387mknul.cloudfront.net/category/Home/web/1x_web_20240410063942722493_114x101png"} style={{ width: "80px", height: "80px", backgroundColor: "gray", borderRadius: "50%",boxShadow: "0 4px 6px rgb(128, 128, 128)" }} />
            <CCardBody>
              <CCardTitle className='card-title'>{name}</CCardTitle>
            </CCardBody>
          </CCard>
          <CCard style={{border:"0px"}} >
            <CCardImage orientation="top" src={"https://b.zmtcdn.com/data/o2_assets/d0bd7c9405ac87f6aa65e31fe55800941632716575.png"} style={{ width: "80px", height: "80px", backgroundColor: "gray", borderRadius: "50%",boxShadow: "0 4px 6px rgb(128, 128, 128)" }} />
            <CCardBody>
              <CCardTitle className='card-title'>{name}</CCardTitle>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs>
          <CCard style={{border:"0px"}} >
            <CCardImage orientation="top" src={"https://www.dominos.co.in/store-location/img/image1.jpg"} style={{ width: "80px", height: "80px", backgroundColor: "gray", borderRadius: "50%",boxShadow: "0 4px 6px rgb(128, 128, 128)" }} />
            <CCardBody>
              <CCardTitle className='card-title'>{name}</CCardTitle>
            </CCardBody>
          </CCard>
          <CCard style={{border:"0px"}} >
            <CCardImage orientation="top" src={"https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c643349e97211634401116.png"}style={{ width: "80px", height: "80px", backgroundColor: "gray", borderRadius: "50%",boxShadow: "0 4px 6px rgb(128, 128, 128)" }} />
            <CCardBody>
              <CCardTitle className='card-title'>{name}</CCardTitle>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs>
          <CCard style={{border:"0px"}} >
            <CCardImage orientation="top" src={"https://d1rgpf387mknul.cloudfront.net/category/Home/web/1x_web_20231123085514623967_114x101png"} style={{ width: "80px", height: "80px", backgroundColor: "gray", borderRadius: "50%",boxShadow: "0 4px 6px rgb(128, 128, 128)" }} />
            <CCardBody>
              <CCardTitle className='card-title'>{name}</CCardTitle>
            </CCardBody>
          </CCard>
          <CCard style={{border:"0px"}} >
            <CCardImage orientation="top" src={"https://d1rgpf387mknul.cloudfront.net/category/Home/web/1x_web_20220917071641152673_114x101png"} style={{ width: "80px", height: "80px", backgroundColor: "gray", borderRadius: "50%",boxShadow: "0 4px 6px rgb(128, 128, 128)" }} />
            <CCardBody>
              <CCardTitle className='card-title'>{name}</CCardTitle>
            </CCardBody>
          </CCard>
        </CCol>

      </div>)
  );
};


export { CardComponent };
