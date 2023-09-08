"use client";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { MenuButton } from "./MenuButton";

type Params = {
  icon?: boolean;
  position?: "left" | "right";
  children?: ReactElement | ReactNode;
};
export default function Menu({ children, icon, position = "right" }: Params) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative">
      <MenuButton icon={icon || undefined} handleToggle={handleToggle} />
      {isOpen && (
        <div
          ref={menuRef}
          onClick={() => setIsOpen(false)}
          className={`absolute ${
            position === "right" ? " right-0  top-10" : "left-0 top-7"
          } z-10 w-fit rounded bg-white shadow-md`}
        >
          <ul className="w-full space-y-1 py-3">{children}</ul>
        </div>
      )}
    </div>
  );
}
