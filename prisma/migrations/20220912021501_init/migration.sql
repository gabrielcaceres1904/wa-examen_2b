/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "SistemaSolar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre_sistema" TEXT NOT NULL,
    "radio_sistema" INTEGER NOT NULL,
    "satelites_sistema" INTEGER NOT NULL,
    "nombre_sol" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Planeta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre_planeta" TEXT NOT NULL,
    "radio_planeta" REAL NOT NULL,
    "duracion_dia" INTEGER NOT NULL,
    "lunas" INTEGER NOT NULL,
    "es_habitable" BOOLEAN NOT NULL,
    "sistemaId" INTEGER NOT NULL,
    CONSTRAINT "Planeta_sistemaId_fkey" FOREIGN KEY ("sistemaId") REFERENCES "SistemaSolar" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
