import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { CreateAssistantSchema  } from "shared";
import { CreateAssistant } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export function CreateAssistantForm ({
  onClose,
  onSubmit,
}: {
  onClose?: (() => void) | null;
  onSubmit:(values: CreateAssistant) => void;
}) {
  const form = useForm<CreateAssistant>({
    resolver: zodResolver(CreateAssistantSchema),
    defaultValues: {
      name: "",
      username: ""
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-6 flex-col"
      >
        {form.formState.errors.root && (
          <div className="text-destructive text-sm">
            {form.formState.errors.root.message}
          </div>
        )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <Label>Assistant Name</Label>
              <FormControl>
                <Input {...field} placeholder="Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <Label>Inspiration Account</Label>
              <FormControl>
                <Input {...field} placeholder="@username" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end">
          {onClose && (
            <Button 
              disabled={form.formState.isSubmitting}
              onClick={onClose} 
              variant="outline"
            >
              close
            </Button>
          )}
          <Button 
            disabled={form.formState.isSubmitting} 
            type="submit"
          >
            Create
          </Button>
        </div>
      </form>
    </Form>
  )
}