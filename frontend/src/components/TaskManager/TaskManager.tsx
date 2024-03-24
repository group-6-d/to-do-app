import React, { useState } from 'react';
import TaskCard from '../../models/TaskCard'; // Adjust the import path as necessary
import TaskPopupRead from '../TaskPopupRead';
import TaskPopupEdit from '../TaskPopupEdit';
import useCategories from '../../hooks/useCategories';

interface TaskManagerProps {
  task: TaskCard;
  closeTaskManager: () => void;
}

// Example TaskManager component
const TaskManager: React.FC<TaskManagerProps> = ({task, closeTaskManager,}) => {
  const token = localStorage.getItem('token');
  const { categories } = useCategories(token);

  const initialTask = task || null;
  const initialMode = task ? false : true;
  const [currentTask, setCurrentTask] = useState<TaskCard | null>(initialTask);
  const [isEditMode, setIsEditMode] = useState<boolean>(initialMode);
  

  const handleEditClick = () => {
    setIsEditMode(true); // Switch to edit mode
  };

  const closeTaskPopup = () => {
    setIsEditMode(false);
    setCurrentTask(null); // Reset current task
    closeTaskManager();
  };

  const onUpdateTask = (updatedTask: TaskCard) => {
    // Update the task in your state or database here
    console.log('Task updated:', updatedTask);
    setIsEditMode(false); // Optionally close the edit mode after saving
  };

  return (
    <div>
      {!isEditMode && currentTask && (
        <TaskPopupRead
          task={currentTask}
          closeTaskPopup={closeTaskPopup}
          onEditClick={handleEditClick}
        />
      )}
      {isEditMode && currentTask && (
        <TaskPopupEdit
          categories={categories || []}
          task={currentTask}
          closeTaskPopup={closeTaskPopup}
          onUpdateTask={onUpdateTask}
          setIsEditMode={setIsEditMode}
          setCurrentTask={setCurrentTask}
        />
      )}
    </div>
  );
};

export default TaskManager;
