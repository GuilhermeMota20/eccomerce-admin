"use client";

import { DataTable } from "@/components/custom-ui/data-table";
import { Heading } from "@/components/custom-ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ProductColumn, columns } from "./columns";
import { ApiList } from "@/components/custom-ui/api-list";

interface ProductClientProps {
  data: ProductColumn[];
};

export const ProductClient: React.FC<ProductClientProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products for your store"
        />

        <Button
          onClick={() => router.push(`/${params.storeId}/products/new`)}
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
        description="API calls for Products"
      />
      <Separator />

      <ApiList
        entityName="products"
        entityIdName="productdId"
      />
    </>
  )
}