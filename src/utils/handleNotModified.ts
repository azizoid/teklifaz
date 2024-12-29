import { CustomError } from "@/lib/CustomError";

interface HandleNotModifiedOptions<ExistingType> {
  existingRecord?: ExistingType;
  notFoundMessage?: string;
}

export function handleNotModified<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ServiceFn extends (args: any) => Promise<any>,
  ExistingType
>(
  serviceFn: ServiceFn
) {
  return async (
    args: Parameters<ServiceFn>[0] & HandleNotModifiedOptions<ExistingType>
  ): Promise<ReturnType<ServiceFn>> => {
    try {
      return await serviceFn(args);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.status === 304) {
        console.log("304 Not Modified. Returning existing record from DB.");

        if (args.existingRecord) {
          return args.existingRecord as ReturnType<ServiceFn>;
        }

        throw new CustomError(
          args.notFoundMessage || "Weird! No changes detected, but the record was not found.",
          500
        );
      }

      throw error;
    }
  };
}