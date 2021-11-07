import * as cdk from '@aws-cdk/core'

export interface AppProps extends cdk.StackProps{
    stage:string;
}