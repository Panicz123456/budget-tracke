"use client"

import { Category } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteCategory } from "../_actions/categories";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { TransactionType } from "@/lib/types";

interface Props {
  trigger: React.ReactNode;
  categories: Category
}

export const DeleteCategoryDialog = ({ categories, trigger, }: Props) => {
  const categoryIdentifier = `${categories.name}-${categories.type}`

  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: DeleteCategory,
    onSuccess: async () => {
      toast.success("Category delete successful", { id: categoryIdentifier })

      await queryClient.invalidateQueries({
        queryKey: ["categories"],

      })
    },
    onError: () => {
      toast.error("Something went wrong", { id: categoryIdentifier })
    }
  })
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your categories
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => {
            toast.loading("Delete categories...", {
              id: categoryIdentifier
            })
            deleteMutation.mutate({
              name: categories.name,
              type: categories.type as TransactionType
            })
          }}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}