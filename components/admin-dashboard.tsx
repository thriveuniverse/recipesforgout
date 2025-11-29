'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Users, ChefHat, MessageSquare, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Submission {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  status: string;
  createdAt: Date;
}

interface AdminDashboardProps {
  submissions: Submission[];
  stats: {
    totalRecipes: number;
    totalUsers: number;
    totalSubmissions: number;
    newSubmissions: number;
  };
}

export function AdminDashboard({ submissions, stats }: AdminDashboardProps) {
  const router = useRouter();
  const [updating, setUpdating] = useState<string | null>(null);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    try {
      await fetch('/api/admin/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      router.refresh();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-700 text-white py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8" />
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          </div>
          <p className="text-gray-300 text-lg">Manage site content and view submissions</p>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <ChefHat className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats?.totalRecipes ?? 0}</p>
                <p className="text-sm text-gray-600">Total Recipes</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats?.totalUsers ?? 0}</p>
                <p className="text-sm text-gray-600">Total Users</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats?.totalSubmissions ?? 0}</p>
                <p className="text-sm text-gray-600">Contact Submissions</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Mail className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats?.newSubmissions ?? 0}</p>
                <p className="text-sm text-gray-600">New Submissions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Submissions */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">Contact Form Submissions</h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions?.length > 0 ? (
                  submissions.map((submission) => (
                    <TableRow key={submission?.id}>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(submission?.createdAt ?? Date.now()).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-medium">{submission?.name ?? '-'}</TableCell>
                      <TableCell className="text-sm">{submission?.email ?? '-'}</TableCell>
                      <TableCell className="text-sm">
                        {submission?.subject || '-'}
                      </TableCell>
                      <TableCell className="text-sm max-w-xs truncate">
                        {submission?.message ?? '-'}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            submission?.status === 'new'
                              ? 'bg-amber-100 text-amber-800'
                              : submission?.status === 'read'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {submission?.status ?? 'new'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {submission?.status === 'new' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateStatus(submission?.id ?? '', 'read')}
                              disabled={updating === submission?.id}
                            >
                              Mark Read
                            </Button>
                          )}
                          {submission?.status === 'read' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateStatus(submission?.id ?? '', 'resolved')}
                              disabled={updating === submission?.id}
                            >
                              Resolve
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No submissions yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
