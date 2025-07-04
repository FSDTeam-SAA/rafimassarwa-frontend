import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoIcon } from "lucide-react"

export default function ApplePivotPoints() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 p-0">
        <CardTitle className="text-xl font-bold !p-0">Apple (AAPL) Pivot Points</CardTitle>
        <InfoIcon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <div className="px-6 pb-2 text-sm text-muted-foreground">Mar 22, 2025, 01:50 AM</div>
      <CardContent className="shadow-[0px_0px_8px_0px_#00000029] p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="text-right">S3</TableHead>
              <TableHead className="text-right">S2</TableHead>
              <TableHead className="text-right">S1</TableHead>
              <TableHead className="text-right font-medium">Pivot Points</TableHead>
              <TableHead className="text-right">R1</TableHead>
              <TableHead className="text-right">R2</TableHead>
              <TableHead className="text-right">R3</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium border-none">Classic</TableCell>
              <TableCell className="text-right border-none">208.06</TableCell>
              <TableCell className="text-right border-none">210.91</TableCell>
              <TableCell className="text-right border-none">201.06</TableCell>
              <TableCell className="text-right font-medium border-none">2153.98</TableCell>
              <TableCell className="text-right border-none">218.36</TableCell>
              <TableCell className="text-right border-none">254.65</TableCell>
              <TableCell className="text-right border-none">223.58</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium border-none">Fibonacci</TableCell>
              <TableCell className="text-right border-none">208.06</TableCell>
              <TableCell className="text-right border-none">210.91</TableCell>
              <TableCell className="text-right border-none">201.06</TableCell>
              <TableCell className="text-right font-medium border-none">2153.98</TableCell>
              <TableCell className="text-right border-none">218.36</TableCell>
              <TableCell className="text-right border-none">254.65</TableCell>
              <TableCell className="text-right border-none">223.58</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
