"use client";
import styled from "styled-components";

export const BannerContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
  color: white;
  text-align: center;
  padding: 0 20px;
`;

export const BannerSubtitle = styled.p`
  font-size: 1.2rem;
  font-weight: 100;
  margin-bottom: 5px;
`;

export const BannerTitle = styled.strong`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.25;
  margin-bottom: 8px;
  white-space: pre-line;
  text-decoration: underline;
  text-decoration-color: rgba(255, 255, 255, 0.4);
  text-underline-offset: 4px;
`;

export const BannerBadge = styled.span`
  display: inline-block;
  padding: 0px 8px;
  background-color: white;
  color: #fc5142;
  border-radius: 30px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  z-index: 10;
  color: rgba(255, 255, 255, 0.3);
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    color: white;
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    color: white;
    outline: 2px solid var(--main_color);
    outline-offset: 4px;
  }

  &:active {
    color: rgba(255, 255, 255, 0.8);
    transform: scale(0.95);
  }
`;

export const PrevButton = styled(NavigationButton)`
  left: 10px;
`;

export const NextButton = styled(NavigationButton)`
  right: 10px;
`;
