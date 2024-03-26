import { formatDistanceToNow } from 'date-fns';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import { ProductType } from '../../../../backend/src/utils/types/product.types';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon
} from '@mui/material';

type OverviewLatestProducts = {
  products: ProductType[],
  sx: object
};

export const OverviewLatestProducts = (props: OverviewLatestProducts) => {
  const { products = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Products" />
      <List>
        {products && products.length > 0 ? (
          products.map((product, index) => {
          const hasDivider = index < products.length - 1;
          const ago = formatDistanceToNow(product.updatedAt!);

          return (
            <ListItem
              divider={hasDivider}
              key={product.id}
            >
              <ListItemAvatar>
                {
                  product.thumb
                    ? (
                      <Box
                        component="img"
                        src={product.thumb}
                        sx={{
                          borderRadius: 1,
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                    : (
                      <Box
                        sx={{
                          borderRadius: 1,
                          backgroundColor: 'neutral.200',
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                }
              </ListItemAvatar>
              <ListItemText
                primary={product.title}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={`Updated ${ago} ago`}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <IconButton edge="end">
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
            </ListItem>
          );
        })) : (
          <ListItem>
            <ListItemText primary="No products available" />
          </ListItem>
        )}
      </List>
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