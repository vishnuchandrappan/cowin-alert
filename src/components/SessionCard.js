import { Col } from "antd";

export const SessionCard = ({ session, disablePreferences }) => {
  const style = {
    background: "#adc6ff",
    textAlign: "center",
    padding: "1rem",
    width: "100%",
    borderRadius: "2px",
  };

  return (
    <Col style={style} md={10} lg={6} offset={1}>
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
  );
};
