import { STORAGE_TOKEN } from 'config/constants';

const { REACT_APP_TWILIO_TOKEN_ENDPOINT } = process.env;

type IRequestOptions = {
  payload?: object;
  query?: object;
  headers?: object;
};

type IFetchParam = {
  url: string;
  options: object;
};

class BaseService {
  baseUrl: string;

  public constructor(prefix) {
    this.baseUrl = `${REACT_APP_TWILIO_TOKEN_ENDPOINT}/${prefix}` || '';
  }

  protected prepare(method: string, url: string, option: IRequestOptions = {}) {
    const { payload, query = {}, headers = {} } = option;
    if (Object.keys(query).length) {
      const urlObject = new URL(url);
      Object.keys(query).forEach(function (key) {
        urlObject.searchParams.set(key, query[key]);
      });
      url = urlObject.toString();
    }

    const options = {
      method,
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    return { url, options };
  }

  protected async requestWithoutToken(
    method: string,
    rawUrl: string,
    rawOptions?: IRequestOptions,
  ) {
    const { url, options } = this.prepare(method, rawUrl, rawOptions);

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  }

  protected async requestWithToken(
    method: string,
    rawUrl: string,
    rawOptions?: IRequestOptions,
  ) {
    const token = localStorage.getItem(STORAGE_TOKEN);
    const headers = { Authorization: 'Bearer ' + token };
    const { url, options } = this.prepare(method, rawUrl, {
      ...rawOptions,
      headers,
    });

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  }
}

export default BaseService;
