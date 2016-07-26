-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 26, 2016 at 03:13 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `run2gether`
--
CREATE DATABASE IF NOT EXISTS `run2gether` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `run2gether`;

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_memsert` (IN `mem_name` VARCHAR(255), IN `mem_surname` VARCHAR(255), IN `mem_gender` ENUM('f','m'), IN `mem_age` VARCHAR(3), IN `mem_email` VARCHAR(255), IN `mem_tel` VARCHAR(10), IN `mem_date` DATE, IN `mem_pic` TEXT, IN `mem_discription` VARCHAR(255), IN `mem_type` ENUM('normal','disabled'), IN `mem_disabled_type` ENUM('','blind','wheechair','deaf','oral'), IN `event_id` INT(6))  MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN
	DECLARE id int DEFAULT 6;
	insert into member values (NULL,mem_name,mem_surname,mem_gender,mem_age,mem_email,mem_tel,mem_date,mem_pic,mem_discription,mem_type,mem_disabled_type);
    SELECT member.mem_id INTO id FROM member ORDER BY mem_id DESC LIMIT 1;
    INSERT INTO detail_event values (NULL,id,'unactive',event_id,'register');
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `detail_event`
--

CREATE TABLE `detail_event` (
  `detail_id` int(6) NOT NULL,
  `mem_id` int(6) NOT NULL,
  `detail_match` enum('active','unactive') COLLATE utf8mb4_unicode_ci NOT NULL,
  `detail_size` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `detail_price` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_id` int(6) NOT NULL,
  `group_id` int(6) DEFAULT NULL,
  `status_pay` enum('register','paid','attended') COLLATE utf8mb4_unicode_ci NOT NULL,
  `url_pay` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `detail_event`
--

INSERT INTO `detail_event` (`detail_id`, `mem_id`, `detail_match`, `detail_size`, `detail_price`, `event_id`, `group_id`, `status_pay`, `url_pay`) VALUES
(1, 1, 'active', 'm', '200', 1, 1, 'attended', ''),
(2, 2, 'active', 'l', '200', 1, 1, 'attended', ''),
(3, 4, 'active', 'L', '200', 1, 2, 'attended', ''),
(4, 3, 'active', 'L', '200', 1, 2, 'attended', ''),
(5, 18, 'unactive', 'L', '200', 2, NULL, 'register', ''),
(6, 19, 'unactive', 'L', '200', 2, NULL, 'register', ''),
(7, 20, 'unactive', 'L', '200', 2, NULL, 'register', ''),
(8, 21, 'unactive', 'L', '200', 2, NULL, 'register', ''),
(9, 22, 'unactive', 'L', '200', 2, NULL, 'register', ''),
(10, 23, 'unactive', 'L', '200', 19, NULL, 'register', '');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `event_id` int(6) NOT NULL,
  `event_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_date_start` datetime NOT NULL,
  `event_date_open` datetime NOT NULL,
  `event_date_close` datetime NOT NULL,
  `event_location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_distance` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_optional` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_price` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `event_size` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`event_id`, `event_name`, `event_date_start`, `event_date_open`, `event_date_close`, `event_location`, `event_distance`, `event_optional`, `event_price`, `event_size`) VALUES
