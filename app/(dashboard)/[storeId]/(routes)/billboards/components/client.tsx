"use client";

import { DataTable } from "@/components/custom-ui/data-table";
import { Heading } from "@/components/custom-ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumn, columns } from "./columns";
import { ApiList } from "@/components/custom-ui/api-list";

interface BillboradClientProps {
  data: BillboardColumn[];
};

export const BillboardClient: React.FC<BillboradClientProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboards for your store"
        />

        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />

      <DataTable
        searchKey="label"
        columns={columns}
        data={data}
      />

      <Heading
        title="API"
        description="API calls for Billboards"
      />
      <Separator />

      <ApiList
        entityName="billboards"
        entityIdName="billboardId"
      />
    </>
  )
}