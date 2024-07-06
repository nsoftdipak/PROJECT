import { IHttpResponse } from 'src/interfaces/http.interface';

export class ResponseUtilService {
  static ResponseWrapper(result: IHttpResponse): any {
    const response = {
      status: result.status,
      timestamp: new Date().toISOString(),
    };
    if (result.status > 199 && result.status < 300) {
      response['data'] = result.data;
    } else {
      response['error'] = result.error;
    }
    return response;
  }

  static ResponseWrapperWithErrorData(result: IHttpResponse): any {
    return {
        status: result.status,
        error: result.error,
        data: result.data,
        timeStamp: new Date().toISOString()
    }
  }
}
