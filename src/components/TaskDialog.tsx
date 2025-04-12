"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { FiCalendar, FiX } from "react-icons/fi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import AdvancedTaskOptions from "./AdvancedTaskOptions";

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    title: string;
    description?: string;
    dueDate?: Date | null;
    priority: "LOW" | "NORMAL" | "HIGH" | "URGENT";
    // Advanced scheduling fields
    recurrence?: string;
    recurrenceEnd?: string;
    estimatedMinutes?: number;
    reminderTime?: string;
    tags?: string;
    category?: string;
  }) => void;
}

export function TaskDialog({ open, onOpenChange, onSubmit }: TaskDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState<"LOW" | "NORMAL" | "HIGH" | "URGENT">("NORMAL");
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  
  // Advanced scheduling states
  const [recurrence, setRecurrence] = useState<string>("NONE");
  const [recurrenceEnd, setRecurrenceEnd] = useState<string>("");
  const [estimatedMinutes, setEstimatedMinutes] = useState<number | undefined>(undefined);
  const [reminderTime, setReminderTime] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [category, setCategory] = useState<string>("Default");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title,
      description: description || undefined,
      dueDate,
      priority,
      // Advanced scheduling fields
      recurrence,
      recurrenceEnd: recurrenceEnd || undefined,
      estimatedMinutes,
      reminderTime: reminderTime || undefined,
      tags: tags || undefined,
      category: category || undefined,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setDueDate(null);
    setPriority("NORMAL");
    setRecurrence("NONE");
    setRecurrenceEnd("");
    setEstimatedMinutes(undefined);
    setReminderTime("");
    setTags("");
    setCategory("Default");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new task.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details about your task"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Due Date (optional)</Label>
              <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    {dueDate ? (
                      format(dueDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    {dueDate && (
                      <div
                        className="ml-auto flex h-6 w-6 items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDueDate(null);
                        }}
                      >
                        <FiX className="h-4 w-4" />
                      </div>
                    )}
                    <FiCalendar className="ml-auto h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                    onDayClick={() => {
                      setTimeout(() => setDatePickerOpen(false), 0);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select
                value={priority}
                onValueChange={(value: "LOW" | "NORMAL" | "HIGH" | "URGENT") => setPriority(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOW">Low</SelectItem>
                  <SelectItem value="NORMAL">Normal</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="URGENT">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Advanced Task Options */}
          <div className="pt-2">
            <AdvancedTaskOptions
              recurrence={recurrence}
              setRecurrence={setRecurrence}
              recurrenceEnd={recurrenceEnd}
              setRecurrenceEnd={setRecurrenceEnd}
              estimatedMinutes={estimatedMinutes}
              setEstimatedMinutes={setEstimatedMinutes}
              reminderTime={reminderTime}
              setReminderTime={setReminderTime}
              tags={tags}
              setTags={setTags}
              category={category}
              setCategory={setCategory}
            />
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 