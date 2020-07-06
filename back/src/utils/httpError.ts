
/**
 * Base class for HttpError
 */
export class HttpError {
  /**
   * @param  {number} publicstatus
   * @param  {string} publicmessage
   */
  constructor(public status: number, public message: string) {

  }
}
