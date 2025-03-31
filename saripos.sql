-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 31, 2025 at 10:58 AM
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
('14680012-5def-480a-a13f-b64cc5e0703a', 'Drinks', '/upload/category/b4e95a7a-2f31-488b-870c-e64949c8c066.png', 1),
('24e8119f-4303-41ab-9a16-edd11c103c7c', 'grains', '/upload/category/b3566886-551b-418f-872e-b231ad8bc8ba.png', 1),
('36887228-d095-4543-a245-ab7711a39705', 'Pastries', '/upload/category/685a1404-6921-4cb4-965c-979e747d5596.png', 1),
('a726a2c9-5b93-4d60-9483-eeeecc540081', 'Meat', '/upload/category/3cc4f35c-bbbf-4c35-8551-98fee3ac845c.png', 1),
('bee7e14f-2045-4495-ac05-802cddcad63b', 'fruits', '/upload/category/a47315f8-0233-41f6-bcad-2b59f42464c6.png', 1),
('d75011d6-a5c1-4c16-b89f-b124ca69dc43', 'Hygiene', '/upload/category/f1713d7c-173b-42da-8914-858489569bee.png', 1),
('f47ee1a9-68f6-4076-b482-645e3179844c', 'Vegetables', '/upload/category/cdc14e78-a1da-44f2-8c0a-b3fe98e3ebe6.png', 1);

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
('751431d7-5a5a-4ef7-a794-694e698123c5', 'Clifford', 'cliffordjay.halcyondigital@gmail.com', '09123456789', 'male', '2025-03-12', 1),
('ed37acde-7547-4658-b6a3-846ca820b9ae', 'clifford', 'c.iyac@gmail.com', '09123456789', 'male', '2011-11-11', 1);

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
('1932d6ed-324f-4f34-8d29-1c7f69e10530', 'Apple', 25, 100, NULL, '/upload/5943dbbd-f415-49ee-a1f2-1ff45dcc279a.png', 'Fruits', 1),
('8cc67239-a371-432b-8abd-9884c89bbe20', 'Orange', 25, 100, NULL, '/upload/220392a6-dd23-4932-aff9-e2dc6099fa43.png', 'Fruits', 1),
('b9760ae4-ce04-440f-b1e7-1e88359e1ec9', 'Apple', 25, 100, NULL, '/upload/aeb38e82-0bc2-4a58-a091-94b6f64e1671.png', 'Fruits', 1);

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `id` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `flag` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`id`, `image`, `flag`) VALUES
('f7333745-debe-4dfa-af1e-28cc2d7b0fa4', '/upload/0a867daa-5cac-42c2-a11f-8a593c938efc.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL,
  `flag` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `role`, `flag`) VALUES
('4f3714c0-5b47-42d6-85fe-bc3b8ee16a3b', '123', '$2b$10$lj.OFybucdXvmAax5djnyeHagkCaf10dAh4Mgge8Pmn07.4G.1FWK', 'user', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `details_id` varchar(255) NOT NULL,
  `flag` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`id`, `user_id`, `details_id`, `flag`) VALUES
('b066fdc5-735a-4807-89ab-68353cc0f3eb', '4f3714c0-5b47-42d6-85fe-bc3b8ee16a3b', 'ed37acde-7547-4658-b6a3-846ca820b9ae', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `profile_id` varchar(255) NOT NULL,
  `flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_profile`
--

INSERT INTO `user_profile` (`id`, `user_id`, `profile_id`, `flag`) VALUES
('d327f4db-cb3d-468c-9815-43812085933f', '4f3714c0-5b47-42d6-85fe-bc3b8ee16a3b', 'f7333745-debe-4dfa-af1e-28cc2d7b0fa4', 1);

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
-- Indexes for table `profile`
--
ALTER TABLE `profile`
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

--
-- Indexes for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;