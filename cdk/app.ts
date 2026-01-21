#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PricingApiStack } from './stacks/pricing-api-stack';

const app = new cdk.App();

new PricingApiStack(app, 'PricingApiStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
  },
  description: 'Pricing API Stack - Interview Challenge',
});
