import { api } from "./api";

export const statesRequest = () => api.get("/v2/admin/location/states");

export const districtsRequest = (stateId) =>
  api.get(`/v2/admin/location/districts/${stateId}`);

export const searchRequest = (districtId, date) =>
  api.get(
    `/v2/appointment/sessions/public/findByDistrict?district_id=${districtId}&date=${date}`
  );
