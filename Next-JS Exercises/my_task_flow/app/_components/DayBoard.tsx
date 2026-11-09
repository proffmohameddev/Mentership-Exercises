'use client';

import {
  useState,
  useEffect,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from '@hello-pangea/dnd';
import type { Day, Task } from '../types/taskflow';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Trash2, Check, X } from 'lucide-react';

type Props = {
  day: Day;
  mutate: () => Promise<unknown>;
};

// Local status union (don’t import from @prisma/client in client components)
type TaskStatus = 'TODO' | 'IN_PROCESS' | 'FINISHED';

const STATUS_COLUMNS: { id: TaskStatus; label: string; accent: string }[] = [
  { id: 'TODO', label: 'Todo', accent: 'text-amber-300' },
  { id: 'IN_PROCESS', label: 'In Process', accent: 'text-sky-300' },
  { id: 'FINISHED', label: 'Finished', accent: 'text-emerald-300' },
];

export function DayBoard({ day, mutate }: Props) {
  const [tasks, setTasks] = useState<Task[]>(day.tasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [renamingDay, setRenamingDay] = useState(false);
  const [dayTitle, setDayTitle] = useState(day.title);

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  // Optimistic local deletion state
  const [isDeleted, setIsDeleted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setTasks(day.tasks);
    setDayTitle(day.title);
  }, [day]);

  const finishedCount = tasks.filter((t) => t.status === 'FINISHED').length;
  const progress =
    tasks.length === 0
      ? 0
      : Math.round((finishedCount / tasks.length) * 100);

  // If day is deleted optimistically, don’t render anything
  if (isDeleted) {
    return null;
  }

  // ------- CRUD HANDLERS -------

  async function handleAddTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newTaskTitle.trim()) return;

    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newTaskTitle,
        dayId: day.id,
        status: 'TODO' as TaskStatus,
      }),
    });

    setNewTaskTitle('');
    await mutate();
  }

  async function handleRenameDay(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRenamingDay(false);

    await fetch(`/api/days/${day.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: dayTitle }),
    });

    await mutate();
  }

  async function handleDeleteDay() {
    if (isDeleting) return;

    
    const confirmed = window.confirm(
      'Delete this day and all its tasks?',
    );
    if (!confirmed) return;

    // Optimistic UI: hide card immediately
    setIsDeleting(true);
    setIsDeleted(true);

    const res = await fetch(`/api/days/${day.id}`, { method: 'DELETE' });

    if (!res.ok) {
      // Rollback if server failed
      setIsDeleted(false);
      setIsDeleting(false);
      
      alert('Failed to delete day. Please try again.');
      return;
    }

    await mutate();
    setIsDeleting(false);
  }

  function startEditTask(task: Task) {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
  }

  function cancelEditTask() {
    setEditingTaskId(null);
    setEditingTitle('');
  }

  async function saveTaskTitle(taskId: string) {
    if (!editingTitle.trim()) {
      cancelEditTask();
      return;
    }

    await fetch(`/api/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editingTitle }),
    });

    setEditingTaskId(null);
    setEditingTitle('');
    await mutate();
  }

  async function handleDeleteTask(taskId: string) {
  
    const confirmed = window.confirm('Delete this task?');
    if (!confirmed) return;

    await fetch(`/api/tasks/${taskId}`, {
      method: 'DELETE',
    });

    await mutate();
  }

  function handleEditKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
    taskId: string,
  ) {
    if (event.key === 'Enter') {
      void saveTaskTitle(taskId);
    }
    if (event.key === 'Escape') {
      cancelEditTask();
    }
  }

  // ------- DRAG & DROP LOGIC -------

  async function handleDragEnd(result: DropResult) {
    const { destination, source } = result;

    if (!destination) return;

    const sourceStatus = source.droppableId as TaskStatus;
    const destStatus = destination.droppableId as TaskStatus;

    if (
      sourceStatus === destStatus &&
      source.index === destination.index
    ) {
      return;
    }

    // Status → tasks map
    const columns: Record<TaskStatus, Task[]> = {
      TODO: [],
      IN_PROCESS: [],
      FINISHED: [],
    };

    tasks.forEach((task) => {
      columns[task.status].push(task);
    });

    (Object.keys(columns) as TaskStatus[]).forEach((status) => {
      columns[status].sort((a, b) => a.order - b.order);
    });

    const sourceTasks = columns[sourceStatus];
    const destTasks = columns[destStatus];

    const [moved] = sourceTasks.splice(source.index, 1);
    const movedUpdated: Task = { ...moved, status: destStatus };

    destTasks.splice(destination.index, 0, movedUpdated);

    const recomputed: Task[] = [];
    (Object.keys(columns) as TaskStatus[]).forEach((status) => {
      columns[status].forEach((task, index) => {
        recomputed.push({
          ...task,
          status,
          order: index + 1,
        });
      });
    });

    setTasks(recomputed);

    const payload = recomputed.map((task) => ({
      id: task.id,
      dayId: day.id,
      status: task.status,
      order: task.order,
    }));

    await fetch('/api/tasks/reorder', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ updates: payload }),
    });

    await mutate();
  }

  // ------- UI -------

  return (
    <Card className="border-zinc-800/70 bg-gradient-to-b from-zinc-950/80 via-zinc-900/80 to-zinc-950/80 backdrop-blur">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-2">
          {renamingDay ? (
            <form onSubmit={handleRenameDay} className="flex gap-2">
              <Input
                value={dayTitle}
                onChange={(event) => setDayTitle(event.target.value)}
                className="h-8 border-zinc-700 bg-zinc-900/80 text-zinc-50"
              />
              <Button
                type="submit"
                size="sm"
                variant="outline"
                className="border-zinc-700 text-zinc-100"
              >
                Save
              </Button>
            </form>
          ) : (
            <CardTitle className="text-sm font-semibold text-zinc-50">
              {day.title}{' '}
              <span className="ml-1 text-xs font-normal text-zinc-400">
                ({tasks.length} tasks • {progress}%)
              </span>
            </CardTitle>
          )}
          <div className="flex items-center gap-2">
            <div className="relative h-1.5 w-28 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-fuchsia-400"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[11px] text-zinc-400">
              Done: {finishedCount}/{tasks.length || 0}
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            type="button"
            aria-label="Rename day"
            className="text-zinc-300 hover:bg-zinc-800"
            onClick={() => setRenamingDay((prev) => !prev)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            aria-label="Delete day"
            className="text-zinc-300 hover:bg-zinc-800"
            onClick={handleDeleteDay}
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4 text-rose-400" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* Add Task */}
        <form onSubmit={handleAddTask} className="mb-4 flex gap-2">
          <Input
            value={newTaskTitle}
            onChange={(event) => setNewTaskTitle(event.target.value)}
            placeholder="New task for this day…"
            className="border-zinc-700 bg-zinc-900/80 text-zinc-50 placeholder:text-zinc-500"
          />
          <Button
            type="submit"
            size="sm"
            className="rounded-full bg-gradient-to-r from-emerald-500 via-sky-500 to-fuchsia-500 text-xs font-semibold shadow-emerald-500/30 hover:brightness-110"
          >
            Add
          </Button>
        </form>

        {/* Kanban Columns */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-2">
            {STATUS_COLUMNS.map((column) => (
              <Droppable key={column.id} droppableId={column.id}>
                {(droppableProvided) => (
                  <div
                    ref={droppableProvided.innerRef}
                    {...droppableProvided.droppableProps}
                    className="flex-1 rounded-lg bg-zinc-950/40 p-2"
                  >
                    <p className="mb-2 flex items-center justify-between text-[11px] font-medium uppercase tracking-wide text-zinc-400">
                      <span>{column.label}</span>
                      <span className={column.accent}>
                        {
                          tasks.filter((t) => t.status === column.id)
                            .length
                        }
                      </span>
                    </p>

                    {tasks
                      .filter((task) => task.status === column.id)
                      .sort((a, b) => a.order - b.order)
                      .map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(draggableProvidedInner, snapshot) => (
                            <div
                              ref={draggableProvidedInner.innerRef}
                              {...draggableProvidedInner.draggableProps}
                              {...draggableProvidedInner.dragHandleProps}
                              className={`mb-2 rounded-md border px-2 py-2 text-xs shadow-sm transition ${
                                snapshot.isDragging
                                  ? 'border-emerald-500/80 bg-emerald-500/10 shadow-emerald-500/40'
                                  : 'border-zinc-700 bg-zinc-900/80'
                              }`}
                            >
                              {editingTaskId === task.id ? (
                                <div className="flex items-center gap-2">
                                  <Input
                                    value={editingTitle}
                                    onChange={(event) =>
                                      setEditingTitle(event.target.value)
                                    }
                                    onKeyDown={(event) =>
                                      handleEditKeyDown(event, task.id)
                                    }
                                    className="h-7 border-zinc-600 bg-zinc-900/90 text-[11px] text-zinc-50"
                                    autoFocus
                                  />
                                  <Button
                                    type="button"
                                    size="icon"
                                    className="h-7 w-7 rounded-full bg-emerald-500/90 hover:bg-emerald-500"
                                    onClick={() => {
                                      void saveTaskTitle(task.id);
                                    }}
                                  >
                                    <Check className="h-3 w-3 text-zinc-950" />
                                  </Button>
                                  <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7 rounded-full border border-zinc-600/70 bg-zinc-900/80 hover:bg-zinc-800"
                                    onClick={cancelEditTask}
                                  >
                                    <X className="h-3 w-3 text-zinc-200" />
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <div className="text-[11px] font-medium text-zinc-50">
                                      {task.title}
                                    </div>
                                    {task.description && (
                                      <p className="mt-1 line-clamp-2 text-[11px] text-zinc-400">
                                        {task.description}
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex shrink-0 gap-1">
                                    <Button
                                      type="button"
                                      size="icon"
                                      variant="ghost"
                                      className="h-6 w-6 text-zinc-300 hover:bg-zinc-800"
                                      onClick={() => startEditTask(task)}
                                      aria-label="Edit task"
                                    >
                                      <Pencil className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      type="button"
                                      size="icon"
                                      variant="ghost"
                                      className="h-6 w-6 text-rose-300 hover:bg-zinc-800"
                                      onClick={() => {
                                        void handleDeleteTask(task.id);
                                      }}
                                      aria-label="Delete task"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {droppableProvided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </CardContent>
    </Card>
  );
}
