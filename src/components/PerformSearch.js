import { useEffect, useState } from "react";
import { Row, Spin, Col, Divider, Alert } from "antd";
import { api } from "../helpers/api";

export const PerformSearch = ({
  districtId,
  date,
  refreshTime,
  threshold,
  audio,
  dose = 1,
  minAgeLimit = 45,
  cost = "free",
  vaccine,
  muted,
  disablePreferences,
}) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availableSessions, setAvailableSessions] = useState([]);

  const style = {
    background: "#adc6ff",
    textAlign: "center",
    padding: "1rem",
    width: "100%",
    borderRadius: "2px",
  };

  const fetchSessions = () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    api
      .get(
        `/v2/appointment/sessions/public/findByDistrict?district_id=${districtId}&date=${date}`
      )
      .then((response) => {
        setSessions(response.data.sessions);
      })
      .catch((e) => {
        setError(e.response);
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (districtId && date) {
        fetchSessions();
      }
    }, [refreshTime * 1000]);
    return () => {
      clearTimeout(interval);
    };
  }, [date, refreshTime, districtId]);

  useEffect(() => {
    setAvailableSessions(
      sessions.filter((session) =>
        disablePreferences
          ? session.available_capacity >= threshold
          : session.fee_type === cost &&
            session[`available_capacity_dose${dose}`] >= threshold &&
            session.min_age_limit === minAgeLimit &&
            session.vaccine === vaccine
      )
    );
  }, [
    sessions,
    threshold,
    cost,
    dose,
    minAgeLimit,
    vaccine,
    disablePreferences,
  ]);

  useEffect(() => {
    if (availableSessions.length > 0 && !muted) {
      audio.play();
    }
  }, [availableSessions, audio, muted]);

  return (
    <Row>
      <Col style={{ height: "1.3rem" }} span={24}>
        {sessions.length} centres found{" "}
        {loading && <Spin style={{ display: "inline" }} size="small" />}
      </Col>
      <Col span={24} style={{ overflowX: "hidden" }}>
        {availableSessions.length > 0 ? (
          <Row gutter={[32, 32]} className="states">
            {availableSessions.map((session) => (
              <Col
                style={style}
                key={session.center_id}
                md={10}
                lg={6}
                offset={1}
              >
                <a
                  rel="noreferrer"
                  href="https://selfregistration.cowin.gov.in/"
                  target="_blank"
                >
                  {session.name}
                  <div>
                    <small style={{ display: "inline-block" }}>
                      Available {session.available_capacity}
                    </small>
                    {disablePreferences && (
                      <>
                        <small style={{ display: "inline-block" }}>
                          |&nbsp; {session.vaccine} |&nbsp;
                        </small>
                        {session.available_capacity_dose1 > 0 ? (
                          <small style={{ display: "inline-block" }}>
                            Dose 1 |&nbsp;
                          </small>
                        ) : (
                          <small style={{ display: "inline-block" }}>
                            Dose 2 |&nbsp;
                          </small>
                        )}
                        <small style={{ display: "inline-block" }}>
                          {session.fee_type} |&nbsp;
                        </small>
                        <small style={{ display: "inline-block" }}>
                          Age limit: {session.min_age_limit}
                        </small>
                      </>
                    )}
                  </div>
                </a>
              </Col>
            ))}
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
