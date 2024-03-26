import { format } from 'date-fns';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from '../../common/src/components/ScrollBar';
import { SeverityPill } from '../../common/src/components/SeverityPill';
import { OrderType } from '../../../../backend/src/utils/types/order.types';

type StatusMapType = {
  [key: string]: "warning" | "success" | "error"; // Add an index signature to allow string indexing
};

const statusMap: StatusMapType = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};

type OverviewLatestOrdersType = {
  orders: OrderType[],
  sx: object
};

export const OverviewLatestOrders = (props: OverviewLatestOrdersType) => {
  const { orders = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Orders" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Order
                </TableCell>
                <TableCell>
                  Customer
                </TableCell>
                <TableCell sortDirection="desc">
                  Date
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders && orders.length > 0 ? (
                orders.map((order) => {
                const createdAt = format(order.createdAt!, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell>
                      {order.id}
                    </TableCell>
                    <TableCell>
                      {order.userId}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[order.status]}>
                        {order.status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })) : (
                <TableRow>
                <TableCell colSpan={4} align="center">
                  No orders available
                </TableCell>
              </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};
