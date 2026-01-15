import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

// gte rquest to get all the journals
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const journals = await prisma.journal.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      date: "desc",
    },
    include: {
      tasks: true,
    },
  });

  return NextResponse.json(journals);
}

// post request to save my journal Content
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { journalContent, tasks } = await req.json();

  if (!journalContent) {
    return NextResponse.json(
      { error: "journal Content required" },
      { status: 400 }
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const journal = await prisma.journal.upsert({
    where: {
      userId_date: {
        userId: session.user.id,
        date: today,
      },
    },
    update: {
      journalContent,
      tasks: {
        deleteMany: {}, // overwrite tasks for the day
        create: tasks.map((t: any) => ({
          title: t.title,
          completed: t.completed,
        })),  
      },
    },
    create: {
      userId: session.user.id,
      date: today,
      journalContent,
      tasks: {
        create: tasks.map((t: any) => ({
          title: t.title,
          completed: t.completed,
        })),
      },
    },
  });

  return NextResponse.json(journal, { status: 201 });
}
