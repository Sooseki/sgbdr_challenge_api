import { Request } from 'express';
import { ApiError } from '../classes/Errors/ApiError';
import { ErrorCode } from '../classes/Errors/ErrorCode';
import { join } from 'path';
const fs = require('fs');
const privateKey = fs.readFileSync(join(__dirname, "..", "..",'config',"id_rsa"));
const publicKey = fs.readFileSync(join(__dirname, "..", "..",'config',"id_rsa.pub"));
const  decode = require('jsonwebtoken');
const jwt = require ("jsonwebtoken");
const express = require("express");
const app = express();

export async function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<boolean> {

  if (securityName === 'jwt') {
    if (!request.headers.authorization) {
      throw new ApiError(ErrorCode.Unauthorized, 'auth/missing-header', 'Missing authorization header');
    }  
    // Check if jwt is valid
    const idToken = request.headers.authorization.split(' ')[1];
    return new Promise<boolean>((resolve, reject) => {
      jwt.verify(idToken, process.env.ACCESS_TOKEN_SECRET, (error: any)=> {
         if(error){
            reject(new ApiError(ErrorCode.Unauthorized, "auth/jwt", "Erreur d'indentification jwt"))
         }else{
             resolve(true);
         }
       })
     })
  }

  return true;
}
