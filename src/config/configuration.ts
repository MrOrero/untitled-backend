import { Logger } from "@nestjs/common";
import { IsNumber, IsString, validateSync } from "class-validator";

// import dotenv = require("dotenv");
import { config } from "dotenv";
config();

class Configuration {
  private readonly logger = new Logger(Configuration.name);

  @IsString()
  readonly MONGO_URI = process.env.MONGO_URI as string;


  @IsString()
  readonly FIREBASE_API_KEY = process.env.FIREBASE_API_KEY as string;

  @IsString()
  readonly FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN as string;

  @IsString()
  readonly FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID as string;

  @IsString()
  readonly FIREBASE_STORAGE_BUCKET = process.env
    .FIREBASE_STORAGE_BUCKET as string;

  @IsString()
  readonly FIREBASE_MESSAGING_SENDER_ID = process.env
    .FIREBASE_MESSAGING_SENDER_ID as string;

  @IsString()
  readonly FIREBASE_APP_ID = process.env.FIREBASE_APP_ID as string;


  constructor() {
    const error = validateSync(this);

    if (!error.length) return;
    this.logger.error(`Config validation error: ${JSON.stringify(error[0])}`);
    process.exit(1);
  }
}

export const Config = new Configuration();
