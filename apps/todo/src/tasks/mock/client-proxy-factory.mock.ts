import { MockType } from './mock.type';
import { ClientProxy } from '@nestjs/microservices';

export const clientProxyFactoryMock: () => MockType<ClientProxy> = jest.fn(
  () => ({
    emit: jest.fn(),
    send: jest.fn(),
    connect: jest.fn(),
    close: jest.fn(),
    routingMap: jest.fn(),
  }),
);
