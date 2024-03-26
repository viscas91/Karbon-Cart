import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { OverviewBudget } from './overview/overview-budget';
import { OverviewLatestOrders } from './overview/overview-latest-orders';
import { OverviewLatestProducts } from './overview/overview-latest-products';
import { OverviewSales } from './overview/overview-sales';
import { OverviewTasksProgress } from './overview/overview-tasks-progress';
import { OverviewTotalCustomers } from './overview/overview-total-customers';
import { OverviewTotalSales } from './overview/overview-total-profit';
import { OverviewTraffic } from './overview/overview-traffic';
import { useGetAllProductsQuery } from '../products/src/features/productSlice';
import { useEffect, useState } from 'react';
import { useGetAllOrdersQuery } from '../orders/src/features/orderSlice';

const Page = () => {

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const { data: productData, isLoading: isProductLoading} = useGetAllProductsQuery();
  const { data: orderData, isLoading: isOrderLoading } = useGetAllOrdersQuery();

  useEffect(() => {
    if (productData && !isProductLoading) {
        setProducts(productData?.products);
    }
}, [productData, isProductLoading]);

useEffect(() => {
  if (orderData && !isOrderLoading) {
      setOrders(orderData?.orders);
  }
}, [orderData, isOrderLoading]);



  return (
    <>
    {/* <Head>
      <title>
        Overview | Devias Kit
      </title>
    </Head> */}
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="$24k"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalCustomers
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value="1.6k"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTasksProgress
              sx={{ height: '100%' }}
              value={75.5}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalSales
              sx={{ height: '100%' }}
              value="$15k"
            />
          </Grid>
          <Grid
            xs={12}
            lg={8}
          >
            <OverviewSales
              chartSeries={[
                {
                  name: 'This year',
                  data: [13, 18, 19, 8, 3, 14, 14, 16, 17, 19, 18, 20]
                },
                {
                  name: 'Last year',
                  data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewTraffic
              chartSeries={[63, 15, 22]}
              labels={['Desktop', 'Tablet', 'Phone']}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewLatestProducts
              products={products}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={8}
          >
            <OverviewLatestOrders
              orders={orders}
              sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
)};

export default Page;