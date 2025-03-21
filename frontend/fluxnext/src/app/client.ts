import { client } from "@/lib/utils";
import { ThirdwebProvider, ConnectButton } from "thirdweb/react";
 
export default function App() {
  return (
    <ThirdwebProvider>
      <ConnectButton client={client} />
    </ThirdwebProvider>
  );
}