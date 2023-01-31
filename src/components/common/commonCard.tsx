import React from "react";
import { Card } from "react-bootstrap";
const commonCard = (props: {
  temperature: any;
  date?: any;
  weather: any;
  city: any;
  icon?: any;
  wind?:any;
}) => {
    
  return (
    <Card>
      {props.icon ? (
        <Card.Img
          variant="top"
          src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`}
          style={{ objectFit: "cover", width: "100%" }}
        />
      ) : (
        ""
      )}

      <Card.Body>
        <Card.Title className="text-dark pb-3">City Name: {props.city}</Card.Title>
        {props.date ? (
          <p className="text-info">
            Date: {props.date?.slice(0, 10)}, Time:{" "}
            <span>{props.date?.slice(10)}</span>
          </p>
        ) : (
          ""
        )}
        {props.wind?<p className="text-secondary">Wind Speed: {props.wind}</p>:""}
        <p className="text-danger">Temperature: {props.temperature}°C</p>

        <p className="text-success">Weather: {props.weather}</p>
      </Card.Body>
    </Card>
  );
};

export default commonCard;
