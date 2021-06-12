import React, { useEffect, useState } from "react";
import { api } from "../helpers/api";
import { Row, Spin, Col, Divider } from "antd";

export const PerformSearch = ({
  district_id,
  date,
  refreshTime,
  threshold,
  audio,
  dose = 1,
  minAgeLimit = 45,
  cost = "free",
}) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availableSessions, setAvailableSessions] = useState([]);

  const style = {
    background: "#adc6ff",
    textAlign: "center",
    padding: '1rem',
    width: '100%',
    borderRadius: '2px'
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
      clearTimeout(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, refreshTime, district_id]);

  useEffect(() => {
    setAvailableSessions(
      sessions.filter((session) => {
        return (
          session.fee_type === cost &&
          session[`available_capacity_dose${dose}`] >= threshold &&
          session.min_age_limit === minAgeLimit
        );
      })
    );
  }, [sessions, threshold, cost, dose, minAgeLimit]);

  useEffect(() => {
    if (availableSessions.length > 0) {
      audio.play();
    }
  }, [availableSessions, audio]);

  return (
    <Row>
      <h2>{date}</h2>
      {loading && <Spin />}
      <Col span={24}>{sessions.length} centres found</Col>
      <Col span={24} style={{ overflowX: 'hidden' }}>

        {availableSessions.length > 0 ? (
          <Row gutter={[32, 32]} className="states">
            {availableSessions.map((session) => (
              <Col style={style} key={session.center_id} md={10} lg={6} offset={1} >
                {session.name}
                <small style={{ display: "inline-block" }}>
                  ( {session.available_capacity} )
                </small>
              </Col>
            )
            )}
          </Row>
        ) : (
          <div>no centres available</div>
        )}
      </Col>

      {error && <small style={{ color: "crimson" }}>{error}</small>}

      <Divider />
    </Row>
  );
};
