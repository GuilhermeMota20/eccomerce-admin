"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { CategoryColumn } from "./columns";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps {
  data: CategoryColumn;
};

export const CellAction: React.FC<CellActionProps> = ({
  data
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const params = useParams()

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Billboard ID copied to the clipboard");
  };

  const onRedirectUpload = (id: string) => {
    router.push(`/${params.storeId}/billboards/${id}`);
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
      router.refresh();
      toast.success("Billboard deleted.");

    } catch (err) {
      toast.error("Make sure you removed all categories using this billboard first.");
    } finally {
      setLoading(false);
      setOpen(false);
    };
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={loading}
        onConfirm={onDelete}
        onClose={() => setOpen(false)}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => onRedirectUpload(data.id)} >
            <Edit className="h-4 w-4 mr-2" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="h-4 w-4 mr-2" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
};