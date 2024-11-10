"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectCategory } from "../components/SelectCategory";
import { Textarea } from "@/components/ui/textarea";
import { TipTapEditor } from "../components/Editor";
import { UploadDropzone } from "../lib/uploadthing";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { JSONContent } from "@tiptap/react";
import { useFormState } from "react-dom";
import { SellProduct, State } from "../action";
import { toast } from "sonner";
import { SubmitButton } from "../components/SubmitButton";
import { redirect } from "next/navigation";

export default function SellRoute() {
  const initialState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(SellProduct, initialState);
  const [json, setJson] = useState<null | JSONContent>(null);
  const [images, setImages] = useState<null | string[]>(null);
  const [productFile, setProductFile] = useState<null | string>(null);


  console.log(state?.errors)

  useEffect(() =>{
    if (state.status === "success") {
      toast.success(state.message);
      redirect("/");
    }else if (state.status === "error") {
      toast.error(state.message);
    }
  },[state]);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle>Sell your product with ease</CardTitle>
            <CardDescription>
              Please describe your product here in detail so that it can be sold
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-2">
              <Label>Name</Label>
              <Input
                name="name"
                type="text"
                placeholder="Name of your product"
                required
                min={5}
              ></Input>
            </div>
            { state?.errors?.["name"]?.[0] && (
              <p className="text-destructive"> {state?.errors?.["name"]?.[0] } </p>
            ) }
            <div className="flex flex-col gap-y-2">
              <Label>Category</Label>
              <SelectCategory />
            </div>
            { state?.errors?.["category"]?.[0] && (
              <p className="text-destructive"> { state?.errors?.["category"]?.[0] } </p>
            )}
            <div className="flex flex-col gap-y-2">
              <Label>Price</Label>
              <Input
                name="price"
                placeholder="Enter your price"
                type="number"
                required
                min={1}
              />
            </div>
            { state?.errors?.["price"]?.[0] && (
              <p className="text-destructive"> { state?.errors?.["price"]?.[0] } </p>
            )}
            <div className="flex flex-col gap-y-2">
              <Label>Small Summary</Label>
              <Textarea
                name="smallDescription"
                placeholder="Please describe your product"
                required
                minLength={10}
              />
            </div>
            { state?.errors?.["smallDescription"]?.[0] && (
              <p className="text-destructive"> { state?.errors?.["smallDescription"]?.[0] } </p>
            )}
            <div className="flex flex-col gap-y-2">
              <input
                type="hidden"
                name="description"
                value={JSON.stringify(json)}
              />
              <Label>Description</Label>
              <TipTapEditor json={json} setJson={setJson} />
            </div>
            { state?.errors?.["description"]?.[0] && (
              <p className="text-destructive"> { state?.errors?.["description"]?.[0] } </p>
            )}
            <div className="flex flex-col gap-y-2">
              <input
                type="hidden"
                name="images"
                value={JSON.stringify(images)}
              />
              <Label>Product Images</Label>
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  console.log("images resp", res);
                  setImages(res.map((item) => item.url));
                  toast.success("Your images have been uploaded");
                }}
                onUploadError={(error: Error) => {
                  console.log("product", error);
                  throw new Error(`${error}`);
                  toast.error("Something went wrong, please try again later");
                }}
              />
            </div>
            { state?.errors?.["images"]?.[0] && (
              <p className="text-destructive"> { state?.errors?.["images"]?.[0] } </p>
            )}
            <div className="flex flex-col gap-y-2">
              <input
                type="hidden"
                name="productFile"
                value={productFile ?? ""}
              />
              <Label>Product Images</Label>
              <UploadDropzone
                endpoint="productFileUpload"
                onClientUploadComplete={(res) => {
                  console.log("product resp", res);
                  setProductFile(res[0].url);
                  toast.success("Your product file have been uploaded")
                }}
                onUploadError={(error: Error) => {
                  throw new Error(`${error}`);
                  toast.error("Something went wrong, please try again later");
                }}
              />
            </div>
            { state?.errors?.["productFile"]?.[0] && (
              <p className="text-destructive"> { state?.errors?.["productFile"]?.[0] } </p>
            )}
          </CardContent>
          <CardFooter className="mt-5">
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}
