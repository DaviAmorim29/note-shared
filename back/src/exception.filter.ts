/*
https://docs.nestjs.com/exception-filters#exception-filters-1
*/

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from 'express';


@Catch(PrismaClientKnownRequestError)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    

    if (exception.code === 'P2025') {
      return response.status(404).json({
        statusCode: 404,
        message: exception.message
      })
    }
    console.error(exception)
    return response.status(500).json({
      message: 'Internal Server Error'
    })
  }
}