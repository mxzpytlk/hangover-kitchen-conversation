import { Catch } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Exception, ExceptionTypes } from 'src/core/shared/exception';
import { UserInputError, ApolloError } from 'apollo-server-errors';

@Catch(Error)
export class HttpExceptionFilter implements GqlExceptionFilter {
  private SERVER_ERROR_CODE = 'Server Error';
  private defaultExtensions = {
    exception: {
      stacktrace: [],
    },
  };

  public catch(exception: Error) {
    if (exception instanceof Exception) {
      if (exception.type === ExceptionTypes.USER_INPUT) {
        return new UserInputError(exception.message, this.defaultExtensions);
      }
    }
    return new ApolloError(
      exception.message,
      this.SERVER_ERROR_CODE,
      this.defaultExtensions,
    );
  }
}
