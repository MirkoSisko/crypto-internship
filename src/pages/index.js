import Layout from "@components/layout";
import BlankHoodie from "@features/landing/hoodie";
import MintedNFTs from "@features/landing/mintedNFTs";

export default function Home() {
  return (
    <div>
      <Layout>
        <BlankHoodie />
        <MintedNFTs />
      </Layout>
    </div>
  );
}
