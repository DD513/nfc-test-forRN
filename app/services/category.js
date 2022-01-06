import request from "../../util/request";

export function GET_thisCategory(id) {
  return request.get(`/equipment/${id}`, null, {
    headers: {
      Accept: `application/json`,
    },
  });
}
