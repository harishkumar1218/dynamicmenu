// import React from 'react';
// import {
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CRow,
//   CContainer,
//   CWidgetStatsB,
//   CChartLine,
//   CChart
// } from '@coreui/react';

// const Dashboard = () => {
//   return (
//     <CContainer fluid>
//       <CRow className="my-3">
//         <CCol xs="12" md="6" xl="3">
//           <CWidgetStatsB
//             color="primary"
//             header="$64,320"
//             text="Earning"
//             footer="42.7% from last month"
//           />
//         </CCol>
//         <CCol xs="12" md="6" xl="3">
//           <CWidgetStatsB
//             color="danger"
//             header="3,209"
//             text="Customers"
//             footer="20.6% from last month"
//           />
//         </CCol>
//         <CCol xs="12" md="6" xl="3">
//           <CWidgetStatsB
//             color="success"
//             header="43"
//             text="Employees recruit"
//             footer="12.5% from last month"
//           />
//         </CCol>
//         <CCol xs="12" md="6" xl="3">
//           <CWidgetStatsB
//             color="danger"
//             header="5,730"
//             text="Total Orders"
//             footer="23.3% from last month"
//           />
//         </CCol>
//       </CRow>

//       <CRow>
//         <CCol xs="12" md="4">
//           <CCard>
//             <CCardHeader>Working Time</CCardHeader>
//             <CCardBody>
//               <div>Day shift: 32%</div>
//               <div>Overtime: 25%</div>
//               <div>Night shift: 43%</div>
//             </CCardBody>
//           </CCard>
//         </CCol>
//         <CCol xs="12" md="4">
//           <CCard>
//             <CCardHeader>Popular Time</CCardHeader>
//             <CCardBody>
//               <CChartLine
//                 datasets={[
//                   {
//                     label: 'Visitors',
//                     backgroundColor: 'rgba(220, 220, 220, 0.2)',
//                     borderColor: 'rgba(220, 220, 220, 1)',
//                     pointBackgroundColor: 'rgba(220, 220, 220, 1)',
//                     data: [10, 20, 30, 40, 50, 60, 70],
//                   },
//                 ]}
//                 labels={['2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm']}
//                 options={{
//                   maintainAspectRatio: false,
//                 }}
//               />
//             </CCardBody>
//           </CCard>
//         </CCol>
//         <CCol xs="12" md="4">
//           <CCard>
//             <CCardHeader>Food Order</CCardHeader>
//             <CCardBody>
//               <CChart type="doughnut"
//                 datasets={[
//                   {
//                     backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
//                     data: [40, 30, 30],
//                   },
//                 ]}
//                 labels={['Set menu', 'Alacarte menu', 'Hotpot menu']}
//                 options={{
//                   maintainAspectRatio: false,
//                 }}
//               />
//             </CCardBody>
//           </CCard>
//         </CCol>
//       </CRow>

//       <CRow>
//         <CCol xs="12" md="6">
//           <CCard>
//             <CCardHeader>Payment Method</CCardHeader>
//             <CCardBody>
//               <CChart type="doughnut"
//                 datasets={[
//                   {
//                     backgroundColor: ['#36A2EB', '#FF6384'],
//                     data: [60, 40],
//                   },
//                 ]}
//                 labels={['Transfer', 'Cash']}
//                 options={{
//                   maintainAspectRatio: false,
//                 }}
//               />
//             </CCardBody>
//           </CCard>
//         </CCol>
//         <CCol xs="12" md="6">
//           <CCard>
//             <CCardHeader>Revenue Statistic</CCardHeader>
//             <CCardBody>
//               <CChartLine
//                 datasets={[
//                   {
//                     label: 'Revenue',
//                     backgroundColor: 'rgba(151, 187, 205, 0.2)',
//                     borderColor: 'rgba(151, 187, 205, 1)',
//                     pointBackgroundColor: 'rgba(151, 187, 205, 1)',
//                     data: [30000, 40000, 50000, 60000, 70000, 60000, 50000],
//                   },
//                 ]}
//                 labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']}
//                 options={{
//                   maintainAspectRatio: false,
//                 }}
//               />
//             </CCardBody>
//           </CCard>
//         </CCol>
//       </CRow>
//     </CContainer>
//   );
// };

