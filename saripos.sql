-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 28, 2025 at 09:11 AM
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
('133c5736-ee29-4419-acb2-7fb997124bc4', 'fruits', '/upload/45ff9655-2d67-4f41-b438-0cab2a9f3780.png', 1),
('2b504280-3d5c-4e35-989e-e52da4dc08cc', 'Pastries', '/upload/0a6353f0-e52c-419e-b68b-2d6f65570d87.png', 1),
('5390e5b7-57ea-482e-9411-2bd5b813d560', 'grains', '/upload/30eae3a5-110c-4a6c-b837-5b5ddf31dcb8.png', 1),
('761b8547-0de7-4985-8186-ae955c7145f7', 'vegetables', '/upload/77dd532a-a903-4cf6-9fc4-475ace5f5e9c.png', 1),
('866294fd-1a82-44b4-83bb-fab0eb628acb', 'Beverages', '/upload/1cd3577e-e288-4a86-83a1-2ebda1c61e09.png', 1),
('bc9c7c44-9771-41e6-9bf2-6bcdd10cfa48', 'Hygiene', '/upload/595b9760-4d75-4cd1-b3f0-fede04859527.png', 1),
('eb124148-f44c-4a33-bd29-3471ad3ec8d6', 'Meat', '/upload/758fed3a-300a-4258-ae36-7e59a15a487a.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `details`
--

CREATE TABLE `details` (
  `id` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(11) NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `dob` date NOT NULL,
  `flag` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `details`
--

INSERT INTO `details` (`id`, `fullname`, `email`, `phone_number`, `gender`, `dob`, `flag`) VALUES
('e831a3b8-f8bd-4492-b7da-b5ea785d3ad9', 'clifford', '123@gmail.com', '09123456789', 'male', '2011-11-11', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(255) NOT NULL,
  `stock_in` int(255) DEFAULT NULL,
  `stock_out` int(255) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `flag` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `stock_in`, `stock_out`, `image`, `category`, `flag`) VALUES
('58ee9bb1-bd54-40c9-bfdb-13fc63adac34', 'Coke', 100, 100, NULL, '/upload/076cd3db-20f5-4d21-9bff-ee63f8ab7f11.png', 'beverages', 1),
('6d86563f-e954-4eec-9113-c3c446065833', 'Coke', 100, 100, NULL, '/upload/b1bcf4d5-7c27-4edb-b19a-e1228bf5460e.png', 'beverages', 1),
('8182c95b-139b-4a5d-8629-80bf146cc51f', 'Coke', 100, 100, NULL, '/upload/f8da26f8-19b6-41fa-8667-fcedee2e59e4.png', 'beverages', 1),
('88bd1067-a678-49b8-8f77-3c73633b2f29', 'Coke', 100, 100, NULL, '/upload/c3f42a62-f0be-4861-8674-67922b6cf71a.png', 'beverages', 1),
('987c963f-3e46-4076-a460-5935dfcba791', 'Coke', 100, 100, NULL, '/upload/48118a27-40ff-41f9-a2e0-58172545a5a7.png', 'beverages', 1),
('a16b4d4f-7fb8-4716-9d59-e25150cae794', 'Coke', 100, 100, NULL, '/upload/f8b025ea-776b-46a7-bab1-5112d1ca0850.png', 'beverages', 1),
('abdd2799-8d98-43fa-bff0-4f9bee59f78a', 'Coke', 100, 100, NULL, '/upload/a4cbb0a9-13f7-4423-98a5-6e469a74952c.png', 'beverages', 1);

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

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `deatils_id` varchar(255) NOT NULL,
  `flag` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `details`
--
ALTER TABLE `details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
