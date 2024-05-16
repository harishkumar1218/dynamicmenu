
import React from 'react';
import "./PopulerItems.css"
import { CCard, CCardImage, CCardTitle, CButton, CCardImageOverlay, CCardText, CPlaceholder, } from '@coreui/react'
import useCachedFetch from '../../customhooksFolder/useFetch';


const FPopulerItems = ({ img }) => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const { data, loading, error } = useCachedFetch(url);

  return (
    (loading) ? 
    (
      <div>
        <div className='scroll-container' style={{ overflowX: 'auto', whiteSpace: 'nowrap', padding: "10px 10px 0px 20px" }}>
        <div><CPlaceholder className="Populer-card" animation='wave' as="div" style={{backgroundColor:"gray",height:"300px",width:"350px"}}/></div>
        <div><CPlaceholder className="Populer-card" animation='wave' as="div" style={{backgroundColor:"gray",height:"300px",width:"350px"}}/></div>
        </div>
     </div>
    ) : (
      <div className='scroll-container' style={{ overflowX: 'auto', whiteSpace: 'nowrap', padding: "10px 10px 0px 20px" }}>
        <div style={{boxShadow: "0 4px 6px rgb(200, 200, 200)",borderRadius: "20px"}}>
          <CCard className="bg-dark text-white Populer-card" style={{ display: 'inline-block' }}>
            <CCardImage className="Populer-card" src={"https://source.unsplash.com/350x300/?chicken-biryani"} />
            <CCardImageOverlay className="CardOverlay" style={{ padding: "0%" }}>
              <div className="Populer-card-content">
                <div className='card-name'>
                  <CCardTitle >Biryani</CCardTitle>
                </div>
                <div className="card-footer">
                  <CCardText className="left-content" style={{ color: 'white', display: 'inline-block', verticalAlign: 'middle' }}>$99</CCardText>
                  <CButton color="danger" href="#" className="right-content">Add +</CButton>
                </div>
              </div>
            </CCardImageOverlay>
          </CCard>

        </div>
        <div>

          <CCard className="bg-dark text-white Populer-card" style={{ display: 'inline-block' }}>
            <CCardImage className="Populer-card" src={"https://b.zmtcdn.com/data/pictures/0/3990/38c826ebd2d9f339e499da120bfd5f93_featured_v2.jpg"} />
            <CCardImageOverlay className="CardOverlay" style={{ padding: "0%" }}>
              <div className="Populer-card-content">
                <div className='card-name'>
                  <CCardTitle >Biryani</CCardTitle>
                </div>
                <div className="card-footer">
                  <CCardText className="left-content" style={{ color: 'white', display: 'inline-block', verticalAlign: 'middle' }}>$99</CCardText>
                  <CButton color="danger" href="#" className="right-content">Add +</CButton>
                </div>
              </div>
            </CCardImageOverlay>
          </CCard>

        </div>
        <div>

          <CCard className="bg-dark text-white Populer-card" style={{ display: 'inline-block' }}>
            <CCardImage className="Populer-card" src={img} />
            <CCardImageOverlay className="CardOverlay" style={{ padding: "0%" }}>
              <div className="Populer-card-content">
                <div className='card-name'>
                  <CCardTitle >Biryani</CCardTitle>
                </div>
                <div className="card-footer">
                  <CCardText className="left-content" style={{ color: 'white', display: 'inline-block', verticalAlign: 'middle' }}>$99</CCardText>
                  <CButton color="danger" href="#" className="right-content">Add +</CButton>
                </div>
              </div>
            </CCardImageOverlay>
          </CCard>

        </div>
        <div>

          <CCard className="bg-dark text-white Populer-card" style={{ display: 'inline-block' }}>
            <CCardImage className="Populer-card" src={"https://b.zmtcdn.com/data/pictures/chains/3/18819953/35e32dbde0a32fbf185b222612bf46fe_featured_v2.jpg"} />
            <CCardImageOverlay className="CardOverlay" style={{ padding: "0%" }}>
              <div className="Populer-card-content">
                <div className='card-name'>
                  <CCardTitle >Biryani</CCardTitle>
                </div>
                <div className="card-footer">
                  <CCardText className="left-content" style={{ color: 'white', display: 'inline-block', verticalAlign: 'middle' }}>$99</CCardText>
                  <CButton color="danger" href="#" className="right-content">Add +</CButton>
                </div>
              </div>
            </CCardImageOverlay>
          </CCard>

        </div>
        <div>

          <CCard className="bg-dark text-white Populer-card" style={{ display: 'inline-block' }}>
            <CCardImage className="Populer-card" src={"https://b.zmtcdn.com/data/pictures/4/307784/68ef787bb85a31e11bd4f5998a82605c_featured_v2.jpg"} />
            <CCardImageOverlay className="CardOverlay" style={{ padding: "0%" }}>
              <div className="Populer-card-content">
                <div className='card-name'>
                  <CCardTitle >Biryani</CCardTitle>
                </div>
                <div className="card-footer">
                  <CCardText className="left-content" style={{ color: 'white', display: 'inline-block', verticalAlign: 'middle' }}>$99</CCardText>
                  <CButton color="danger" href="#" className="right-content">Add +</CButton>
                </div>
              </div>
            </CCardImageOverlay>
          </CCard>

        </div>
        <div>

          <CCard className="bg-dark text-white Populer-card" style={{ display: 'inline-block' }}>
            <CCardImage className="Populer-card" src={img} />
            <CCardImageOverlay className="CardOverlay" style={{ padding: "0%" }}>
              <div className="Populer-card-content">
                <div className='card-name'>
                  <CCardTitle >Biryani</CCardTitle>
                </div>
                <div className="card-footer">
                  <CCardText className="left-content" style={{ color: 'white', display: 'inline-block', verticalAlign: 'middle' }}>$99</CCardText>
                  <CButton color="danger" href="#" className="right-content">Add +</CButton>
                </div>
              </div>
            </CCardImageOverlay>
          </CCard>
          
        </div>
      </div>

    ));
}
export { FPopulerItems }


