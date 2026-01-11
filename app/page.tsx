import { BannerSlide } from "@/components/banner/banner";
import {
  WriteButton,
  WriteFabItem,
} from "@/components/write-button/wrtite-button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <BannerSlide />

      {/* write-button */}
      <WriteButton>
        <WriteFabItem asChild>
          <Link href="/write/post">게시글 작성</Link>
        </WriteFabItem>

        <WriteFabItem asChild>
          <Link href="/write/sale">판매글 작성</Link>
        </WriteFabItem>
      </WriteButton>
    </main>
  );
}
