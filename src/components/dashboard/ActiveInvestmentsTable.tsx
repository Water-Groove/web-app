import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { DashboardOverviewData } from "@/types/type";

export const ActiveInvestmentsTable = ({
  investments,
}: {
  investments: DashboardOverviewData["activeInvestments"];
}) => (
  <Card>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Investment Plan</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Monthly ROI</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Interest Earned</TableHead>
            <TableHead>Start Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investments.map((investment) => (
            <TableRow key={investment.id}>
              <TableCell className="font-medium">
                <div>
                  <div>{investment.category.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {investment.category.description}
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-medium">
                {formatCurrency(investment.principalAmount)}
              </TableCell>
              <TableCell>
                <span className="text-green-600 font-medium">
                  {(investment.category.monthlyRoiRate * 100).toFixed(1)}%
                </span>
              </TableCell>
              <TableCell>{investment.category.durationMonths} months</TableCell>
              <TableCell className="text-green-600 font-medium">
                +{formatCurrency(investment.totalInterestEarned)}
              </TableCell>
              <TableCell>{formatDate(investment.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);