"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { fetchBreaches, Breach } from "./services/breachService";
import BreachCard from "./components/BreachCard";
import ThemeToggle from "./components/ThemeToggle";
import LoadingSpinner from "./components/LoadingSpinner";

export default function Home() {
  const [breaches, setBreaches] = useState<Breach[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    loadBreaches();
    const savedExpandedId = localStorage.getItem("expandedBreachId");
    if (savedExpandedId) {
      setExpandedId(savedExpandedId);
    }
  }, []);

  // Save expanded state to localStorage whenever it changes
  useEffect(() => {
    if (expandedId) {
      localStorage.setItem("expandedBreachId", expandedId);
    } else {
      localStorage.removeItem("expandedBreachId");
    }
  }, [expandedId]);

  const loadBreaches = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchBreaches(0);
      setBreaches(data);
      setOffset(data.length);
      setHasMore(data.length > 0);
    } catch (err) {
      setError("Failed to load breaches. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreBreaches = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const data = await fetchBreaches(offset);

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setBreaches((prev) => [...prev, ...data]);
        setOffset((prev) => prev + data.length);
      }
    } catch (err) {
      setError("Failed to load more breaches. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, offset]);

  const lastBreachElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreBreaches();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, loadMoreBreaches]
  );

  const handleCardExpand = (breachId: string) => {
    setExpandedId((currentId) => {
      const newId = currentId === breachId ? null : breachId;
      return newId;
    });
  };

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Data Breach Viewer</h1>
        <ThemeToggle />
      </div>

      {error && (
        <div className="bg-red-500 bg-opacity-10 text-red-500 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {breaches.map((breach, index) => {
          if (breaches.length === index + 1) {
            return (
              <div ref={lastBreachElementRef} key={breach.Name}>
                <BreachCard
                  breach={breach}
                  isExpanded={expandedId === breach.Name}
                  onExpand={handleCardExpand}
                />
              </div>
            );
          } else {
            return (
              <BreachCard
                key={breach.Name}
                breach={breach}
                isExpanded={expandedId === breach.Name}
                onExpand={handleCardExpand}
              />
            );
          }
        })}
      </div>

      {isLoading && <LoadingSpinner />}

      {!isLoading && !hasMore && breaches.length > 0 && (
        <p className="text-center py-6 opacity-70">End of the list.</p>
      )}
    </main>
  );
}
