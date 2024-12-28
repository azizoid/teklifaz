import { CustomError } from "@/lib/CustomError";
import { NextResponse } from "next/server";

export const handleError = (error: unknown) => {
  if (error instanceof CustomError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status },
    );
  }
  console.error("Unexpected Error:", error);
  return NextResponse.json(
    { error: "An unexpected error occurred." },
    { status: 500 },
  );
};
