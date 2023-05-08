import './Connection.test';
import Card from 'react-bootstrap/Card';
import { useNavigate ,useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from "react-i18next";

function Connection() {
  const { t } = useTranslation();
  const [spinner, setSpinner] = useState(false); 
  let navigate = useNavigate();
  const connectionId = useParams().connectionId;
  let from;
  let to;
  const [connections, setConnections] = useState([]);

  let token = useRef()

  useEffect(() => {
    token.current = window.sessionStorage.getItem("token");
    if(token.current === null){
      navigate("/");
    }

    getUserConnection(connectionId)

    const interval = setInterval(() => {
      getUserConnection(connectionId);
    }, 60000);
  
    return () => clearInterval(interval);
  }, [])


  async function getUserConnection(connectionId){
   fetch('http://localhost:4242/api/connections', { 
      method: 'GET', 
      headers: {'x-access-token': token.current}, 
   }).then(response =>{
    if(response.ok){
      return response.json();
      
    }else{
      //TODO:ERROR
    }
   }).then(d => {
    console.log(d)
    d.forEach(e => {
      if(parseInt(e.id) === parseInt(connectionId)){
        from = e.from;
        to = e.to;
        return;
      }
    })
    getConnections();
    });
  }

  async function getConnections(){
    if(from === undefined || to === undefined){
      navigate("/errorpage")
    }
    fetch('http://transport.opendata.ch/v1/connections?from="' + from + '"&to="' + to + '"&limit=5', { 
        method: 'GET'
    }).then(response =>{
      if(response.ok){
        setSpinner(true)
        response.json().then(d => {
          setConnections(d.connections)
        });
      }else{
        //TODO:ERROR
      }
    });
  }

  function getTimeDifference(timestamp) {
    const currentTime = new Date();
    const targetTime = new Date(timestamp);
    const timeDifference = Math.abs(targetTime - currentTime);
  
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
  
    let timeDiffString = '';
  
    if (currentTime < targetTime) {
      timeDiffString = getTimeDesc(timeDifference, minute, hour, day)

    } else {
      timeDiffString = t("missed_train");
    }
  
    return timeDiffString;
  }
  
  function getTimeDesc(time,minute, hour, day){
    let timeString = ""
    const days = Math.floor(time / day);
    const hours = Math.floor((time % day) / hour);
    const minutes = Math.floor((time % hour) / minute);

    if (days> 0) {
      timeString += `${days} ${t("day")}${days > 1 ? t("multiple_day_end")  : ''}, `;
    }
    if (hours > 0) {
      timeString += `${hours} ${t("hour")}${hours > 1 ? t("multiple_hour_end") : ''}, `;
    }
    if (minutes === 1) {
      timeString += `1 ` + t("minute");
    } else if (minutes > 1 || time === '') {
      timeString += `${minutes} ${t("minute")}${t("multiple_minute_end")}`;
    }

    return timeString
  }
  
  //TODO: Insert translation
  return (
    <div id='connection-page'>
      {
        spinner ?
        (
        //TODO: if first connection is tommorow, mark as next day only
        connections.map(connection => (
            <Card>
              <p><b>{t("from")}:</b> {connection.from.station.name}</p>
              <p><b>{t("to")}:</b> {connection.to.station.name}</p>
              <p><b>{t("departs_in")}:</b> {getTimeDifference(connection.from.departure)}</p>
              <p><b>{t("delay")}:</b> {connection.from.delay == null ? t("unknown") : (connection.from.delay + t("minute") + t("multiple_minute_end"))}</p>
              <p><b>{t("status")}:</b> {getTimeDifference(connection.from.departure) === t("missed_train") ? t("missed") : t("available")}</p>
              <p><b>{t("duration")}:</b> {connection.to.platform}</p>
            </Card>
        ))
        )
        :
        <Spinner animation="border" variant="primary" id='loading-element'/>
      }
    </div>
  );
}

export default Connection;
