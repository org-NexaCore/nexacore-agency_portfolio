CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` varchar(320) NOT NULL,
	`message` text NOT NULL,
	`read` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`imageUrl` text,
	`technologies` text,
	`category` varchar(50) NOT NULL,
	`githubUrl` text,
	`liveUrl` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`icon` varchar(50),
	`order` int NOT NULL DEFAULT 0,
	CONSTRAINT `services_id` PRIMARY KEY(`id`)
);
