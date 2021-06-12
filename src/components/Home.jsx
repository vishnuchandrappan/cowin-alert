import { Col, Row } from "antd";
import { DateSelector } from "./DateSelector";
import { LocationSelector } from "./LocationSelector";
import { Preferences } from "./Preferences";
import { SearchContainer } from "./SearchContainer";
import { Settings } from "./Settings";

export const Home = () => (
  <Row>
    <Col style={{ padding: "2rem" }} md={12}>
      <DateSelector />
      <Preferences />
      <LocationSelector />
      <Settings />
    </Col>
    <Col style={{ padding: "2rem" }} md={12}>
      <SearchContainer />
    </Col>
  </Row>
);
