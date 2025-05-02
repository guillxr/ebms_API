-- CreateEnum
CREATE TYPE "BloodType" AS ENUM ('A_NEGATIVO', 'B_POSITIVO', 'B_NEGATIVO', 'AB_POSITIVO', 'AB_NEGATIVO', 'O_POSITIVO', 'O_NEGATIVO');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Masculino', 'Feminino', 'Outro');

-- CreateEnum
CREATE TYPE "ContactPreference" AS ENUM ('email', 'sms', 'whatsapp', 'call');

-- CreateTable
CREATE TABLE "Donor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "blood_type" "BloodType" NOT NULL,
    "gender" "Gender" NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "identity_document" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "last_donation" TIMESTAMP(3),
    "donation_history" TIMESTAMP(3)[] DEFAULT ARRAY[]::TIMESTAMP(3)[],
    "donation_frequency" INTEGER NOT NULL DEFAULT 0,
    "eligibility_status" BOOLEAN NOT NULL DEFAULT false,
    "contact_preferences" "ContactPreference"[] DEFAULT ARRAY[]::"ContactPreference"[],
    "registration_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Donor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Donor_email_key" ON "Donor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Donor_identity_document_key" ON "Donor"("identity_document");

-- CreateIndex
CREATE INDEX "Donor_blood_type_idx" ON "Donor"("blood_type");

-- CreateIndex
CREATE INDEX "Donor_eligibility_status_idx" ON "Donor"("eligibility_status");

-- CreateIndex
CREATE INDEX "Donor_latitude_longitude_idx" ON "Donor"("latitude", "longitude");
