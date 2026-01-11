"use client";

import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AnimatePresence } from "framer-motion";
import * as S from "./write-button.styled";

export function WriteButton({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <S.ButtonWrap>
        <DropdownMenu.Trigger asChild>
          <S.FabButton className={open ? "active" : ""} aria-label="글쓰기">
            <S.IconWrap>
              <S.Bar
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ type: "spring", stiffness: 600, damping: 36 }}
              />
              <S.Bar
                animate={{ rotate: open ? -45 : 90 }}
                transition={{ type: "spring", stiffness: 600, damping: 36 }}
              />
            </S.IconWrap>
          </S.FabButton>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <AnimatePresence>
            {open && (
              <S.Content side="top" align="center" sideOffset={13} asChild>
                <S.MotionContent
                  className={open ? "open" : ""}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 520,
                    damping: 34,
                  }}
                >
                  {children}
                </S.MotionContent>
              </S.Content>
            )}
          </AnimatePresence>
        </DropdownMenu.Portal>
      </S.ButtonWrap>
    </DropdownMenu.Root>
  );
}

export function WriteFabItem(props: React.ComponentProps<typeof S.MenuItem>) {
  return <S.MenuItem {...props} />;
}
