/*
 * FLUX SMP — clay edition.
 * The FLUX HOST (hosting) website still lives in src/components/ and
 * src/data/plans.ts — restore its App composition to bring it back.
 */
import NavSmp from "./smp/NavSmp";
import HeroSmp from "./smp/HeroSmp";
import Depth from "./smp/Depth";
import ShopsSmp from "./smp/ShopsSmp";
import FooterSmp from "./smp/FooterSmp";
import OrderModalSmp from "./smp/OrderModalSmp";

export default function App() {
  return (
    <div className="relative min-h-screen">
      <NavSmp />
      <main>
        <HeroSmp />
        <Depth />
        <ShopsSmp />
      </main>
      <FooterSmp />
      <OrderModalSmp />
    </div>
  );
}
