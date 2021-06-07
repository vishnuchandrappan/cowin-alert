import React, { useEffect, useState } from "react";
import { api } from "../helpers/api";
import { Row, Spin, Col } from "antd";

export const PerformSearch = ({
  district_id,
  date,
  refreshTime,
  threshold,
}) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generalStyle = { background: '#00ffb398', margin: "0.5rem", textAlign: 'center' };
  const style = { ...generalStyle, background: "#ff004067", padding: "8px" };

  const audio = new Audio('https://freesound.org/data/previews/72/72125_1028972-lq.mp3');

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
        awaitAndFetch();
      });
  };

  const awaitAndFetch = () => {
    setTimeout(() => {
      if (district_id && date) {
        fetchSessions();
      }
    }, [refreshTime * 1000]);
  };

  useEffect(() => {
    fetchSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [district_id]);

  useEffect(() => {
    sessions.forEach((session) => {
      if (session.length > 0 && session.available_capacity > threshold) {
        console.log(session.center_id);
        audio.play();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions, threshold]);

  return (
    <div>
      <h1>Search results</h1>
      {loading && <Spin />}
      {sessions.length > 0 || error ? (
        <Row gutter={[32, 32]} className="states">
          {sessions.map((session) => {
            if (session.length > 0 && session.available_capacity > threshold) {
              return (
                <Col key={session.center_id} span={8}>
                  {session.name}
                </Col>
              );
            } else {
              return (
                <Col style={style} key={session.center_id} span={8}>
                  {session.name}
                </Col>
              );
            }
          })}
        </Row>
      ) : (
        <div>no results found</div>
      )}
    </div>
  );
};
