"use client";

import { Modal } from "@/components/custom-ui/modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useStoreModal } from "@/hooks/use-store-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { Button } from "../ui/button";

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const { isOpen, onClose } = useStoreModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post('/api/stores', values);
      window.location.assign(`${response.data.id}`);

    } catch (err) {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false);
    };
  };

  return (
    <>
      <Modal
        title="Create store"
        description="Add a new store to menage products and categories"
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="">
          <div className="space-y-4 py-2 pb-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E-commerce"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={loading}
                  >
                    Continue
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  )
}