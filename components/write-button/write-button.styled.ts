import styled from "styled-components";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";

export const ButtonWrap = styled.div`
  position: absolute;
  right: 16px;
  bottom: 80px;
  z-index: 1000;
`;

export const FabButton = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 999px;
  border: none;
  outline: none;
  background-color: var(--main_color);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  display: grid;
  place-items: center;

  transition:
    transform 120ms ease,
    background-color 160ms ease;

  &:active {
    transform: scale(0.98);
  }

  &.open {
    background-color: #f3f7ff;
  }
`;

/** + / X 아이콘 컨테이너 */
export const IconWrap = styled.div`
  width: 24px;
  height: 24xwpx;
  color: white;
  position: relative;

  ${FabButton}.open & {
    color: black;
  }
`;

export const Bar = styled(motion.div)`
  position: absolute;
  inset: 0;
  margin: auto;
  width: 22px;
  height: 2px;
  border-radius: 999px;
  background: currentColor;
`;

export const Content = styled(DropdownMenu.Content)`
  /* 애니메이션 기준점 설정 */
  transform-origin: var(--radix-dropdown-menu-content-transform-origin);
`;

export const MotionContent = styled(motion.div)`
  background: #f3f7ff;
  border-radius: 10px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  min-width: 140px;
  margin-right: 16px;

  &.open {
    pointer-events: auto;
  }
`;

export const MenuItem = styled(DropdownMenu.Item)`
  &,
  & > a,
  & > button {
    display: block;
    width: 100%;
    padding: 14px 38px;
    font-size: 14px;
    text-decoration: none;
    color: black;
    background: transparent;
    border: 0;
    cursor: pointer;
    outline: none;
  }

  & + & {
    border-top: 1px solid var(--gray_medium_color);
  }

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }

  &:focus-within {
    background: rgba(0, 0, 0, 0.06);
  }

  &[data-disabled] {
    opacity: 0.4;
    pointer-events: none;
  }
`;
