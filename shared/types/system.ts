export type AnyFunction = (...args: any[]) => any;

export type JsendResponse = {
  status: string;
  requested_at?: string;
  result?: number;
  data?: any;
  message?: string;
};

export type Coords = {
  lon: number;
  lat: number;
};

export interface BaseDuck {
  name: string;
  coords: Coords;
}

export interface Duck extends BaseDuck {
  readonly id: string;
}
