"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import SessionCard from "./SessionCard";

export default function SessionSettings() {
  const queryClient = useQueryClient();
  const { data: sessions, isPending } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => (await authClient.listSessions()).data,
  });

  const { data: currentSession } = authClient.useSession();

  const revoke = useMutation({
    mutationFn: (token: string) => authClient.revokeSession({ token }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });

  if (isPending) {
    return <div>xd</div>;
    //todo skeleton
  }

  return (
    <Card>
      <CardHeader>
        <span className="text-lg font-semibold">Sessions</span>
      </CardHeader>
      <CardContent className="xs:px-6 px-4 flex flex-col gap-3">
        {sessions?.map((s, index) => (
          <SessionCard
            key={s.id}
            session={s}
            index={index}
            isCurrent={s.id === currentSession?.session.id}
            onRevoke={() => revoke.mutate(s.token)}
          />
        ))}
      </CardContent>
    </Card>
  );
}
