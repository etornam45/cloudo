import Header from "@/components/Header/Header";
import { Separator } from "@/components/ui/separator";
import Overiew from "@/pages/overview/overview";
import Image from "next/image";

export default function Home() {
  return (

    <>
      <Header pageTitle="Overview" />
      <Separator />
      <Overiew />
    </>
  );
}
