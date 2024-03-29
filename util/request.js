import _ from "lodash";
import axios from "axios";
import ApiConfig from "../app/config/api-config";

const ax = axios.create({
  baseURL: ApiConfig.BASE_URL,
  timeout: 60000,
});
responseData = (res) => {
  return res.data;
};

checkStatus = (res) => {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }

  const error = new Error(res.statusText);
  error.response = res;
  throw error;
};

generateShortCutMethod = (_method) => {
  return (_path, _params = {}, _extendOption = {}) => {
    return call(_path, _.toUpper(_method), _params, _extendOption);
  };
};

call = (_path, _method, _params = {}, _extendOption = {}) => {
  let option = {
    url: _path,
    method: _method,
  };

  switch (_.toUpper(_method)) {
    case "PUT":
    case "POST":
    case "PATCH":
      option.data = _params;
      break;
    case "GET":
      option.params = _params;
      break;
    default:
      break;
  }

  option = {
    ...option,
    ..._extendOption,
  };

  return ax.request(option).then(checkStatus).then(responseData);
};

export default {
  call,
  get: generateShortCutMethod("GET"),
  post: generateShortCutMethod("POST"),
  put: generateShortCutMethod("PUT"),
  patch: generateShortCutMethod("PATCH"),
  delete: generateShortCutMethod("DELETE"),
};
