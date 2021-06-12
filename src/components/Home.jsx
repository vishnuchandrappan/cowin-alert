import { DateSelector } from "./DateSelector";
import { LocationSelector } from "./LocationSelector";
import { Preferences } from "./Preferences";
import { SearchContainer } from "./SearchContainer";
import { AppService } from "../services/AppService";
import { DateService } from "../services/DateService";
import { PreferencesService } from "../services/PreferencesService";
import { Col, Row } from "antd";
import { Settings } from "./Settings";
import { SettingsService } from "../services/SettingsService";

export const Home = () => {
  return (
    <DateService>
      <PreferencesService>
        <AppService>
          <SettingsService>
            <Row>
              <Col style={{ padding: '2rem' }} md={12}>
                <DateSelector />
                <Preferences />
                <LocationSelector />
                <Settings />
              </Col>
              <Col style={{ padding: '2rem' }} md={12}>
                <SearchContainer />
              </Col>
            </Row>
          </SettingsService>
        </AppService>
      </PreferencesService>
    </DateService>
  )
}