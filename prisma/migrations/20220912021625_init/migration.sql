/*
  Warnings:

  - You are about to alter the column `radio_sistema` on the `SistemaSolar` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SistemaSolar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre_sistema" TEXT NOT NULL,
    "radio_sistema" REAL NOT NULL,
    "satelites_sistema" INTEGER NOT NULL,
    "nombre_sol" TEXT NOT NULL
);
INSERT INTO "new_SistemaSolar" ("id", "nombre_sistema", "nombre_sol", "radio_sistema", "satelites_sistema") SELECT "id", "nombre_sistema", "nombre_sol", "radio_sistema", "satelites_sistema" FROM "SistemaSolar";
DROP TABLE "SistemaSolar";
ALTER TABLE "new_SistemaSolar" RENAME TO "SistemaSolar";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
