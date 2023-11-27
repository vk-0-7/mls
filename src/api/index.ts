import axios from "axios";

type Props = {
  url: string;
  method: string;
  data?: any;
  header?: boolean;
  bearer?: boolean;
};

const baseUrl = "https://backend.cftcommerce.com/api/";

const api = (props: Props) => {
  const obj: any = {
    url: baseUrl + props.url,
    method: props.method,
    data: props.data,
  };

  if (props.header && props.bearer) {
    obj.headers = {
      Authorization: `Bearer ${localStorage.getItem("session_token")}`,
    };
  } else if (props.header) {
    obj.headers = {
      Authorization: localStorage.getItem("session_token"),
    };
  }

  return axios(obj);
};

export default api;
