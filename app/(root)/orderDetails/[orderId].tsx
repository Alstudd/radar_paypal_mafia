import React, { useState } from "react";
import {
  useOkto,
  type OktoContextType,
  type Order,
} from "okto-sdk-react-native";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const OrderDetailsScreen = () => {
  const { orderHistory } = useOkto() as OktoContextType;
  const { orderId }: { orderId: string } = useLocalSearchParams();
  const [order, setOrder] = React.useState<Order | null>(null);

  React.useEffect(() => {
    orderHistory({ order_id: orderId })
      .then((orders: any) => {
        console.log(orders)
        const order = orders.jobs.find((order: any) => order.order_id === orderId);
        if (order) setOrder(order);
        console.log(order);
      })
      .catch((error) => {
        console.error(`error:`, error);
      });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Text>Order Details</Text>
      {order && (
        <View>
          <Text>Order ID: {order?.order_id}</Text>
          <Text>Order Type: {order?.order_type}</Text>
          <Text>Order Status: {order?.status}</Text>
          <Text>Order Transaction Hash: {order?.transaction_hash}</Text>
          <Text>Order Network Name: {order?.network_name}</Text>
        </View>
      )}
    </View>
  );
};

export default OrderDetailsScreen;
