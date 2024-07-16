import { FC } from "react";
import { ViewMode } from "../types/app";
import styled from "styled-components";

type AppFilterProps = {
  viewMode: ViewMode;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
};

type Button = {
  title: string;
  value: ViewMode;
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  gap: 20px;
`;

const FilterButton = styled.button.attrs<{ isActive: boolean }>(_ => ({
  isActive: undefined,
}))<{ isActive: boolean }>`
  padding: 8px 12px;
  background-color: ${props => (props.isActive ? "#D97706" : "#FBBF24")};
  border-radius: 9999px;
  font-size: 1.25rem;
  font-weight: 600;
  color: #78350f;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    scale: 1.1;
  }
`;

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
    <Container>
      {buttons.map(b => (
        <FilterButton
          key={b.value}
          onClick={() => onClickButton(b.value)}
          isActive={viewMode === b.value}
        >
          {b.title}
        </FilterButton>
      ))}
    </Container>
  );
};

export default AppFilter;
