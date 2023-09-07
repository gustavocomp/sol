import { Injectable } from '@angular/core';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

@Injectable({
  providedIn: 'root',
})
export class LogHttpInterceptorService {
  private readonly METHOD_COLORS = {
    GET: '#61affe',
    POST: '#49cc90',
    PUT: '#fca130',
    DELETE: '#f93e3e',
    PATCH: '#50e3c2',
  };

  private readonly TIME_STYLES = `
      font-size: 11px;
      color: #d3702a;
      `;

  private readonly URI_STYLES = `
      font-size: 10px;
      color: #E36EEC;
      `;

  private readonly ROUTE_STYLES = `
      font-size: 10px;
      margin: 5px 0;
      `;

  private readonly DATE_STYLES = `
      font-size: 10px;
      color: #8893EA;
      `;

  private buildHttpLogStyle(method: HttpMethod): string {
    const fontColor = '#ffffff';

    const bgColor = this.METHOD_COLORS[method];
    const styles = `
          font-size: 10px;
          border-radius: 3px;
          font-family: sans-serif;
          color:${fontColor};
          font-weight:bold;
          margin: 0 5px;
          background-color:${bgColor};
          padding: 3px 6px`;
    return styles;
  }

  logHttp<TResponse, TPayload>(
    path: string,
    payload: TPayload,
    responseData: TResponse,
    httpMethod: HttpMethod,
    headers: unknown,
    time: number
  ): void {
    const methodStyle = this.buildHttpLogStyle(httpMethod);
    const method = `%c${httpMethod.toUpperCase()}`;
    const pathRouter = path.toLowerCase();
    const date = new Date();

    const timeRequest = `\nRequest time: (${time.toFixed(3)} seconds)\n`.replace('.', ':');

    console.groupCollapsed(
      method + ` %c${pathRouter}` + `%c${timeRequest}` + `%c${date}`,
      methodStyle,
      this.ROUTE_STYLES,
      this.TIME_STYLES,
      this.DATE_STYLES
    );

    console.groupCollapsed('%cHeaders', this.URI_STYLES);
    console.info(headers);
    console.groupEnd();

    console.groupCollapsed('%cPayload', this.URI_STYLES);
    console.info(payload);
    console.groupEnd();

    console.group('%cResponse Data', this.URI_STYLES);
    console.info(responseData);
    console.groupEnd();

    console.groupEnd();
  }
}
