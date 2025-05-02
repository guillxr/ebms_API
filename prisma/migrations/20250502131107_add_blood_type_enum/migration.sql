/*
  Warnings:

  - The values [A_NEGATIVO,B_POSITIVO,B_NEGATIVO,AB_POSITIVO,AB_NEGATIVO,O_POSITIVO,O_NEGATIVO] on the enum `BloodType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BloodType_new" AS ENUM ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');
ALTER TABLE "Donor" ALTER COLUMN "blood_type" TYPE "BloodType_new" USING ("blood_type"::text::"BloodType_new");
ALTER TYPE "BloodType" RENAME TO "BloodType_old";
ALTER TYPE "BloodType_new" RENAME TO "BloodType";
DROP TYPE "BloodType_old";
COMMIT;
