import { Card, CardContent } from './ui/card'
import { Table, TableHead, TableHeader, TableRow } from './ui/table'

export default function ContestTasks() {
  return (
    <>
      <Card className="shadow-none">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Nomi</TableHead>
                <TableHead className="w-[200px]">Qiyinchilik</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
