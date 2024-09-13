import { useCallback, useEffect, useRef, useState } from "react";

type ScrollDirection = "UP" | "DOWN";

export const useSpyElem = (elemHeight: number) => {
  // useRef를 사용하여 특정 DOM 요소를 참조
  // 스크롤 상태를 추적
  const ref = useRef<HTMLDivElement>(null);

  // 스크롤 시 해당 요소의 상단 여백을 동적으로 조정하는 값
  // 요소가 스크롤에 따라 위로 사라지거나 아래로 나타나게 하는데 사용
  const [marginTop, setMarginTop] = useState(0);

  // 전 스크롤 위치를 추적
  // 현재 스크롤 위치와 비교하여 사용자가 스크롤을 위로 올리는지(UP) 아래로 내리는지(DOWN) 판단
  const prevScrollTop = useRef(0);

  // 스크롤 방향을 추적
  // 스크롤이 위로 이동(UP) 중인지 아래로 이동(DOWN) 중인지 확인하여 처리
  const prevDirection = useRef<ScrollDirection>("DOWN");

  // 스크롤 방향이 바뀌는 시점을 추적
  // 요소의 최하단을 기준으로 스크롤 방향이 바뀌는 지점을 기억하고, 이 지점을 기준으로 상단 여백(marginTop)을 동적으로 변경
  const transitionPoint = useRef(elemHeight);

  // 이벤트가 발생할 때 호출
  // 스크롤의 현재 위치(currentScrollTop)와 이전 스크롤 위치(preScrollTop.current)를 비교하여 스크롤 방향을 확인
  const onScroll = useCallback(() => {
    const currentScrollTop =
      document?.documentElement?.scrollTop || document?.body?.scrollTop || 0;
    const nextDirection =
      prevScrollTop.current > currentScrollTop ? "UP" : "DOWN";

    // 스크롤 방향 감지
    // 스크롤 방향이 DOWN에서 UP으로 바뀌는 경우
    const isUpTransition =
      prevDirection.current === "DOWN" && nextDirection === "UP";
    // 스크롤 방향이 UP에서 DOWN으로 바뀌는 경우
    const isDownTransition =
      prevDirection.current === "UP" && nextDirection === "DOWN";

    const NextBottomPoint = currentScrollTop + elemHeight;

    // transition이 현재 스크롤 위치보다 위에 있을 때만 해당 지점을 현재 스크롤 위치로 업데이트???
    if (isUpTransition && transitionPoint.current < currentScrollTop) {
      transitionPoint.current = prevScrollTop.current;
    }

    // 전환 지점(transitionPoint)이 현재 스크롤된 하단 지점(NextBottomPoint)보다 아래에 있는 경우 전환 지점을 다시 계산하여 업데이트???
    if (isDownTransition && NextBottomPoint < transitionPoint.current) {
      transitionPoint.current = prevScrollTop.current + elemHeight;
    }

    //transitionPoint.current에서 NextBottomPoint를 뺀 값이 너무 작지 않도록 하여, 상단 여백(marginTop)이 최소 -elemHeight 이상이 되도록 보장
    // 계산된 값이 최소 -elemHeight보다 작아지지 않도록 보장합니다. 즉, 요소가 완전히 사라지면(-elemHeight) 더 이상 상단으로 이동하지 않도록 제한
    // Math.min(0, ...)는 계산된 newMargin 값이 최대 0px 이하로 설정되도록 보장
    const newMargin = Math.min(
      0,
      Math.max(-elemHeight, transitionPoint.current - NextBottomPoint)
    );
    setMarginTop(newMargin);

    // 이벤트가 마무리된 시점. 현재 값을 prev에 저장
    prevDirection.current = nextDirection;
    prevScrollTop.current = currentScrollTop;
  }, [elemHeight]);

  // 중간 지점에서 새로고침시 transition point를 해당 지점으로 초기화
  useEffect(() => {
    const scrollTop =
      document.documentElement?.scrollTop || document.body.scrollTop;
    transitionPoint.current = scrollTop + elemHeight;
    prevScrollTop.current = scrollTop;
  }, [elemHeight]);

  // window document에 scroll 이벤트 부착, 해제
  useEffect(() => {
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return { ref, marginTop };
};
