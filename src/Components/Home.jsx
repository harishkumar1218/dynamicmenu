import React from "react";
import { CardComponent } from "./CategoryFolder/Category";
import { FNavbar } from "./NavigationBarFolder/HomeNav";
import { FPopulerItems } from "./PopulerFolder/PopulerItems";

const HomePage = () => {
    return (
        <div style={{paddingBottom:60}}>
            <FNavbar />
            <div style={{ textAlign: 'center' }}>Whats on your Mind</div>
            <CardComponent img="https://www.dominos.co.in/store-location/img/image1.jpg" name="Button Name" />
            <div style={{ textAlign: 'center' }}>Top Populer</div>
            <FPopulerItems img="https://b.zmtcdn.com/data/pictures/0/20572180/8c4d071479d92fb0e80dbaa13236e9d4_o2_featured_v2.jpg?output-format=webp" />
            <div style={{ textAlign: 'center' }}>May be You like</div>
            <FPopulerItems img="https://b.zmtcdn.com/data/pictures/0/20572180/8c4d071479d92fb0e80dbaa13236e9d4_o2_featured_v2.jpg?output-format=webp" />
            <div style={{ textAlign: 'center' }}>Combos</div>
            <FPopulerItems img="https://b.zmtcdn.com/data/pictures/0/20572180/8c4d071479d92fb0e80dbaa13236e9d4_o2_featured_v2.jpg?output-format=webp" />
        </div>
    );
}

export { HomePage };