declare module 'midtrans-client' {
  class Snap {
    constructor(config: any);
    createTransaction(params: any): Promise<any>;
    transaction: {
      detail(transactionId: string): Promise<any>;
      deny(transactionId: string): Promise<any>;
      approve(transactionId: string): Promise<any>;
      cancel(transactionId: string): Promise<any>;
      expire(transactionId: string): Promise<any>;
      refund(transactionId: string, params?: any): Promise<any>;
    };
  }

  class CoreApi {
    constructor(config: any);
    charge(params: any): Promise<any>;
    capture(params: any): Promise<any>;
    approve(transactionId: string): Promise<any>;
    deny(transactionId: string): Promise<any>;
    cancel(transactionId: string): Promise<any>;
    expire(transactionId: string): Promise<any>;
    refund(transactionId: string, params?: any): Promise<any>;
  }

  export { Snap, CoreApi };
}
