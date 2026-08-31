DROP INDEX "technologies_name_unique";--> statement-breakpoint
ALTER TABLE `projects` ALTER COLUMN "created_at" TO "created_at" integer DEFAULT '"2026-08-30T06:14:09.990Z"';--> statement-breakpoint
CREATE UNIQUE INDEX `technologies_name_unique` ON `technologies` (`name`);