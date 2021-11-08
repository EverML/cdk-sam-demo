# CDK + SAM = <3 !

This is an example project for TypeScript development with CDK integrating local testing with the sam cli

![Diagram](/img/cdk+sam.png)


The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Prerequisites to run the example
  * npm
  * python
  * docker
  * aws cdk cli
  * sam cli

## Setup
  * clone this repo
  * install the project dependencies 
    * ```npm i```
  * check if everything works by typing the following command
    * ```cdk synth```
  * boostrap the aws environment where the demo is going to be deployed 
    * 
    * ```cdk bootstrap```
    
  * Deploy the stack ```cdk deploy```

# Local testing

```shell
cdk synth --no-staging > template.yaml
```

```shell
sam local start-api
```



## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template





