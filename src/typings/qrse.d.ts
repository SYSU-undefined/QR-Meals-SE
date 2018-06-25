declare module 'qrse' {
  interface Context {
    setResp(msg?: string, data?: any, extraMsg?: string, status?: string): Promise<void>
    handleError(e: Error): Promise<void>
  }
}
