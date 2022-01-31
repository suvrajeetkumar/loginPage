import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_ZZyVbmvop",
    ClientId: "7pi0gfju680corf5ilcq9jerja"
}

export default new CognitoUserPool(poolData);