import { useLocalSearchParams } from "expo-router";
import { useOkto, type OktoContextType } from "okto-sdk-react-native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const FetchRawTransactionScreen = () => {
  const { getRawTransactionStatus } = useOkto() as OktoContextType;
  const { jobId }: { jobId: string } = useLocalSearchParams();
  const [transactionDetails, setTransactionDetails] = useState<any[]>([]);

  useEffect(() => {
    getRawTransactionStatus({ order_id: jobId })
      .then((orders: any) => {
        console.log(orders)
        const job = orders.jobs.find((order: any) => order.order_id === jobId);
        if (job) setTransactionDetails([...transactionDetails, job]);
      })
      .catch((error) => {
        console.error(`error:`, error);
      });
  }, []);

  return (
    <View>
      <Text>Raw Solana Transaction Status</Text>
      {transactionDetails.map((transaction: any, index) => (
        <View key={index}>
          <Text>Order ID: {transaction?.order_id}</Text>
          <Text>Status: {transaction?.status}</Text>
          <Text>Transaction Hash: {transaction?.transaction_hash}</Text>
          <Text>Network: {transaction?.network_name}</Text>
        </View>
      ))}
    </View>
  );
};

export default FetchRawTransactionScreen;
