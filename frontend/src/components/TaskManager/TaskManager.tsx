import React, { useState } from 'react';
import TaskCard from '../../models/TaskCard'; // Adjust the import path as necessary
import TaskPopupRead from '../TaskPopupRead';
import TaskPopupEdit from '../TaskPopupEdit';

interface TaskManagerProps {
  task: TaskCard;
  closeTaskManager: () => void;
}

// Example TaskManager component
const TaskManager: React.FC<TaskManagerProps> = () => {
  const [currentTask, setCurrentTask] = useState<TaskCard | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const handleEditClick = () => {
    setIsEditMode(true); // Switch to edit mode
  };

  const closeTaskPopup = () => {
    setIsEditMode(false);
    setCurrentTask(null); // Reset current task
  };

  const onSaveTask = (updatedTask: TaskCard) => {
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
          task={currentTask}
          closeTaskPopup={closeTaskPopup}
          onSaveTask={onSaveTask}
        />
      )}
    </div>
  );
};

export default TaskManager;
