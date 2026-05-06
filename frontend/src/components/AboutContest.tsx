import MarkdownDisplay from '@/components/MarkdownDisplay'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function AboutContest() {
  return (
    <>
      <Card className="shadow-none">
        <CardContent>
          <MarkdownDisplay className="mb-4">{`# Hello world!`}</MarkdownDisplay>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="p-4">Holati</TableHead>
                <TableHead className="p-4">Boshlanish vaqti</TableHead>
                <TableHead className="p-4">Tugash vaqti</TableHead>
                <TableHead className="p-4">Davomiyligi</TableHead>
                <TableHead className="p-4">Masalalar soni</TableHead>
                <TableHead className="p-4">Qatnashuvchilar soni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="p-4">Kun: 0 Vaqt: 18:52:56</TableCell>
                <TableCell className="p-4">Dec. 8, 2025, 8:32 p.m.</TableCell>
                <TableCell className="p-4">Dec. 9, 2025, 8:31 p.m.</TableCell>
                <TableCell className="p-4">18:46:40</TableCell>
                <TableCell className="p-4">1</TableCell>
                <TableCell className="p-4">15</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
