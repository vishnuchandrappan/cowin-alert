import { Divider } from "antd";
import { DateSelector } from "./DateSelector";
import { LocationSelector } from "./LocationSelector";
import { Preferences } from "./Preferences";
import { SearchContainer } from "./SearchContainer";
import { AppService } from "./services/AppService";
import { DateService } from "./services/DateService";
import { PreferencesService } from "./services/PreferencesService";
import { Col, Row } from "antd";

export const Home = () => {
  return (
    <DateService>
      <PreferencesService>
        <AppService>
          <Row>
            <Col style={{margin: '2rem'}} span={11}>
              <DateSelector />
              <Divider />
              <Preferences />
              <Divider />
              <LocationSelector />
            </Col>
            <Col style={{margin: '2rem'}} span={11} offset={2}>
              <SearchContainer />
            </Col>
          </Row>
        </AppService>
      </PreferencesService>
    </DateService>
  )
}