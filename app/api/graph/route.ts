import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Calculate date 365 days ago
  const oneYearAgo = new Date();
  oneYearAgo.setDate(oneYearAgo.getDate() - 365);

  const journals = await prisma.journal.findMany({
    where: {
      userId: session.user.id,
      date: {
        gte: oneYearAgo,
      },
    },
    select: {
      date: true,
      tasks: {
        where: {
          completed: true,
        },
      },
    },
  });

  // Transform data to a map of date string -> completed count
  const data = journals.map((journal: any) => ({
    date: journal.date.toISOString().split("T")[0],
    count: journal.tasks.length,
  }));

  return NextResponse.json(data);
}
