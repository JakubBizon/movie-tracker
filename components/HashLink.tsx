"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Link>;

export default function HashLink({ href, ...props }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const hrefStr = href.toString();
    const [path, hash] = hrefStr.split("#");

    if (!hash) return;

    e.preventDefault();
    const targetPath = path || "/";

    if (pathname === targetPath) {
      const el = document.getElementById(hash);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${hash}`);
    } else {
      router.push(hrefStr);
    }
  };
  return (
    <Link href={href} onClick={handleClick} {...props}>
      {props.children}
    </Link>
  );
}
