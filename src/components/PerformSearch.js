import React, { useEffect, useState } from "react";
import { api } from "../helpers/api";
import { Row, Spin, Col } from "antd";

export const PerformSearch = ({
  district_id,
  date,
  refreshTime,
  threshold,
  audio,
  audio2,
}) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const style = {
    background: "#00ffb398",
    margin: "0.5rem",
    textAlign: "center",
  };

  const fetchSessions = () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    api
      .get(
        `/v2/appointment/sessions/public/findByDistrict?district_id=${district_id}&date=${date}`
      )
      .then((response) => {
        console.log("sessions fetched", response.data);
        setSessions(response.data.sessions);
      })
      .catch((error) => {
        console.log("error in fetching sessions");
        setError(error.response);
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (district_id && date) {
        fetchSessions();
      }
    }, [refreshTime * 1000]);
    return () => {
      clearTimeout(interval)
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, refreshTime, district_id]);

  useEffect(() => {
    sessions.forEach((session) => {
      console.log("avail", session.available_capacity);
      if (session.available_capacity >= threshold) {
        console.log(session.center_id);
        audio.play();
      }
      if (session.available_capacity_dose1 >= threshold) {
        console.log(session.center_id);
        audio2.play();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions, threshold]);

  return (
    <div>
      <h1>Search results - {date}</h1>
      {loading && <Spin />}
      {sessions.length > 0 || error ? (
        <Row gutter={[32, 32]} className="states">
          <Col span={18}>{sessions.length} centres found</Col>
          {sessions.map((session) => {
            if (session.available_capacity >= threshold) {
              return (
                <Col style={style} key={session.center_id} span={8}>
                  {session.name}
                  <small style={{display: 'inline-block'}}>( {session.available_capacity} )</small>
                </Col>
              );
            } else return null
          })}
        </Row>
      ) : (
        <div>no results found</div>
      )}
    </div>
  );
};
