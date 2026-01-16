import { useState, useCallback } from "react";

interface UseCalendarOptions {
  minDaysFromNow?: number;
  maxDaysFromNow?: number;
}

interface UseCalendarReturn {
  currentMonth: Date;
  showCalendar: boolean;
  setShowCalendar: (show: boolean) => void;
  navigateMonth: (direction: number) => void;
  getDaysInMonth: () => (Date | null)[];
  isDateAllowed: (date: Date) => boolean;
  formatDateDisplay: (dateStr: string) => string;
  handleDateSelect: (date: Date, onSelect: (dateStr: string) => void) => void;
}

export function useCalendar({
  minDaysFromNow = 1,
  maxDaysFromNow = 30,
}: UseCalendarOptions = {}): UseCalendarReturn {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get minimum date
  const getMinDate = useCallback(() => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + minDaysFromNow);
    return minDate;
  }, [minDaysFromNow]);

  // Get maximum date
  const getMaxDate = useCallback(() => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + maxDaysFromNow);
    return maxDate;
  }, [maxDaysFromNow]);

  // Check if a date is within the allowed range
  const isDateAllowed = useCallback(
    (date: Date) => {
      const minDate = getMinDate();
      const maxDate = getMaxDate();
      minDate.setHours(0, 0, 0, 0);
      maxDate.setHours(23, 59, 59, 999);
      const checkDate = new Date(date);
      checkDate.setHours(12, 0, 0, 0);
      return checkDate >= minDate && checkDate <= maxDate;
    },
    [getMinDate, getMaxDate]
  );

  // Get days in month for calendar grid
  const getDaysInMonth = useCallback(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    // Add all days in the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  }, [currentMonth]);

  // Format date for display
  const formatDateDisplay = useCallback((dateStr: string) => {
    if (!dateStr) return "Pilih tarikh";
    const date = new Date(dateStr);
    return date.toLocaleDateString("ms-MY", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []);

  // Handle date selection
  const handleDateSelect = useCallback(
    (date: Date, onSelect: (dateStr: string) => void) => {
      const dateStr = date.toISOString().split("T")[0];
      onSelect(dateStr);
      setShowCalendar(false);
    },
    []
  );

  // Navigate months
  const navigateMonth = useCallback((direction: number) => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + direction, 1)
    );
  }, []);

  return {
    currentMonth,
    showCalendar,
    setShowCalendar,
    navigateMonth,
    getDaysInMonth,
    isDateAllowed,
    formatDateDisplay,
    handleDateSelect,
  };
}
