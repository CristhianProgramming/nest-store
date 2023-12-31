-- DropForeignKey
ALTER TABLE "Roles" DROP CONSTRAINT "Roles_userId_fkey";

-- AlterTable
ALTER TABLE "Roles" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Roles" ADD CONSTRAINT "Roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;
