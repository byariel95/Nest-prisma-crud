/*
  Warnings:

  - The migration will remove the values [MAsculino] on the enum `User_gender`. If these variants are still used in the database, the migration will fail.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `gender` ENUM('Masculino', 'Femenino', 'Indefinido') NOT NULL;
