# CDK + SAM = <3 !

This is an example project for TypeScript development with CDK integrating local testing with the sam cli

![Diagram](/img/cdk+sam.png)


The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template





# Local testing

```shell
$ cdk synth --no-staging > template.yaml
```

```shell
$ sam local start-api
```
