import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

export class PricingApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Environment configuration
    // TODO: This should be configurable per environment (dev, staging, prod)
    const environment = 'dev';
    const timeout = 30; // seconds - could be optimized

    // Lambda function for pricing API
    const pricingFunction = new lambda.Function(this, 'PricingFunction', {
      runtime: lambda.Runtime.NODEJS_20_X, // TODO: AWS CDK doesn't support Node.js 22 yet (as of 2024)
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async (event) => {
          const productId = event.pathParameters?.productId || 'unknown';
          const discount = event.queryStringParameters?.discount || 0;
          
          const prices = {
            'prod-001': 100,
            'prod-002': 250,
            'prod-003': 500
          };
          
          const basePrice = prices[productId];
          if (!basePrice) {
            return {
              statusCode: 404,
              body: JSON.stringify({ error: 'Product not found' })
            };
          }
          
          const finalPrice = basePrice - (basePrice * (discount / 100));
          
          return {
            statusCode: 200,
            body: JSON.stringify({
              productId,
              basePrice,
              discount,
              finalPrice
            })
          };
        };
      `),
      timeout: cdk.Duration.seconds(timeout),
      environment: {
        ENVIRONMENT: environment,
      },
    });

    // API Gateway
    const api = new apigateway.RestApi(this, 'PricingApi', {
      restApiName: 'Pricing Service',
      description: 'API for product pricing with discounts',
    });

    const products = api.root.addResource('products');
    const product = products.addResource('{productId}');
    product.addMethod('GET', new apigateway.LambdaIntegration(pricingFunction));

    // Outputs
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'API Gateway URL',
    });
  }
}
