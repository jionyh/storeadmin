import dayjs from "dayjs";

export const todayDate = () => dayjs().startOf("day").toString();

export const sixMonthDate = () => dayjs().subtract(5, "months").startOf("month").toString();
