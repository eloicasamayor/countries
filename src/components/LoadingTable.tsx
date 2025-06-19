import { Table, TableHeader, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
export function LoadingTable() {
    // vull renderitzar 20 skeletons sense haber d'escriure el codi 20 vegades
    const skeletonRows = Array.from({ length: 20 }, (_, index) => (
        <TableRow key={index}>
            <TableCell>
                <Skeleton className="h-[21px] w-5" />
            </TableCell>
            <TableCell colSpan={100}>
                <Skeleton style={{ width: `${50 + Math.random() * 40}px` }} className={`h-[21px]`} />
            </TableCell>
            <TableCell colSpan={100}>
                <Skeleton style={{ width: `${50 + Math.random() * 40}px` }} className={`h-[21px]`} />
            </TableCell>
        </TableRow>
    ));
  return (
    <Table>
      <TableHeader>
      <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead  colSpan={100} className="max-w-10">Country name</TableHead>
            <TableHead colSpan={100} className="max-w-10">Capital</TableHead>
          </TableRow>

        {skeletonRows}

        
      </TableHeader>
    </Table>
  );
}
