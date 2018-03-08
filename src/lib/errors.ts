
export class BadResponseError extends Error {
  constructor(public message: string, public data?: any) {     
    super(message); 
  }
  publicMessage = 'Bad response';  
  statusCode = 500;
}
