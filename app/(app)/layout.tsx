
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import SideBar from "@/components/SideBar/SideBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Provider } from "jotai";
import { Toaster } from "@/components/ui/sonner";
import RightSideBar from "@/components/RightSidebar/RightSideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cloudo",
  description: "Best cloud storage service for your files.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en" className="font-sans text-base">
      <Provider><body className={inter.className}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} maxSize={20} minSize={15}>
            <SideBar />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={80}>
            <ScrollArea >
              {children}
            </ScrollArea>
          </ResizablePanel>
          <ResizableHandle />

          <RightSideBar />

        </ResizablePanelGroup>
        <Toaster />
      </body></Provider>
    </html>
  );
}
