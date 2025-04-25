'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { TransactionType } from "@/lib/types"
import { cn } from "@/lib/utils"
import { CreateCategoriesSchema, CreateCategoriesSchemaType } from "@/schema/categories"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleOffIcon, Loader2, PlusSquareIcon } from "lucide-react"
import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateCategory } from "../_actions/categories"
import { toast } from "sonner"
import { Category } from "@prisma/client"
import { useTheme } from "next-themes"

interface Props {
  type: TransactionType,
  onSuccessCallback: (category: Category) => void,
  trigger?: React.ReactNode
}

export const CreateCategoryDialog = ({ type, onSuccessCallback, trigger }: Props) => {
  const [open, setOpen] = useState(false)
  const form = useForm<CreateCategoriesSchemaType>({
    resolver: zodResolver(CreateCategoriesSchema),
    defaultValues: {
      type
    }
  })

  const queryClient = useQueryClient()
  const theme = useTheme()

  const { isPending, mutate } = useMutation({
    mutationFn: CreateCategory,
    onSuccess: async (data: Category) => {
      form.reset({
        name: "",
        icon: "",
        type,
      });

      toast.success(`Categories ${data.name} created successfully`,
        { id: "create-category" })

      onSuccessCallback(data)

      await queryClient.invalidateQueries({
        queryKey: ["categories"]
      })

      setOpen(prev => !prev)
    },
    onError: () => {
      toast.error("something went wrong", { id: "create-category" })
    }
  })

  const onSubmit = useCallback((value: CreateCategoriesSchemaType) => {
    toast.loading("Create categories", { id: "create-category" })
    mutate(value)
  }, [mutate])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            variant="ghost"
            className="flex border-separate items-center justify-start rounded-none border-b px-3 py-3 text-muted-foreground"
          >
            <PlusSquareIcon className="mr-2 size-4" />
            Create new
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create <span className={cn(
            "m-1",
            type === "income" ? "text-emerald-500" : "text-red-500"
          )}>
            {type}
          </span>
            categories
          </DialogTitle>
          <DialogDescription>
            Categories are used to group your transactions
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category" {...field} />
                  </FormControl>
                  <FormDescription>
                    Transaction name (required)
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="h-[100px] w-full"
                        >
                          {form.watch("icon") ? (
                            <div className="flex flex-col items-center gap-2">
                              <span className="text-5xl" role="img">
                                {field.value}
                              </span>
                              <p className="text-xs text-muted-foreground">Click to change</p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              <CircleOffIcon className="h-12 w-12" />
                              <p className="text-xs text-muted-foreground">Click to select</p>
                            </div>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full">
                        <Picker
                          data={data}
                          onEmojiSelect={(emoji: { native: string }) => {
                            field.onChange(emoji.native)
                          }}
                          theme={theme.resolvedTheme}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription>
                    This is how categories will appear in the application
                  </FormDescription>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type='button'
              variant="secondary"
              onClick={() => {
                form.reset()
              }}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
            {!isPending && "Create"}
            {isPending && <Loader2 className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}