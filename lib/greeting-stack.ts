import * as cdk from '@aws-cdk/core';
import { Code, Runtime } from '@aws-cdk/aws-lambda';
import { ManagedPolicy, Role, ServicePrincipal } from '@aws-cdk/aws-iam';
import { Duration } from '@aws-cdk/core';

import { LambdaBuilder } from '../builders/lambda-builder';
import { AppProps } from '../interfaces/app-props';

export class GreetingStack extends cdk.Stack {
  
  constructor(scope: cdk.Construct, id: string, props: AppProps) {
    super(scope, id, props);
    
    const name = 'greeting-lambda'

    let role = this.createRole(name);

    this.createLambda(name, props, role);
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


    new LambdaBuilder()
      .scope(this)
      .name(name) // name of the stack
      .description(`Generated on: ${new Date().toISOString()}`)
      .functionName(name)
      .runtime(Runtime.PYTHON_3_8)
      .handler('lambda_function.lambda_handler')
      .memorySize(128)
      .timeout(Duration.minutes(1))
      .code(Code.fromAsset('resources/lambda/greeting_generator'))
      .environment({ ENVIRONMENT: props.stage })
      .role(lambdaRole)
      .build();
  }


}