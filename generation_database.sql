-- Vous pouvez adapter le nom de la base de données, l'encodage, etc.

-- 1) Créer la base de données si nécessaire (optionnel)
CREATE DATABASE IF NOT EXISTS SpeedRunTrophy;
USE SpeedRunTrophy;

-- 2) Table 'users'
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `steam_id` VARCHAR(50) UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3) Table 'games'
CREATE TABLE IF NOT EXISTS `games` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4) Table 'trophies'
CREATE TABLE IF NOT EXISTS `trophies` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `game_id` INT NOT NULL,
  FOREIGN KEY (`game_id`) REFERENCES `games`(`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5) Table de liaison 'user_trophy' (ou 'obtained')
CREATE TABLE IF NOT EXISTS `user_trophy` (
  `user_id` INT NOT NULL,
  `trophy_id` INT NOT NULL,
  `obtained_date` DATETIME NULL,
  PRIMARY KEY (`user_id`, `trophy_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (`trophy_id`) REFERENCES `trophies`(`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;