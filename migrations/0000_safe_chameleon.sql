CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`image_url` text,
	`demo_url` text,
	`url` text,
	`repo_url` text,
	`created_at` integer DEFAULT '"2026-06-22T04:58:30.006Z"'
);
--> statement-breakpoint
CREATE TABLE `technologies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` integer,
	`name` text NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE no action
);
