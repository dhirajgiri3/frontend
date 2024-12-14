import Header from "@/components/Common/Header/Header";
import Home from "@/app/Components/Home";
import Footer from "@/components/Common/Footer/Footer";

export default function page() {
  return (
    <div>
      <Header />
      <div className="mt-[3rem] lg:mt-[4.5rem]">
        <Home />
      </div>
      <Footer />
    </div>
  );
}
