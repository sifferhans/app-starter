CREATE TABLE IF NOT EXISTS `session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS  `user` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text(255) NOT NULL,
	`username` text NOT NULL,
	`hashed_password` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer
);
