import { NextResponse } from "next/server";

export class APIResponse<T = undefined> {
  success: boolean;
  message: string;
  data?: T | null | undefined;
  errors?: unknown | null | undefined;

  constructor({
    success = true,
    message,
    data,
    errors,
  }:
    | {
        success?: true;
        message: string;
        data: T;
        errors?: null;
      }
    | {
        success?: false;
        message: string;
        data?: null;
        errors: unknown;
      }) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.errors = errors;
  }

  static fromData<T>({
    message,
    data,
    statusCode = 200,
  }: {
    message: string;
    data: T;
    statusCode?: number;
  }) {
    return NextResponse.json(
      new APIResponse({ success: true, data, message }),
      { status: statusCode },
    );
  }

  static fromError<T>({ message, errors, statusCode }: APIError<T>) {
    return NextResponse.json(
      new APIResponse({ success: false, message, errors }),
      { status: statusCode },
    );
  }
}

export class APIError<T> extends Error {
  statusCode: number;
  errors?: T;

  constructor({
    message,
    errors,
    statusCode = 500,
  }: {
    message: string;
    errors?: T;
    statusCode: number;
  }) {
    super(message);
    this.errors = errors;
    this.statusCode = statusCode;
  }
}
