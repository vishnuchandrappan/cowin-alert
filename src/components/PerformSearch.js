import React, { useContext, useEffect, useState } from "react";
import { api } from "../helpers/api";
import { Row, Spin, Col, Divider, Alert } from "antd";
import { SettingsContext } from "../services/SettingsService";

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

  const { muted } = useContext(SettingsContext);

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
    if (availableSessions.length > 0 && !muted) {
      audio.play();
    }
  }, [availableSessions, audio, muted]);

  return (
    <Row>
      <Col style={{ height: '1.3rem' }} span={24}>{sessions.length} centres found {loading && <Spin style={{ display: 'inline' }} size="small" />}</Col>
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
          <Alert
            message="No centres have vaccine slots available"
            type="error"
            showIcon
          />
        )}
      </Col>

      {error && <small style={{ color: "crimson" }}>{error}</small>}

      <Divider />
    </Row>
  );
};
