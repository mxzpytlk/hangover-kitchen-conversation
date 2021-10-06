import { Global, Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Global()
@Module({
  providers: [PubSub],
  exports: [PubSub],
})
export class SubscriptionModule {}
