import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import { IRole } from '@aws-cdk/aws-iam';
import { ISecurityGroup, IVpc } from '@aws-cdk/aws-ec2';


export class LambdaBuilder {

  private _scope: cdk.Construct;
  private _name: string;
  private _functionName: string;
  private _description: string;
  private _runtime: lambda.Runtime;
  private _code: lambda.Code;
  private _handler: string;
  private _timeout: cdk.Duration;
  private _memorySize: number
  private _layers: lambda.ILayerVersion[];
  private _role: IRole;
  private _environment: any;
  private _vpc: any;
  private _securityGroup: ISecurityGroup;
  private _vpcSubnets: any;

  constructor() { }

  scope(scope: cdk.Construct) {
    this._scope = scope;
    return this;
  }

  name(name: string) {
    this._name = name;
    return this;
  }

  functionName(functionName: string) {
    this._functionName = functionName;
    return this;
  }

  description(description: string) {
    this._description = description;
    return this;
  }

  runtime(runtime: lambda.Runtime) {
    this._runtime = runtime;
    return this;
  }

  layers(layers: lambda.ILayerVersion[]) {
    this._layers = layers;
    return this;
  }

  code(code: lambda.Code) {
    this._code = code;
    return this;
  }

  role(role: IRole) {
    this._role = role;
    return this;
  }

  handler(handler: string) {
    this._handler = handler;
    return this;
  }


  timeout(timeout: cdk.Duration) {
    this._timeout = timeout;
    return this;
  }

  memorySize(memorySize: number) {
    this._memorySize = memorySize;
    return this;
  }
  environment(environment: any) {
    this._environment = environment;
    return this;
  }

  vpc(vpc: IVpc) {
    this._vpc = vpc;
    return this;
  }

  vpcSubnets(vpcSubnets: any) {
    this._vpcSubnets = vpcSubnets;
    return this;
  }


  securityGroup(securityGroup: ISecurityGroup) {
    this._securityGroup = securityGroup;
    return this;
  }

  build() {
    let baseProps = {
      functionName: this._functionName,
      description: this._description,
      runtime: this._runtime,
      code: this._code,
      handler: this._handler,
      timeout: this._timeout,
      memorySize: this._memorySize,
      layers: this._layers,
      role: this._role,
    }
    let props
    if (this._environment) {
      props = {
        ...baseProps,
        environment: this._environment
      }

    }
    if (this._vpc && this._vpcSubnets && this._securityGroup) {
      props = {
        ...baseProps,
        ...props,
        vpc: this._vpc,
        securityGroup: this._securityGroup,
        vpcSubnets: this._vpcSubnets
      }
    }
    return new lambda.Function(
      this._scope,
      this._name,
      props || baseProps
    );
  }



}