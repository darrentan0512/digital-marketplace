"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { z } from "zod";

export type State = {
    status: 'error' | "success" | undefined;
    errors? : {
        [key : string]: string[];
    }
    message? : string | null,
}

const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "The name has to be a min character of 3" }),
  category: z.string().min(1, { message: "Category is required" }),
  price: z.number().min(1, { message: "The price has to be higher than 1" }),
  smallDescription: z
    .string()
    .min(10, { message: "Please summarize your product more" }),
  description: z.string().min(1, { message: "Description is required" }),
  images: z.array(z.string(), { message: "Images are required" }),
  productFiles: z
    .string()
    .min(1, { message: "Please upload a zip of your product" }),
});

export async function SellProduct(prevState: any,formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Something went wrong");
  }

  const validateFields = productSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    price: formData.get("price"),
    smallDescription: formData.get("smallDescription"),
    description: formData.get("description"),
    images : formData.get("images"),
    productFiles: formData.get("productFiles")
  });

  if (!validateFields.success) {
    const state: State = {
        status: "error",
        errors: validateFields.error.flatten().fieldErrors,
        message: 'oops! Something went wrong'
    };
    return state;
  }
}
