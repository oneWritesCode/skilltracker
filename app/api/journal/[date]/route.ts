import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ date: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { date } = await params;

  // Create date from YYYY-MM-DD ensuring local midnight
  // Create date from YYYY-MM-DD ensuring local midnight
  let targetDate = new Date();

  if (date) {
    targetDate = new Date(date);
  }

  // No need to setHours(0,0,0,0) if date string is YYYY-MM-DD as it defaults to UTC midnight
  // But if we want to be safe or if it has time components (unlikely for route param), we can leave it.
  // However, `new Date("2026-01-15")` is UTC midnight.
  // Our DB saves "2026-01-15T00:00:00.000Z".

  console.log("Querying for date:", targetDate);

  const journal = await prisma.journal.findUnique({
    where: {
      userId_date: {
        userId: session.user.id,
        date: targetDate,
      },
    },
    include: {
      tasks: true,
    },
  });

  if (!journal) {
    return NextResponse.json({ exists: false });
  }

  return NextResponse.json({
    exists: true,
    journal,
  });
}
