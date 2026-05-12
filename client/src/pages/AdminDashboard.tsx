import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle2, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";

export default function AdminDashboard() {
  const { data: messages = [], isLoading, isError, error, refetch } = trpc.contact.getMessages.useQuery();
  const markAsReadMutation = trpc.contact.markAsRead.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Message marked as read");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to mark message as read");
    },
  });
  const deleteMessageMutation = trpc.contact.deleteMessage.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Message deleted");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete message");
    },
  });

  const handleMarkAsRead = (id: number) => {
    markAsReadMutation.mutate({ id });
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this message?")) {
      deleteMessageMutation.mutate({ id });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="py-20">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground mb-12">Manage contact form submissions</p>

            <div className="bg-card/50 border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Message</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isError ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center">
                          <div className="text-red-500 mb-4">
                            <p className="font-semibold">Error loading messages</p>
                            <p className="text-sm text-muted-foreground mt-1">{error?.message || "An error occurred"}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => refetch()}
                            className="mt-2"
                          >
                            Retry
                          </Button>
                        </td>
                      </tr>
                    ) : isLoading ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                          <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                        </td>
                      </tr>
                    ) : messages.length > 0 ? (
                      messages.map((msg) => (
                        <tr key={msg.id} className="border-b border-border hover:bg-background/50 transition-colors">
                          <td className="px-6 py-4 text-sm">{msg.name}</td>
                          <td className="px-6 py-4 text-sm">
                            <a href={`mailto:${msg.email}`} className="text-accent hover:underline">
                              {msg.email}
                            </a>
                          </td>
                          <td className="px-6 py-4 text-sm max-w-xs truncate">{msg.message}</td>
                          <td className="px-6 py-4 text-sm">
                            {msg.read ? (
                              <span className="text-green-500 flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" />
                                Read
                              </span>
                            ) : (
                              <span className="text-yellow-500 flex items-center gap-1">
                                <Mail className="w-4 h-4" />
                                Unread
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm flex gap-2">
                            {!msg.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarkAsRead(msg.id)}
                                disabled={markAsReadMutation.isPending}
                                className="text-green-500 hover:text-green-600 hover:bg-green-500/10"
                              >
                                {markAsReadMutation.isPending ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <CheckCircle2 className="w-4 h-4" />
                                )}
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(msg.id)}
                              disabled={deleteMessageMutation.isPending}
                              className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                            >
                              {deleteMessageMutation.isPending ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                          No messages yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
