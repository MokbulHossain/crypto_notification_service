import { Test, TestingModule } from '@nestjs/testing';
import { EmailSendController } from './email-send.controller';

describe('EmailSendController', () => {
  let controller: EmailSendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailSendController],
    }).compile();

    controller = module.get<EmailSendController>(EmailSendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
