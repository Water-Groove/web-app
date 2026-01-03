"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "../ui/form"

interface BaseFormProps<T extends z.ZodType<any, any>> {
  schema: T
  defaultValues?: Partial<z.infer<T>>
  onSubmit: (data: z.infer<T>) => void
  children: React.ReactNode
  className?: string
  submitText?: string
  isSubmitting?: boolean
}

export function BaseForm<T extends z.ZodType<any, any>>({
  schema,
  defaultValues,
  onSubmit,
  children,
  className,
  submitText = "Submit",
  isSubmitting = false,
}: BaseFormProps<T>) {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema as any),
    defaultValues: defaultValues as any,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {children}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : submitText}
        </Button>
      </form>
    </Form>
  )
}