(1, 'วิ่งด้วยกัน ครัz้งที่ 99', '2016-07-11 17:00:00', '2555-08-12 00:00:00', '0000-00-00 00:00:00', 'Pracha Rat Sai 1 Rd, แขวง วงศ์สว่าง เขต บางซื่อ กรุงเทพมหานคร 10800', '3,8,10', '', '200', ''),
(2, 'วิ่งด้วยกัน ครั้้งที่ 2', '2016-07-10 17:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'Pracha Rat Sai 1 Rd, แขวง วงศ์สว่าง เขต บางซื่อ กรุงเทพมหานคร 10800', '3,8,10', '', '200,500,600', 's,m,l,xl'),
(3, 'วิ่งด้วยกัน ครัz้งที่ 3', '2016-07-11 17:00:00', '2555-08-12 00:00:00', '0000-00-00 00:00:00', 'Pracha Rat Sai 1 Rd, แขวง วงศ์สว่าง เขต บางซื่อ กรุงเทพมหานคร 10800', '3,8,10', '', '200', 's,m,l,xl'),
(4, 'วิ่งด้วยกัน ครั้้งที่ 4', '2016-07-10 17:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'Pracha Rat Sai 1 Rd, แขวง วงศ์สว่าง เขต บางซื่อ กรุงเทพมหานคร 10800', '3,8,10', '', '200', 's,m,l,xl'),
(5, 'วิ่งด้วยกัน ครั้้งที่ 55', '2016-07-10 17:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'Pracha Rat Sai 1 Rd, แขวง วงศ์สว่าง เขต บางซื่อ กรุงเทพมหานคร 10800', '3,8,10', '', '200', 's,m,l,xl'),
(6, 'วิ่งด้วยกัน ครั้้งที่ 55', '2016-07-10 17:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'Pracha Rat Sai 1 Rd, แขวง วงศ์สว่าง เขต บางซื่อ กรุงเทพมหานคร 10800', '3,8,10', '', '200', 's,m,l,xl'),
(7, 'วิ่งด้วยกัน ครั้้งที่ 55', '2016-07-10 17:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'Pracha Rat Sai 1 Rd, แขวง วงศ์สว่าง เขต บางซื่อ กรุงเทพมหานคร 10800', '3,8,10', '', '200', 's,m,l,xl'),
(8, 'วิ่งด้วยกัน ครั้้งที่ 55', '2016-07-10 17:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'Pracha Rat Sai 1 Rd, แขวง วงศ์สว่าง เขต บางซื่อ กรุงเทพมหานคร 10800', '3,8,10', '', '200', 's,m,l,xl'),
(10, 'วิ่งด้วยกัน ครั้้งที่ 55', '2016-07-10 17:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'Pracha Rat Sai 1 Rd, แขวง วงศ์สว่าง เขต บางซื่อ กรุงเทพมหานคร 10800', '3,8,10', '', '200', 's,m,l,xl'),
(11, 'วิ่งด้วยกัน ครั้้งที่ 55', '2016-07-10 17:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'Pracha Rat Sai 1 Rd, แขวง วงศ์สว่าง เขต บางซื่อ กรุงเทพมหานคร 10800', '3,8,10', '', '200', 's,m,l,xl'),
(12, 'วิ่งด้วยกัน ครั้้งที่ 55', '2016-07-10 17:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'Pracha Rat Sai 1 Rd, แขวง วงศ์สว่าง เขต บางซื่อ กรุงเทพมหานคร 10800', '3,8,10', '', '200', 's,m,l,xl'),
(13, 'วิ่งด้วยกัน ครัz้งที่ 99', '2016-07-11 17:00:00', '2555-08-12 00:00:00', '0000-00-00 00:00:00', 'Pracha Rat Sai 1 Rd, แขวง วงศ์สว่าง เขต บางซื่อ กรุงเทพมหานคร 10800', '3,8,10', '', '200', '');

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
(1, 1),
(2, 2),
(3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `mem_id` int(6) NOT NULL,
  `mem_id_num` char(13) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mem_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mem_surname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mem_nickname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mem_gender` enum('f','m') COLLATE utf8mb4_unicode_ci NOT NULL,
  `mem_age` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mem_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mem_tel` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mem_date` date NOT NULL,
  `mem_pic` text COLLATE utf8mb4_unicode_ci,
  `mem_location` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `mem_discription` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mem_department` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mem_type` enum('normal','disabled') COLLATE utf8mb4_unicode_ci NOT NULL,
  `mem_disabled_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`mem_id`, `mem_id_num`, `mem_name`, `mem_surname`, `mem_nickname`, `mem_gender`, `mem_age`, `mem_email`, `mem_tel`, `mem_date`, `mem_pic`, `mem_location`, `mem_discription`, `mem_department`, `mem_type`, `mem_disabled_type`) VALUES
(1, '1730600113916', 'อดุล', 'กาสาวพัทธ์', 'ดม', 'm', '24', 'adon-t@gmail.com', '029110020', '1992-12-16', NULL, 'ศูนย์พัฒนาสมรรถภาพคนตาบอด 78/2 ซอยติวานนท์-ปากเกร็ด 1 หมู่ 1 ถนนติวานนท์ ต.บางตลาด อ.ปากเกร็ด จ.นนทบุรี 11120\n', '', '', 'disabled', 'สายตา'),
(2, '1192122395184', 'ศิริพร', 'พึ่งมี', 'ศิ', 'f', '33', NULL, '0959600212', '1983-07-14', NULL, '41/1 ตรอกศิลป์ ถ.ดินสอ แขวงบวรนิเวศ เขตพระนคร กรุงเทพมหานคร 10200', '', '', 'normal', ''),
(3, '1720400224916', 'อาคม', 'แสงดี', 'ดิษ', 'm', '42', 'tt-arcom@gmail.com', '021353123', '1992-02-11', '', 'ศูนย์พัฒนาสมรรถภาพคนตาบอด 78/2 ซอยติวานนท์-ปากเกร็ด 1 หมู่ 1 ถนนติวานนท์ ต.บางตลาด อ.ปากเกร็ด จ.นนทบุรี 11120\n', '', '', 'disabled', 'ดาวน์ซินโดรม\n'),
(4, '1720400224916', 'ธนากร', 'กิจสวัสดิ์', 'อั้ม', 'm', '22', 'thanakornaum@gmail.com', '028110804', '1992-12-06', '', '41/1 ตรอกศิลป์ ถ.ดินสอ แขวงบวรนิเวศ เขตพระนคร กรุงเทพมหานคร 10200', '', '', 'normal', ''),
(22, '1730600113916', 'ศรัญยู', 'ชาวปากน้ำ', 'ไอซ์', 'm', '18', 'ice-amjung@gmail.com', '034287565', '1998-06-12', '', '090/14 อ.ลำลูก แขวง.จอมพล จ.กทม', 'บ้านคนตาบอด บางแค', '', 'disabled', 'ทางหู'),
(23, '1234567890123', 'นาย ก', 'กิจสวัสดิ์', 'อั้ม', 'm', '22', 'thanakornaum@gmail.com', '028110804', '0000-00-00', 'xxxxx', '60/5', '', '', 'disabled', 'blind');

-- --------------------------------------------------------

--
-- Table structure for table `user_in_group`
--

CREATE TABLE `user_in_group` (
  `user_group_id` int(6) NOT NULL,
  `mem_id` int(6) NOT NULL,
  `group_id` int(6) NOT NULL,
  `status_match` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_in_group`
--

INSERT INTO `user_in_group` (`user_group_id`, `mem_id`, `group_id`, `status_match`) VALUES
(1, 1, 1, 'active'),
(2, 2, 1, 'active'),
(3, 3, 2, 'actice'),
(4, 4, 2, 'actice'),
(5, 99, 3, 'active'),
(6, 12, 3, 'active');

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
  MODIFY `event_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `group`
--
ALTER TABLE `group`
  MODIFY `group_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `mem_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `user_in_group`
--
ALTER TABLE `user_in_group`
  MODIFY `user_group_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
