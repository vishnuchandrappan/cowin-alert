import { useContext } from "react"
import { AppContext } from "./services/AppService"
import { Row, Col } from "antd";
import { SelectState } from "./SelectState";
import { SelectDistrict } from "./SelectDistrict";

export const LocationSelector = () => {
  const {
    setSelectedDistrict,
    selectedState,
    setSelectedState,
  } = useContext(AppContext);

  const handleStateChange = (value) => {
    setSelectedState(value);
    setSelectedDistrict(null);
  };

  const selectDistrictProps = {
    state_id: selectedState,
    setSelectedDistrict,
  };

  return (
    <Row>
      <Col span={6}>
        <SelectState handleChange={handleStateChange} />
      </Col>
      <Col span={6}>
        {selectedState && <SelectDistrict {...selectDistrictProps} />}
      </Col>
    </Row>
  )
}
