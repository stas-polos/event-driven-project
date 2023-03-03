export interface RmqModuleOptions {
  name: string;
  noAck: boolean;
  persistent: boolean;
  prefetchCount: number;
}
