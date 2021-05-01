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

  const fetchSessions = () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    api
      .get(
        `/v2/appointment/sessions/calendarByDistrict?district_id=${district_id}&date=${date}`
      )
      .then((response) => {
        console.log("sessions fetched", response.data);
        setSessions(response.data.centers);
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
      if (
        session.sessions.length > 0 &&
        session.sessions.available_capacity > threshold
      ) {
        console.log(session.center_id);
      }
    });
  }, [sessions, threshold]);

  return (
    <div>
      <h1>Search results</h1>
      {loading && <Spin />}
      {sessions.length > 0 || error ? (
        <Row gutter={[32, 32]} className="states">
          {sessions.forEach((session) => {
            if (
              session.sessions.length > 0 &&
              session.sessions.available_capacity > threshold
            ) {
              return (
                <Col key={session.center_id} span={8}>
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
