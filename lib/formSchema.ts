import { z } from "zod";
const MAX_MB = 5;
const MAX_FILE_SIZE = MAX_MB * 1024 * 1024;
const ACCEPTED_IMAGE_TYPE = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "ユーザ名は２文字以上にしてください。" }),
  subject: z
    .string()
    .min(2, { message: "タイトルは２文字以上にしてください。" }),
  email: z
    .string()
    .email({ message: "適切なメールアドレスを入力してください。" }),
  content: z
    .string()
    .min(10, { message: "本文は10文字以上にしてください。" })
    .max(160, { message: "本文は160文字以内で入力してください。" }),
  file: z
    .custom<FileList>()
    .refine((files) =>  files?.length > 0, "画像を添付してください。")
    .refine(
      (files) => files?.[0].size <= MAX_FILE_SIZE,
      `画像サイズは${MAX_MB}MBまでです。`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPE.includes(files?.[0].type),
      "拡張子が.jpg, .jpeg, .png, .webpのファイルのみ利用できます。"
    ),
});
