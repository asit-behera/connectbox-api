import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLoginRecordDto } from './dto/create-login-record.dto';
import { WeeklyRatingResponseDto } from './dto/weekly-rating-response.dto';

@Injectable()
export class LoginRecordService {
  constructor(private readonly prisma: PrismaService) {}

  async recordLogin(createLoginRecordDto: CreateLoginRecordDto) {
    await this.prisma.loginRecord.create({
      data: {
        userId: createLoginRecordDto.userId,
        ip: normalizeIp(createLoginRecordDto.ip),
        loginTime: new Date(),
      },
    });
  }

  async getLoginRecords(userId: string) {
    const records = await this.prisma.loginRecord.findMany({
      where: { userId },
      take: 30,
      orderBy: { loginTime: 'desc' },
      include: { user: true },
    });

    return records.map((record) => ({
      id: record.id,
      userId: record.userId,
      username: record.user ? record.user.username : null,
      ip: record.ip,
      loginTime: formatDate(record.loginTime),
    }));
  }

  async getWeeklyLoginRanking(): Promise<WeeklyRatingResponseDto[]> {
    return this.prisma.$queryRawUnsafe<WeeklyRatingResponseDto[]>(`
    SELECT u.username, "userId", logins.count::text, DENSE_RANK() OVER (
      ORDER BY logins.count DESC
    )::text AS rank
    FROM (
      SELECT "userId", COUNT(*)::text AS count
      FROM "LoginRecord"
      WHERE
        "loginTime" >= date_trunc('week', CURRENT_DATE)
        AND "loginTime" < date_trunc('week', CURRENT_DATE) + interval '7 days'
      GROUP BY "userId"
    ) AS logins
    JOIN "User" u ON u.id = "userId"
    ORDER BY rank
    LIMIT 20
  `);
  }
}

function normalizeIp(ip: string): string {
  if (ip.startsWith('::ffff:')) {
    return ip.replace('::ffff:', '');
  }
  return ip;
}

function formatDate(date: Date): string {
  const pad = (n: number): string => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}
