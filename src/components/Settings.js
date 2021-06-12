import { Col, Divider, Row, Switch } from "antd"
import { useContext } from "react"
import { SettingsContext } from "../services/SettingsService"

export const Settings = () => {
  const { muted, setMuted } = useContext(SettingsContext);

  return (
    <>
      <Row>
        <Col span={24}>
          <h1>Settings</h1>
        </Col>
        <Col sm={8}>Mute alert</Col>
        <Col sm={16}>
          <Switch defaultChecked={muted} onChange={setMuted} />
        </Col>
      </Row>
      <Divider />
    </>
  )
}
