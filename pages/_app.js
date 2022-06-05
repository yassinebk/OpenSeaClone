import "../styles/globals.css";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

const supportedChainIds = [4];
const connectors = {
  injected: {},
};
function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      desiredChainId={ChainId.Rinkeby}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
