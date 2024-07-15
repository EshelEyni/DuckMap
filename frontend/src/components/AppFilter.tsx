import { FC } from "react";
import { ViewMode } from "../types/app";
import classnames from "classnames";

type AppFilterProps = {
  viewMode: ViewMode;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
};

type Button = {
  title: string;
  value: ViewMode;
};

const AppFilter: FC<AppFilterProps> = ({ viewMode, setViewMode }) => {
  const buttons: Button[] = [
    {
      title: "Map",
      value: "map",
    },
    {
      title: "Add Duck",
      value: "form",
    },
  ];

  function onClickButton(value: ViewMode) {
    setViewMode(value);
  }

  return (
    <div className="w-full flex items-center justify-center py-3 gap-5">
      {buttons.map(b => (
        <button
          key={b.value}
          onClick={() => onClickButton(b.value)}
          className={classnames(
            "px-3 py-1 bg-amber-400 rounded-full text-xl font-semibold text-amber-950",
            {
              "!bg-amber-500": viewMode === b.value,
            },
          )}
        >
          {b.title}
        </button>
      ))}
    </div>
  );
};

export default AppFilter;
