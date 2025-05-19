-- CreateTable
CREATE TABLE "BlType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "received" INTEGER NOT NULL DEFAULT 0,
    "sent" INTEGER NOT NULL DEFAULT 0,
    "shortTime" INTEGER NOT NULL DEFAULT 20,
    "longTime" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "BlType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlType_type_key" ON "BlType"("type");
