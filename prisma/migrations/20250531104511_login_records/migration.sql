-- CreateTable
CREATE TABLE "LoginRecord" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,
    "ip" VARCHAR(45) NOT NULL,
    "loginTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoginRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LoginRecord" ADD CONSTRAINT "LoginRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
