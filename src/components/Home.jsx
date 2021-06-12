import { Divider } from "antd";
import { DateSelector } from "./DateSelector";
import { LocationSelector } from "./LocationSelector";
import { Preferences } from "./Preferences";
import { SearchContainer } from "./SearchContainer";
import { AppService } from "../services/AppService";
import { DateService } from "../services/DateService";
import { PreferencesService } from "../services/PreferencesService";
import { Col, Row } from "antd";

export const Home = () => {
  return (
    <DateService>
      <PreferencesService>
        <AppService>
          <Row>
            <Col style={{ padding: '2rem' }} md={12}>
              <DateSelector />
              <Divider />
              <Preferences />
              <Divider />
              <LocationSelector />
            </Col>
            <Col style={{ padding: '2rem' }} md={12}>
              <SearchContainer />
            </Col>
          </Row>
        </AppService>
      </PreferencesService>
    </DateService>
  )
}