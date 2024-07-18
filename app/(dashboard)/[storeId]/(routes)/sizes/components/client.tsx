"use client";

import { DataTable } from "@/components/custom-ui/data-table";
import { Heading } from "@/components/custom-ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { SizesColumn, columns } from "./columns";
import { ApiList } from "@/components/custom-ui/api-list";

interface SizesClientProps {
  data: SizesColumn[];
};

export const SizeClient: React.FC<SizesClientProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage sizes for your store"
        />

        <Button
          onClick={() => router.push(`/${params.storeId}/sizes/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />

      <DataTable
        searchKey="name"
        columns={columns}
        data={data}
      />

      <Heading
        title="API"
        description="API calls for Sizes"
      />
      <Separator />

      <ApiList
        entityName="sizes"
        entityIdName="sizeId"
      />
    </>
  )
}