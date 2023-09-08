"use client";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import React, { useState } from "react";
import useDate from "@/hooks/useDate";
import { useSwipeable, SwipeEventData } from "react-swipeable";

export const DatePicker = () => {
  const {
    handleLeftArrow,
    handleRightArrow,
    getDayAndMonth,
    getWeekDay,
    selectedDate,
    weekDates,
  } = useDate();
  const [activeDay, setActiveDay] = useState(dayjs(selectedDate));

  const handlers = useSwipeable({
    onSwiped: (eventData) => handleSwipe(eventData),
    trackMouse: true,
  });

  const handleButton = (item: Dayjs) => {
    setActiveDay(item);
    // clickFn(dayjs(`${dia.format('YYYY')}-${mes}-${item}`).format())
  };

  const handleSwipe = (eventData: SwipeEventData) => {
    if (eventData.dir === "Right") {
      handleLeftArrow();
      return;
    }
    handleRightArrow();
  };
  return (
    <>
      <div className="flex w-full items-center justify-center px-1">
        <button className="" onClick={handleLeftArrow}>
          <AiOutlineCaretLeft size={30} />
        </button>
        <div
          {...handlers}
          className="grid w-full select-none grid-cols-7 gap-0.5 transition-all ease-linear"
        >
          {weekDates.map((item, i) => (
            <div
              key={i}
              className={`${
                activeDay.isSame(item, "day") ? "bg-red-500 text-white" : ""
              }  flex h-full w-full cursor-pointer flex-col items-center justify-center border p-0.5 text-xs leading-tight text-black transition-opacity`}
              onClick={() => handleButton(item)}
            >
              <div className="">{getWeekDay(item).toUpperCase()}</div>
              <button>{getDayAndMonth(item)}</button>
            </div>
          ))}
        </div>

        <button onClick={handleRightArrow}>
          <AiOutlineCaretRight size={30} />
        </button>
      </div>
    </>
  );
};
