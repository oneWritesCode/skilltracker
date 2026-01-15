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
  const targetDate = new Date();
  
  if (date) {
    const [year, month, day] = date.split('-').map(Number);
    // Note: month is 0-indexed in JS Date
    targetDate.setFullYear(year, month - 1, day);
  }
  
  targetDate.setHours(0, 0, 0, 0);
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
