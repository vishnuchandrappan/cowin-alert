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
      clearTimeout(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, refreshTime, district_id]);

  useEffect(() => {
    setAvailableSessions(
      sessions.filter((session) => {
        return (
          session.fee_type.toLowerCase() === cost &&
          session[`available_capacity_dose${dose}` >= threshold] &&
          session.min_age_limit >= minAgeLimit
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
    <div>
      <h2>{date}</h2>
      {loading && <Spin />}
      <Col span={18}>{sessions.length} centres found</Col>
      {availableSessions.length > 0 ? (
        <Row gutter={[32, 32]} className="states">
          {availableSessions.map((session) => (
            <Col style={style} key={session.center_id} span={8}>
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

      {error && <small style={{ color: "crimson" }}>{error}</small>}

      <Divider />
    </div>
  );
};
