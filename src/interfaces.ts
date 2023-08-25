
export interface OnNewClients {
  connectedClients: Array<string>;
}

export interface OnMessageFromServer {
  fullName: string;
  message: string;
}
