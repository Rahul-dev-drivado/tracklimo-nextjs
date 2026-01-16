// Note: Error Utility Class or Type for React Query
type ReactQueryErrorProps = { message: string; status?: number };

export class ReactQueryError extends Error {
  status?: number;

  constructor({ message, status }: ReactQueryErrorProps) {
    super(message);
    this.name = "ReactQueryError";

    if (typeof status === "number") {
      this.status = status;
    }
  }
}