// export default Dashboard;





{/* <div ref={sectionRefs[0]} data-index={0}>
<div style={{ textAlign: 'center' }}>------------Veg Pizza------------</div>
<div>
    <CCard className="bg-dark text-white Populer-card" style={{ display: 'inline-block' }}>
        <CCardImage className="Populer-card" src={"https://b.zmtcdn.com/data/pictures/chains/3/18819953/35e32dbde0a32fbf185b222612bf46fe_featured_v2.jpg"} />
        <CCardImageOverlay className="CardOverlay" style={{ padding: "0%" }}>
            <div className="Populer-card-content">
                <div className='card-name'><CCardTitle >xyz</CCardTitle></div>
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
                <div className='card-name'><CCardTitle >abc</CCardTitle></div>
                <div className="card-footer">
                    <CCardText className="left-content" style={{ color: 'white', display: 'inline-block', verticalAlign: 'middle' }}>$99</CCardText>
                    <CButton color="danger" href="#" className="right-content">Add +</CButton>
                </div>
            </div>
        </CCardImageOverlay>
    </CCard>
</div>
</div>
<div ref={sectionRefs[1]} data-index={1}>
<div style={{ textAlign: 'center' }}>------------Non-Veg Pizza------------</div>
<div>
    <CCard className="bg-dark text-white Populer-card" style={{ display: 'inline-block' }}>
        <CCardImage className="Populer-card" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/rfnuftx62h1urssssipi"} />
        <CCardImageOverlay className="CardOverlay" style={{ padding: "0%" }}>
            <div className="Populer-card-content">
                <div className='card-name'>
                    <CCardTitle >bfs</CCardTitle>
                </div>
                <div className="card-footer">
                    <CCardText className="left-content" style={{ color: 'white', display: 'inline-block', verticalAlign: 'middle' }}>$99</CCardText>
                    <CButton color="danger" href="#" className="right-content">Add +</CButton>
                </div>
            </div>
        </CCardImageOverlay>
    </CCard>
</div>
<div >
    <CCard className="bg-dark text-white Populer-card" style={{ display: 'inline-block' }}>
        <CCardImage className="Populer-card" src={"https://b.zmtcdn.com/data/pictures/0/3990/38c826ebd2d9f339e499da120bfd5f93_featured_v2.jpg"} />
        <CCardImageOverlay className="CardOverlay" style={{ padding: "0%" }}>
            <div className="Populer-card-content">
                <div className='card-name'>
                    <CCardTitle >ifn</CCardTitle>
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
<div ref={sectionRefs[2]} data-index={2}>
<div style={{ textAlign: 'center' }}>------------Recommendation------------</div>
<div>
    <CCard className="bg-dark text-white Populer-card" style={{ display: 'inline-block' }}>
        <CCardImage className="Populer-card" src={"https://b.zmtcdn.com/data/pictures/chains/3/18819953/35e32dbde0a32fbf185b222612bf46fe_featured_v2.jpg"} />
        <CCardImageOverlay className="CardOverlay" style={{ padding: "0%" }}>
            <div className="Populer-card-content">
                <div className='card-name'>
                    <CCardTitle >uwhfie</CCardTitle>
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
        <CCardImage className="Populer-card" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/rfnuftx62h1urssssipi"} />
        <CCardImageOverlay className="CardOverlay" style={{ padding: "0%" }}>
            <div className="Populer-card-content">
                <div className='card-name'>
                    <CCardTitle >kuhf</CCardTitle>
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
<div ref={sectionRefs[3]} data-index={3}>
<div style={{ textAlign: 'center' }}>------------Biryani------------</div>
<div>
    <CCard className="bg-dark text-white Populer-card" style={{ display: 'inline-block' }}>
        <CCardImage className="Populer-card" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/rfnuftx62h1urssssipi"} />
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
</div> */}