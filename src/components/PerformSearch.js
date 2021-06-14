import { useEffect, useState } from "react";
import { Row, Spin, Col, Alert } from "antd";
import { searchRequest } from "../helpers/requests";
import { SessionCard } from "./SessionCard";
import { ANY } from "../helpers/constants";

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
  centres,
}) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availableSessions, setAvailableSessions] = useState([]);

  const fetchSessions = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const response = await searchRequest(districtId, date);
      setSessions(response.data.sessions);
    } catch (e) {
      setError(e.response);
    } finally {
      setLoading(false);
    }
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
      sessions.filter((session) => {
        if (disablePreferences) {
          return session.available_capacity >= threshold;
        }
        let stats = session[`available_capacity_dose${dose}`] >= threshold;

        if (vaccine !== ANY) {
          stats = stats && session.vaccine === vaccine;
        }

        if (cost !== ANY) {
          stats = stats && session.fee_type === cost;
        }

        if (minAgeLimit !== ANY) {
          stats = session.min_age_limit === minAgeLimit && stats;
        }

        if (centres.length > 0) {
          return (
            stats &&
            (centres.includes(session.name.toLowerCase()) ||
              centres.includes(`${session.pincode}`) ||
              centres.includes(session.block_name.toLowerCase()))
          );
        }

        return stats;
      })
    );
  }, [
    sessions,
    threshold,
    cost,
    dose,
    minAgeLimit,
    vaccine,
    disablePreferences,
    centres,
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
              <SessionCard
                disablePreferences={disablePreferences}
                session={session}
                key={session.center_id}
              />
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
    </Row>
  );
};
