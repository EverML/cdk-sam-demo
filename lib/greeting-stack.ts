import * as cdk from '@aws-cdk/core';
import * as apigateway from '@aws-cdk/aws-apigateway';
import { Code, IFunction, Runtime } from '@aws-cdk/aws-lambda';
import { ManagedPolicy, Role, ServicePrincipal } from '@aws-cdk/aws-iam';
import { Duration } from '@aws-cdk/core';

import { LambdaBuilder } from '../builders/lambda-builder';
import { AppProps } from '../interfaces/app-props';

export class GreetingStack extends cdk.Stack {
  
  constructor(scope: cdk.Construct, id: string, props: AppProps) {
    super(scope, id, props);
    
    const name = 'greeting'

    const role = this.createRole(name);
    const lambda = this.createLambda(name, props, role);
    this.createApi(name,lambda,props);
  }
  createApi(name: string, lambda: IFunction, props: AppProps) {
    new apigateway.LambdaRestApi(this,'myapi',{
      handler:lambda,
      restApiName: `${name}-api`,
      description:'Greeting API Endpoint'
    })
  }

  createRole(name:string) {

    const roleName = `${name}-role`;

    return new Role(this, 'LambdaRole', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      roleName: roleName,
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')
      ]
    });

  }

  private createLambda(name:string,props: AppProps, lambdaRole: Role) {
    return new LambdaBuilder()
      .scope(this)
      .name(`${name}-lambda`) // name of the stack
      .description(`Generated on: ${new Date().toISOString()}`)
      .functionName(`${name}-lambda`)
      .runtime(Runtime.PYTHON_3_8)
      .handler('lambda_function.lambda_handler')
      .memorySize(128)
      .timeout(Duration.minutes(1))
      .code(Code.fromAsset('resources/lambda/functions/greeting_generator'))
      .environment({ ENVIRONMENT: props.stage })
      .role(lambdaRole)
      .build();
  }


}