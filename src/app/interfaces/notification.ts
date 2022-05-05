export interface Notification {
  type: 'success' | 'failure';
  message: string;
  errMsg?: string
}
