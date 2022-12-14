import React, {ChangeEvent, KeyboardEvent} from "react";
import {Task} from "../types";
import {useTaskStore} from "../hooks/useTaskStore";
import styled from "styled-components";
import TextButton from "../components/TextButton";
import Spacer from "../contexts/Spacer";
import DeleteIcon from "../icons/DeleteIcon";
import IconButton from "../components/IconButton";
import Checkbox from "../components/Checkbox";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-self: center;
  width: 460px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  padding: 45px 24px;
`;

const ListItem = styled.label`
  align-items: center;
  display: flex;
  padding: 4px 0;
  font-size: 18px;
  cursor: pointer;
`;

const DeleteButton = styled(IconButton)`
  visibility: hidden;
  cursor: pointer;

  ${ListItem}:hover & {
     visibility: visible;
   } 
`;

const Input = styled.input`
  background: rgba(0,0,0,0.5);
  color: #fff;
  border-radius: 15px;
  border: none;
  padding: 20px 24px;
  outline: none;
`;

type Props = {};

const ListPage: React.FC<Props> = () => {
  const {addTask, tasks, setTasks, updateTaskCompletion} = useTaskStore()
  const [newTaskLabel, setNewTaskLabel] = React.useState('');

  const handleNewTaskLabelChange = (e: ChangeEvent<HTMLInputElement>) => setNewTaskLabel(e.target.value)

  const handleNewTaskKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && newTaskLabel !== '') {
      addTask({label: newTaskLabel});
      setNewTaskLabel('');
    }
  };

  const handleTaskCompleteChange = (task: Task) => (e: ChangeEvent<HTMLInputElement>) => {
    updateTaskCompletion(task.id, e.target.checked)
  };
  console.log(tasks);

  const handleClearClick = () =>
    setTasks(tasks => tasks.filter(task => !task.isComplete))

  const handleTaskDeleteClick = (handledTask: Task) => () => {
    setTasks(tasks => tasks.filter(task => task.id !== handledTask.id))
  }

  return (
    <Container>
      <List>
          {tasks.map(task => (
              <ListItem key={task.id}>
                <Checkbox
                  type="checkbox"
                  checked={task.isComplete}
                  onChange={handleTaskCompleteChange(task)}
                />
                <Spacer width={24}/>
                {task.label}
                <Spacer flex={1}/>
                <DeleteButton onClick={handleTaskDeleteClick(task)}><DeleteIcon/></DeleteButton>
              </ListItem>
            ))}
      </List>
      <Spacer height={30}/>
      <Input
        placeholder="Add a task"
        value={newTaskLabel}
        onChange={handleNewTaskLabelChange}
        onKeyPress={handleNewTaskKeyPress}></Input>
      <Spacer height={45}/>
      <TextButton onClick={handleClearClick} style={{alignSelf: 'center'}}>
        Clear completed
      </TextButton>
    </Container>
  )
}

export default ListPage