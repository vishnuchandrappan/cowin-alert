import { Fragment, useContext } from "react"
import { AppContext } from "../services/AppService"
import { Row, Col, Divider } from "antd";
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
    <Fragment>
      <Row>
        <Col span={24}>
          <h1>Select location</h1>
        </Col>
        <Col sm={12}>
          <SelectState handleChange={handleStateChange} />
        </Col>
        <Col sm={12}>
          {selectedState && <SelectDistrict {...selectDistrictProps} />}
        </Col>
      </Row>
      <Divider />
    </Fragment>
  )
}
