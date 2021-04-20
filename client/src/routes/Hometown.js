import React, { useState, useEffect } from "react";

import axios from 'axios';

const { kakao } = window;

export default function Localvisualization() {
    
    const url = `${window.location.origin}:5000`;
    const [userLat, setUserLat] = useState(37.244);
    const [userLng, setUserLng] = useState(127.542);

    async function getLocation() {
        const response = await axios.post(url + "/", {
            method: "POST",
            body: JSON.stringify({
              userid: sessionStorage.userid,
            }),
            withCredentials: true,
        });

    }



    useEffect(() => {
        const container = document.getElementById('myMap');
		const options = {
			center: new kakao.maps.LatLng(userLat, userLng),
			level: 6
		};
        const map = new kakao.maps.Map(container, options);
    }, []);

    return (
        <div id='myMap' style={{
            width: '100%', 
            height: '100%'
        }}></div>
    );
}
