import { Col, Divider, Row, Switch } from "antd";
import { useContext } from "react";
import { SettingsContext } from "../services/SettingsService";

export const Settings = () => {
  const { muted, setMuted, disablePreferences, setDisablePreferences } =
    useContext(SettingsContext);

  return (
    <>
      <Row justify="space-around">
        <Col span={24}>
          <h1>Settings</h1>
        </Col>
        <Col span="50%">
          Mute alert
          <Switch
            style={{ marginLeft: "2rem" }}
            checked={muted}
            onChange={setMuted}
          />
        </Col>

        <Col span="50%">
          Disable preferences
          <Switch
            style={{ marginLeft: "2rem" }}
            checked={disablePreferences}
            onChange={setDisablePreferences}
          />
        </Col>
      </Row>
      <Divider />
    </>
  );
};
