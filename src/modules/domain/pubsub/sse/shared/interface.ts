export interface IMessageEvent {
  data: string | { [x: string]: any };
  id?: string;
  type?: string;
  retry?: number;
}
