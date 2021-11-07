#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { GreetingStack } from '../lib/greeting-stack';

const app = new cdk.App();
new GreetingStack(app, 'GreetingStack', {
  // env: { account: '123456789012', region: 'us-east-1' },
 stage: 'dev'
});
