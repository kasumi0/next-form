"use client";

import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useMailForm } from "@/hooks/useMailForm";
import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const MailForm = () => {
  const { form, onSubmit } = useMailForm();
  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {``
      toast.success("メール送信が成功しました。");
    }
  }, [form.formState.isSubmitSuccessful])
  return (
    <Form {...form}>
      <ToastContainer/>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ユーザ名</FormLabel>
              <FormControl>
                <Input placeholder="ユーザ名" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input placeholder="メールアドレス" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>タイトル</FormLabel>
              <FormControl>
                <Input placeholder="タイトル" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>本文</FormLabel>
              <FormControl>
                <Textarea placeholder="本文" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>画像添付</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="画像添付"
                  onChange={(e) => onChange(e.target.files)}
                  {...fieldProps}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <ClipLoader /> : "送信"}
        </Button>
      </form>
    </Form>
  );
};

export default MailForm;
