export class InvalidPageError extends Error {
  constructor(page: number) {
    super(`Invalid page: ${page}. Page must be a positive integer.`);
    this.name = 'InvalidPageError';
  }
}
