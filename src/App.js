import "./App.css";
import "antd/dist/antd.css";
import { Home } from "./components/Home";
import { StorageService } from "./services/StorageService";
import { DateService } from "./services/DateService";
import { PreferencesService } from "./services/PreferencesService";
import { AppService } from "./services/AppService";
import { SettingsService } from "./services/SettingsService";

function App() {
  return (
    <StorageService>
      <DateService>
        <PreferencesService>
          <AppService>
            <SettingsService>
              <Home />
            </SettingsService>
          </AppService>
        </PreferencesService>
      </DateService>
    </StorageService>
  );
}

export default App;
