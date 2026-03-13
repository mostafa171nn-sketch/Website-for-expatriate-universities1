"use client";

import { useState, useEffect } from "react";
import { applicationService } from "@/services/databaseService";
import { Application } from "@/types";

export const useApplications = (studentId?: string) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = studentId
        ? await applicationService.getByStudent(studentId)
        : await applicationService.getAll();
      setApplications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [studentId]);

  const createApplication = async (application: Omit<Application, "id">) => {
    try {
      const id = await applicationService.create(application);
      await fetchApplications();
      return id;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to create application");
    }
  };

  const updateStatus = async (id: string, status: Application["status"]) => {
    try {
      await applicationService.updateStatus(id, status);
      await fetchApplications();
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to update status");
    }
  };

  return {
    applications,
    loading,
    error,
    refetch: fetchApplications,
    createApplication,
    updateStatus,
  };
};

export const useApplication = (id: string) => {
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        const data = await applicationService.getById(id);
        setApplication(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch application");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchApplication();
    }
  }, [id]);

  return { application, loading, error };
};

