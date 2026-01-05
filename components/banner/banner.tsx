"use client";
import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Keyboard, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import * as S from "./banner.styled";

import "swiper/css";
import "swiper/css/pagination";

interface Banner {
  id: number;
  imageUrl: string;
  subtitle: string;
  mainTitle: string;
  badge?: string;
  link?: string;
  ariaLabel?: string;
}

const banners: Banner[] = [
  {
    id: 1,
    imageUrl: "/images/banner1.png",
    subtitle: "출석만 하면 쏟아진다!",
    mainTitle: "700P 적립, 무료배송 쿠폰\n80% 쿠폰까지!",
    badge: "APP 이벤트",
    ariaLabel:
      "앱 이벤트: 출석만 하면 700P 적립, 무료배송 쿠폰, 80% 쿠폰까지 제공",
  },
  {
    id: 2,
    imageUrl: "/images/banner2.png",
    subtitle: "물생활을 위한 연초 세일",
    mainTitle: "꽃게상민 수족관\n어항 용품 최대 80% 할인!",
    ariaLabel:
      "꽃게상민 수족관 연초 이벤트: 물생활을 위한 어항 용품 최대 80% 할인",
  },
  {
    id: 3,
    imageUrl: "/images/banner3.png",
    subtitle: "맹슬 동물병원 개업 이벤트",
    mainTitle: "첫 진료시 50% 할인,\n선착순 사은품 증정!",
    ariaLabel:
      "맹슬 동물 병원 개업 이벤트: 첫 진료시 50% 할인과 사은품 증정 이벤트",
  },
];

export function BannerSlide() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="홈 배너"
      className="relative"
    >
      <Swiper
        modules={[Pagination, Keyboard, Autoplay]}
        slidesPerView={1}
        keyboard={{ enabled: true }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="h-[150px]"
      >
        {banners.map((banner, index) => (
          <SwiperSlide
            key={banner.id}
            aria-label={`총 ${banners.length}개 중 ${index + 1}번째 배너`}
            className="relative overflow-hidden"
          >
            <Image
              src={banner.imageUrl}
              alt={banner.ariaLabel || ""}
              fill
              priority={index === 0}
              className="object-cover"
            />
            <S.BannerContent aria-hidden="true">
              <S.BannerSubtitle>{banner.subtitle}</S.BannerSubtitle>
              <S.BannerTitle>{banner.mainTitle}</S.BannerTitle>
              {banner.badge && <S.BannerBadge>{banner.badge}</S.BannerBadge>}
            </S.BannerContent>
          </SwiperSlide>
        ))}
      </Swiper>

      <S.PrevButton
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="이전 배너"
        type="button"
      >
        〈
      </S.PrevButton>
      <S.NextButton
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="다음 배너"
        type="button"
      >
        〉
      </S.NextButton>

      <div className="sr-only">
        총 {banners.length}개의 이벤트 배너가 있습니다. 화살표 키 또는 탭 키를
        사용하여 배너를 탐색할 수 있습니다.
      </div>
    </section>
  );
}
