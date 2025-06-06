import { Config } from 'convict';
import { StatusCodes } from 'http-status-codes';
import { injectable, inject } from 'inversify';
import { BaseController } from '../../../controller/base-controller.js';
import { HttpError } from '../../../errors/http-error.js';
import { fillDTO } from '../../../helpers/common.js';
import { LoggerInterface } from '../../../logger/logger.interface.js';
import { AppComponent } from '../../../types/app-component.enum.js';
import { HttpMethod } from '../../../types/http-methods.enum.js';
import CreateUserDto from '../dto/create-user.dto.js';
import UserService from '../user.service.js';
import { Request, Response } from 'express';
import { UserRdo } from '../rdo/user.rdo.js';
import { RestSchema } from '../../../config/rest.shema.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(AppComponent.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(AppComponent.UserServiceInterface) private readonly userService: UserService,
    @inject(AppComponent.ConfigInterface) private readonly configService: Config<RestSchema>,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');
    this.addRoute({path: '/register', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/login', method: HttpMethod.Post, handler: this.login});
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);
    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }
    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login(
    { body }:Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    _res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);
    if (! existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController',
      );
    }
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }
}
