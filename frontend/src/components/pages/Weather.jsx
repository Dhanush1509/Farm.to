import React,{useEffect} from 'react'
import axios from 'axios'

const GeoLocated= (props) =>{
useEffect(()=>{
    const {data}=axios.get()
//eslint-disable-next-line
},[])
    return !props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : props.coords ? (
      
    ) : (
      <div>Getting the location data&hellip; </div>
    );
  }


export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(GeoLocated);


