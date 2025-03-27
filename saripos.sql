-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 27, 2025 at 02:58 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `saripos`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `flag` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `category`, `image`, `flag`) VALUES
('0e1b7544-736d-4fc8-90fa-91864234eabb', '123', '/upload/e644949c-7860-458f-b9d4-2c0079f7c00f.png', 1),
('16153e28-296f-44fb-92c4-7b6085ee3ab1', '123', '/upload/69badc70-54af-49ac-8f80-7718c462a417.png', 1),
('994b4ecb-6e91-4ecf-b162-b6a983e92be2', '123', '/upload/41894929-cbf0-4b6d-bbcc-49fd3053364c.png', 1),
('d9db9d62-bfff-46c2-9e3b-53bfb943eab3', '123', '/upload/594ef50f-59ca-4233-87c5-cfee5412e6f3.png', 1),
('edc6b53f-4805-4ddb-87fc-12ecbc52afc6', '123', '/upload/c00c192d-59ed-4c10-905f-b50fbd8365d3.png', 1),
('eff46124-544e-4a89-9743-e18b56c669b2', '123', '/upload/bd10ce78-b99b-410a-b1f3-8c4fcc183dc0.png', 1),
('f26c7127-5465-4f42-8151-176935c552b9', '123', '/upload/33c4b079-941c-4fa1-83a1-ef396e450592.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `flag` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `flag`) VALUES
('05b31d2c-beea-4767-87f9-0c5a33c5c866', 'qwe', '$2b$10$DAiQ8MIpHi5N0dMO/SEiZuqMzX18drCUjySbHGTo8S90CNypAvvRa', 1),
('4ef4f68c-dfd5-4525-8547-5ed4710f7fa0', 'lee', '$2b$10$M9nev1/p8DvRZDohDmB4H.RfQAeOQUOlvphcC9GTH7R1QhzODAxR.', 1),
('a0f34d12-2f5d-4b1c-8455-d8b556ffefea', 'Clifford', '$2b$10$4Q7xAs9SNhZa7WkNaSp6guIJzm9uW7mZRsCrbrbS6Fmf7xKDRpMCO', 1),
('e2c57971-d2eb-4f5f-8bfa-9a9733deed60', '123', '$2b$10$ECWXuWoLuz1UTwV5elxTAe8Cjnv8Z4QvO0FRdYxZlyfK3q7EYUzK2', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
