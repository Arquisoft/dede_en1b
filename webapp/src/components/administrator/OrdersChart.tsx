import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Order } from '../../shared/shareddtypes';

type OrdersChartProps = {
  orders: Order[];
};


function OrdersChart( props: OrdersChartProps): JSX.Element {
  const TitleText = (props: JSX.IntrinsicAttributes & Title.TextProps & { [x: string]: any; className?: string | undefined; style?: React.CSSProperties | undefined; } & { children?: React.ReactNode; }) => <Title.Text {...props} />;
  const label = (props:ValueAxis.LabelProps) => <ValueAxis.Label {...props} />;
  if(props.orders.length === 0) {
    return <div>No orders</div>
  }
  //group by date
  const ordersByDate:any = [];
   props.orders.forEach(order => {
    const date = order.createdAt.toString().substring(0, 10);
    if(!ordersByDate[date]) {
      ordersByDate[date] = [];
    }
    ordersByDate[date].push(order);
   });

  
   const data:any = []


  
  console.log(ordersByDate);
   //data has the date as the argument and the total price as the value
  Object.keys(ordersByDate).forEach(date => {
    data.push({ argument: date, value: ordersByDate[date].reduce((total: number, order :Order) => total + order.subTotal+order.deliveryPrice, 0)})
  });

  console.log(data);

  return (<Paper>
    <Chart
      data={data}
    >
      <ArgumentAxis showLabels={true} showTicks={true}/>
      <ValueAxis  labelComponent={label}/>

      <LineSeries valueField="value" argumentField="argument" />
      <Title
            text="Orders per day" 
            textComponent={TitleText}
          />
    </Chart>
  </Paper>);
}

export default OrdersChart;