import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { MicroserviceHealthIndicator } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { BuiltinKafkaHealthService } from './builtin-kafka-health.service';

describe(BuiltinKafkaHealthService.name, () => {
  let module: TestingModule;
  let mockMicroserviceHealth: DeepMocked<MicroserviceHealthIndicator>;

  let service: BuiltinKafkaHealthService;

  beforeAll(async () => {
    mockMicroserviceHealth = createMock<MicroserviceHealthIndicator>();

    module = await Test.createTestingModule({
      providers: [
        BuiltinKafkaHealthService,
        {
          provide: MicroserviceHealthIndicator,
          useValue: mockMicroserviceHealth,
        },
      ],
    }).compile();

    service = module.get(BuiltinKafkaHealthService);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should call correctly', async () => {
    //Arrange
    mockMicroserviceHealth.pingCheck.mockResolvedValue({ kafka: { status: 'up' } });

    //Act
    const result = await service.check();

    //Assert
    expect(result['kafka'].status).toBe('up');
  });
});
