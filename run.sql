-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 09, 2016 at 06:20 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `run`
--

-- --------------------------------------------------------

--
-- Table structure for table `detail_event`
--

CREATE TABLE `detail_event` (
  `detail_id` int(6) NOT NULL,
  `mem_id` int(6) NOT NULL,
  `detail_match` enum('active','unactive') COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_id` int(6) NOT NULL,
  `status_pay` enum('register','paid','attended') COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `detail_event`
--

INSERT INTO `detail_event` (`detail_id`, `mem_id`, `detail_match`, `event_id`, `status_pay`) VALUES
(9, 113, 'unactive', 19, 'register'),
(10, 1, 'unactive', 19, 'register');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `event_id` int(6) NOT NULL,
  `event_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_date` date NOT NULL,
  `event_location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_distance` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_price` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`event_id`, `event_name`, `event_date`, `event_location`, `event_distance`, `event_price`) VALUES
(19, 'วิ่งด้วยกัน ครั้้งที่ 2', '0000-00-00', 'Pracha Rat Sai 1 Rd, แขวง วงศ์สว่าง เขต บางซื่อ กรุงเทพมหานคร 10800', '3,8,10', '200');

-- --------------------------------------------------------

--
-- Table structure for table `group`
--

CREATE TABLE `group` (
  `group_id` int(6) NOT NULL,
  `event_id` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `group`
--

INSERT INTO `group` (`group_id`, `event_id`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `mem_id` int(6) NOT NULL,
  `mem_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mem_surname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mem_gender` enum('f','m') COLLATE utf8mb4_unicode_ci NOT NULL,
  `mem_age` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mem_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mem_tel` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mem_date` date NOT NULL,
  `mem_pic` text COLLATE utf8mb4_unicode_ci,
  `mem_discription` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mem_type` enum('normal','disabled') COLLATE utf8mb4_unicode_ci NOT NULL,
  `mem_disabled_type` enum('','blind','wheechair','deaf','oral','mentally') COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`mem_id`, `mem_name`, `mem_surname`, `mem_gender`, `mem_age`, `mem_email`, `mem_tel`, `mem_date`, `mem_pic`, `mem_discription`, `mem_type`, `mem_disabled_type`) VALUES
(1, 'หนาวนุ่น', 'ปุกปุย', 'f', '43', 'test@gmail.com', '19100000', '2016-07-06', 'test.jpg', 'ไม่มี', 'disabled', 'blind'),
(113, 'สนุกจุง', 'ที่ทำงาน', 'm', '21', 'mint-sly@hotmail.com', '029110020', '2016-06-05', 'aum.jpg', 'so good', 'normal', '');

-- --------------------------------------------------------

--
-- Table structure for table `user_in_group`
--

CREATE TABLE `user_in_group` (
  `user_group_id` int(6) NOT NULL,
  `mem_id` int(6) NOT NULL,
  `group_id` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_in_group`
--

INSERT INTO `user_in_group` (`user_group_id`, `mem_id`, `group_id`) VALUES
(1, 55, 1),
(2, 56, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detail_event`
--
ALTER TABLE `detail_event`
  ADD PRIMARY KEY (`detail_id`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`group_id`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`mem_id`);

--
-- Indexes for table `user_in_group`
--
ALTER TABLE `user_in_group`
  ADD PRIMARY KEY (`user_group_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detail_event`
--
ALTER TABLE `detail_event`
  MODIFY `detail_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `event_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `group`
--
ALTER TABLE `group`
  MODIFY `group_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `mem_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;
--
-- AUTO_INCREMENT for table `user_in_group`
--
ALTER TABLE `user_in_group`
  MODIFY `user_group_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
