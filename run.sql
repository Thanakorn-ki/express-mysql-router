-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 04, 2016 at 02:39 PM
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
  `mem_distance` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mem_pic` text COLLATE utf8mb4_unicode_ci,
  `mem_discription` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group_id` int(6) NOT NULL,
  `mem_type` enum('normal','disabled') COLLATE utf8mb4_unicode_ci NOT NULL,
  `mem_status` enum('active','unactive','','') COLLATE utf8mb4_unicode_ci NOT NULL,
  `mem_pay` enum('active','unactive') COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`mem_id`, `mem_name`, `mem_surname`, `mem_gender`, `mem_age`, `mem_email`, `mem_tel`, `mem_date`, `mem_distance`, `mem_pic`, `mem_discription`, `group_id`, `mem_type`, `mem_status`, `mem_pay`) VALUES
(55, 'ขวัญกมล', 'นาคบังลังค์', 'm', '21', 'mint-sly@hotmail.com', '029110020', '2016-06-06', '4', 'hyuhyhyhy', 'so good', 1, 'normal', 'unactive', 'unactive'),
(56, 'กมลภพ', 'เเพงวังทอง', 'm', '21', 'infernal-slam@gmail.com', '029110020', '2016-06-06', '4', 'hyuhyhyhy', 'so good', 1, 'disabled', 'unactive', 'unactive'),
(57, 'ขวัญกมล', 'นาคบังลังค์', 'm', '21', 'mint-sly@hotmail.com', '029110020', '2016-06-06', '4', 'hyuhyhyhy', 'so good', 1, 'normal', 'unactive', 'unactive'),
(58, 'สมชาย', 'ใจดี', 'm', '12', 'infernal-slam@gmail.com', '029110020', '2016-06-06', '4', 'hyuhyhyhy', 'so good', 1, 'disabled', 'unactive', 'unactive');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`mem_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `mem_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
