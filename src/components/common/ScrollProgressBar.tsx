"use client";

import { useEffect, useState } from "react";

const ScrollProgressBar = () => {
  // 컴포넌트가 클라이언트 측에서 마운트된 이후에만 스크롤 진행 바가 렌더링되게 함
  const [mounted, setMounted] = useState(false);

  // 스크롤된 비율을 저장
  const [scrollTop, setScrollTop] = useState(0);

  const onScroll = () => {
    // 현재 스크롤된 위치(페이지 상단에서부터 스크롤된 픽셀 수)
    const winScroll = document.documentElement.scrollTop;

    // 전체 페이지의 높이에서 현재 보이는 화면 높이를 뺀 값
    // 스크롤 가능한 전체 높이
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    // 현재 스크롤된 위치(winScroll)를 전체 스크롤 가능한 높이(height)로 나누어 스크롤된 비율을 계산
    const scrolled = (winScroll / height) * 100;

    // 이 함수는 스크롤이 발생할 때마다 호출
    // 계산된 스크롤 비율(scrolled)이 scrollTop 상태에 업데이트됨
    setScrollTop(scrolled);
  };

  useEffect(() => {
    // 컴포넌트가 마운트되면 window 객체에 scroll 이벤트 리스너를 등록
    // 스크롤이 발생할 때마나 onScroll 함수가 호출
    window.addEventListener("scroll", onScroll);

    // 컴포넌트가 언마운트되면 scroll 이벤트 리스너를 제거하여 메모리 누수를 방지
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 컴포넌트가 마운트되었을 때 mounted 상태를 true로 설정
  // 이를 통해 서버 사이드에서 렌더링할 때는 진행 바가 보이지 않도록 함
  useEffect(() => {
    setMounted(true);
  }, []);

  // 컴포넌트가 마운트되기 전에 렌더링을 방지
  if (!mounted) return null;

  return (
    <div className="fixed top-0 z-20 h-1 w-full bg-background">
      <div className="h-1 bg-primary" style={{ width: `${scrollTop}%` }}></div>
    </div>
  );
};

export default ScrollProgressBar;
