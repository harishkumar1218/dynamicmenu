import React, { useEffect, useLayoutEffect, useState } from "react";
import { CardComponent } from "./CategoryFolder/Category";
import { FNavbar } from "./NavigationBarFolder/HomeNav";
import { FPopulerItems } from "./PopulerFolder/PopulerItems";
import useCachedFetch from "../customhooksFolder/useFetch";
import { CPlaceholder, } from '@coreui/react';


const HomePage = () => {
    const [populer, setPopuler] = useState([]);
    const [recomended, setRecommended] = useState([]);
    const [combo, setCombo] = useState([]);
    

    const populerRequest = {
        inputs:
        {
            restaurant_id: "66378cd6bed0587fd82cabb3",
            user: "hari"
        },
        action: "populer"
    }
    const recommendedRequest = {
        inputs:
        {
            restaurant_id: "66378cd6bed0587fd82cabb3",
            user: "hari"
        },
        action: "recommended"
    }
    const comboRequest = {
        inputs:
        {
            restaurant_id: "66378cd6bed0587fd82cabb3",
            user: "hari"
        },
        action: "combo"

    };

    const { data: populerData, loading: populerLoading, error: populerError } = useCachedFetch("home", populerRequest);
    useEffect(() => {
        if (populerData) setPopuler(populerData);
    }, [populerData]);

    const { data: recommendedData, loading: recommendedLoading, error: recommendedError } = useCachedFetch("home", recommendedRequest);
    useLayoutEffect(() => {
        if (recommendedData) setRecommended(recommendedData);
    }, [recommendedData]);


    const { data: comboData, loading: comboLoading, error: comboError } = useCachedFetch("home", comboRequest);
    useLayoutEffect(() => {
        if (comboData) setCombo(comboData);
    }, [comboData]);






    return (
        <div style={{ paddingBottom: 60 }}>
            <FNavbar />
            <div style={{ textAlign: 'center' }}>Whats on your Mind</div>
            <CardComponent img="https://www.dominos.co.in/store-location/img/image1.jpg" name="Button Name" />

            {populerData ?
                (<>
                    <div style={{ textAlign: 'center' }}>Top Populer</div>
                    <FPopulerItems itemList={populer} />
                </>
                ) : <>
                    <div style={{ textAlign: 'center' }}><CPlaceholder style={{ borderRadius: "20px" }} xs={5} /></div>
                    <div>
                        <div className='scroll-container' style={{ overflowX: 'auto', whiteSpace: 'nowrap', padding: "10px 10px 0px 20px" }}>
                            <div><CPlaceholder className="PopulerCard" animation='wave' as="div" style={{ borderRadius:"20px", backgroundColor: "gray", height: "300px", width: "350px" }} /></div>
                            <div><CPlaceholder className="PopulerCard" animation='wave' as="div" style={{ borderRadius:"20px", backgroundColor: "gray", height: "300px", width: "350px" }} /></div>
                        </div>
                    </div>
                </>
            }

            {recommendedData ?
                (<>
                    <div style={{ textAlign: 'center' }}>May be You like</div>
                    <FPopulerItems itemList={recomended} />
                </>
                ) :
                <>
                    <div style={{ textAlign: 'center' }}><CPlaceholder xs={6} /></div>
                    <div>
                        <div className='scroll-container' style={{ overflowX: 'auto', whiteSpace: 'nowrap', padding: "10px 10px 0px 20px" }}>
                            <div><CPlaceholder className="PopulerCard" animation='wave' as="div" style={{ borderRadius:"20px", backgroundColor: "gray", height: "300px", width: "350px" }} /></div>
                            <div><CPlaceholder className="PopulerCard" animation='wave' as="div" style={{ borderRadius:"20px", backgroundColor: "gray", height: "300px", width: "350px" }} /></div>
                        </div>
                    </div>
                </>
            }

            {recomended ?
                (<>
                    <div style={{ textAlign: 'center' }}>Combos</div>
                    <FPopulerItems itemList={recomended} />
                </>
                ) :
                <>
                    <div style={{ textAlign: 'center' }}><CPlaceholder xs={6} /></div>
                    <div>
                        <div className='scroll-container' style={{ overflowX: 'auto', whiteSpace: 'nowrap', padding: "10px 10px 0px 20px" }}>
                            <div><CPlaceholder className="PopulerCard" animation='wave' as="div" style={{ borderRadius:"20px", backgroundColor: "gray", height: "300px", width: "350px" }} /></div>
                            <div><CPlaceholder className="PopulerCard" animation='wave' as="div" style={{ borderRadius:"20px", backgroundColor: "gray", height: "300px", width: "350px" }} /></div>
                        </div>
                    </div>
                </>
            }


        </div>
    );
}

export { HomePage };

