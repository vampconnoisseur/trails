"use server";

import { error } from "console";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export interface IDeleteCollectionPrevState {
  message: string;
  code: string;
  statusCode: number;
}
export default async function deleteCollectionAction(
  prevState: IDeleteCollectionPrevState,
  formData: FormData,
) {
  const id = formData.get("collection_id");
  const token = cookies().get("next-auth.session-token")?.value;

  if (!token || !id) {
    return {
      message: "Invalid credentials",
      error: "bad_request",
    };
  }

  const req = await fetch(`http://localhost:3000/api/collections/?id=${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const response = await req.json();
  if (req.ok) {
    return {
      message: response.message,
      code: "ok",
      statusCode: 200,
    };
  }
  return response;
}