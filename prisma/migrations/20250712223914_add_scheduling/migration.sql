-- CreateEnum
CREATE TYPE "SchedulingStatus" AS ENUM ('agendado', 'cancelado', 'concluido');

-- CreateTable
CREATE TABLE "Scheduling" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "data_agendamento" TIMESTAMP(3) NOT NULL,
    "local" TEXT,
    "status" "SchedulingStatus" NOT NULL DEFAULT 'agendado',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scheduling_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Scheduling" ADD CONSTRAINT "Scheduling_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
