import React, { useEffect, useState } from 'react';
import axios from 'axios';

const { kakao } = window;

export default function Localvisualization() {
    
    const url = `${window.location.origin}:5000`;
    const endpoint = "http://apis.data.go.kr/B551182/hospInfoService/getHospBasisList&_type=json";
    const encode_key = 'wYrsGHmnOkSlcx2izPC31W3GZ27XFRYNiQZFvb%2FDOzrQvLJ4zNjgjg9HpQaPZqOkNHT89x9Gqo2PVtpoLt6LdQ%3D%3D';
    const decode_key = 'wYrsGHmnOkSlcx2izPC31W3GZ27XFRYNiQZFvb/DOzrQvLJ4zNjgjg9HpQaPZqOkNHT89x9Gqo2PVtpoLt6LdQ==';
    const [userLat, setUserLat] = useState(37.503822);
    const [userLng, setUserLng] = useState(127.049085);

    async function getLocation() {
        const response = await axios.post(url + "/address/local", {
            method: "POST",
            body: JSON.stringify({
              userid: sessionStorage.userid,
            }),
            withCredentials: true,
        });
        setUserLat(response.data.lat)
        setUserLng(response.data.lng)
        console.log(response)
    }


    useEffect(() => {
        getLocation()
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
