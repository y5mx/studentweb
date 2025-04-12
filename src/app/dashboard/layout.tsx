"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signOut } from "next-auth/react";
import { 
  FiCheckSquare, 
  FiMenu, 
  FiLogOut, 
  FiPlus, 
  FiX, 
  FiUser,
  FiCheck,
  FiBarChart2
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TaskDialog } from "@/components/TaskDialog";
import { toast } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);
  const router = useRouter();

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Redirect if not authenticated
  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleAddTask = async (data: {
    title: string;
    description?: string;
    dueDate?: Date | null;
    priority: "LOW" | "NORMAL" | "HIGH" | "URGENT";
    recurrence?: string;
    recurrenceEnd?: string;
    estimatedMinutes?: number;
    reminderTime?: string;
    tags?: string;
    category?: string;
  }) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ...data,
          dueDate: data.dueDate ? data.dueDate.toISOString() : undefined,
        }),
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || "Failed to create task");
      }
      
      toast.success("Task created successfully");
      setShowAddTaskDialog(false);
      
      // Refresh the page to show the new task
      router.refresh();
      
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top navbar */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </Button>
            <h1 className="text-xl font-bold text-primary ml-2">Task Manager</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline-block">
              {session?.user?.email}
            </span>
            <Avatar className="h-8 w-8">
              {session?.user?.image ? (
                <AvatarImage src={session.user.image} alt={session.user.name || ""} />
              ) : (
                <AvatarFallback>
                  <FiUser />
                </AvatarFallback>
              )}
            </Avatar>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2"
            >
              <FiLogOut className="h-4 w-4" />
              <span className="hidden sm:inline-block">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile Sidebar - shown when mobileMenuOpen is true */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}>
            <aside 
              className="absolute top-0 left-0 h-full w-64 bg-slate-50 shadow-lg z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="py-4 px-3 flex-1 overflow-y-auto">
                <div className="flex justify-between items-center mb-4 px-2">
                  <h2 className="font-semibold text-primary">Menu</h2>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiX />
                  </Button>
                </div>
                <nav className="space-y-1">
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <FiCheckSquare className="mr-2 h-4 w-4" />
                      Active Tasks
                    </Button>
                  </Link>
                  <Link href="/dashboard/completed" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <FiCheck className="mr-2 h-4 w-4" />
                      Completed Tasks
                    </Button>
                  </Link>
                  <Link href="/dashboard/progress" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <FiBarChart2 className="mr-2 h-4 w-4" />
                      Progress Analytics
                    </Button>
                  </Link>
                </nav>
              </div>
              <div className="p-3 border-t border-slate-200">
                <Button 
                  className="w-full flex items-center justify-center"
                  onClick={() => {
                    setShowAddTaskDialog(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <FiPlus className="mr-2 h-4 w-4" />
                  New Task
                </Button>
              </div>
            </aside>
          </div>
        )}

        {/* Desktop Sidebar - hidden on mobile */}
        <aside className="hidden md:flex md:w-64 flex-col bg-slate-50 border-r border-slate-200">
          <div className="py-4 px-3 flex-1 overflow-y-auto">
            <nav className="space-y-1">
              <Link href="/dashboard">
                <Button variant="ghost" className="w-full justify-start">
                  <FiCheckSquare className="mr-2 h-4 w-4" />
                  Active Tasks
                </Button>
              </Link>
              <Link href="/dashboard/completed">
                <Button variant="ghost" className="w-full justify-start">
                  <FiCheck className="mr-2 h-4 w-4" />
                  Completed Tasks
                </Button>
              </Link>
              <Link href="/dashboard/progress">
                <Button variant="ghost" className="w-full justify-start">
                  <FiBarChart2 className="mr-2 h-4 w-4" />
                  Progress Analytics
                </Button>
              </Link>
            </nav>
          </div>
          <div className="p-3 border-t border-slate-200">
            <Button 
              className="w-full flex items-center justify-center"
              onClick={() => setShowAddTaskDialog(true)}
            >
              <FiPlus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </div>
        </aside>
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-white p-6">
          {children}
        </main>
      </div>
      
      {/* Task creation dialog */}
      <TaskDialog
        open={showAddTaskDialog}
        onOpenChange={setShowAddTaskDialog}
        onSubmit={handleAddTask}
      />
    </div>
  );
} 