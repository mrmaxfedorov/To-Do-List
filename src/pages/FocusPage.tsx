import React from "react";
import {useTaskStore} from "../hooks/useTaskStore";
import styled from "styled-components";
import TextButton from "../components/TextButton";
import MarkCompletedButton from "../components/MarkCompletedButton";
import Spacer from "../contexts/Spacer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const Task = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  padding-bottom: 45px;
`;

type Props = {};

const FocusPage: React.FC<Props> = () => {
  const {focusedTask: task, shuffleFocusedTask, updateTaskCompletion} = useTaskStore();

  const handleMarkCompleted = () => {
    if (task)
    updateTaskCompletion(task.id, true);
  };

  return task ? (
    <Container>
      <Task>{task.label}</Task>
      <MarkCompletedButton onClick={handleMarkCompleted}>Mark completed</MarkCompletedButton>
      <Spacer height={45}/>
      <TextButton onClick={shuffleFocusedTask}>nope</TextButton>
    </Container>
  ) : (
    <div>No incomplete tasks.</div>
  );
};

export default FocusPage