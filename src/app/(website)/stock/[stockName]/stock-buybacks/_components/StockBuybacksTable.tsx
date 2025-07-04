import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function StockBuybacksTable() {
  // Mock data for the table
  const buybackData = Array(10).fill({
    date: "Dec. 31, 2025",
    value: "$24.80B",
  });

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Stock Buybacks (Quarterly) Data
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left side table */}
        <div className="rounded-lg border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2">Date</TableHead>
                <TableHead className="w-1/2 text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buybackData.slice(0, 5).map((row, index) => (
                <TableRow key={`left-${index}`}>
                  <TableCell className="border-none">{row.date}</TableCell>
                  <TableCell className="text-right border-none">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Right side table */}
        <div className="rounded-lg border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/2">Date</TableHead>
                <TableHead className="w-1/2 text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buybackData.slice(5, 10).map((row, index) => (
                <TableRow key={`right-${index}`}>
                  <TableCell className=" border-none">{row.date}</TableCell>
                  <TableCell className="text-right border-none">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
