-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 13, 2016 at 07:53 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `run2gether`
--

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
  `status_pay` enum('register','paid','attended') COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `detail_event`
--

INSERT INTO `detail_event` (`detail_id`, `mem_id`, `detail_match`, `detail_size`, `detail_price`, `event_id`, `group_id`, `status_pay`) VALUES
(94, 113, 'active', 'L', '200', 19, 1, 'register'),
(95, 114, 'active', 'L', '200', 19, 1, 'register'),
(96, 115, 'active', 'L', '200', 19, 2, 'register'),
(97, 116, 'active', 'L', '200', 19, 2, 'register'),
(98, 117, 'active', 'L', '200', 19, 3, 'register'),
(99, 118, 'active', 'L', '200', 19, 3, 'register'),
(100, 119, 'active', 'L', '200', 18, NULL, 'register');

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
(19, 'วิ่งด้วยกัน ครั้้งที่ 2', '2016-07-11 00:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'Pracha Rat Sai 1 Rd, แขวง วงศ์สว่าง เขต บางซื่อ กรุงเทพมหานคร 10800', '3,8,10', '', '200', ''),
(20, 'วิ่งด้วยกัน ครั้้งที่ 55', '2016-07-10 17:00:00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 'Pracha Rat Sai 1 Rd, แขวง วงศ์สว่าง เขต บางซื่อ กรุงเทพมหานคร 10800', '3,8,10', '', '200,500,600', ''),
(21, 'วิ่งด้วยกัน ครัz้งที่ 99', '2016-07-11 17:00:00', '2555-08-12 00:00:00', '0000-00-00 00:00:00', 'Pracha Rat Sai 1 Rd, แขวง วงศ์สว่าง เขต บางซื่อ กรุงเทพมหานคร 10800', '3,8,10', '', '200', '');

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
(1, 19),
(2, 19),
(3, 19);

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
  `mem_discription` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mem_department` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mem_type` enum('normal','disabled') COLLATE utf8mb4_unicode_ci NOT NULL,
  `mem_disabled_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`mem_id`, `mem_id_num`, `mem_name`, `mem_surname`, `mem_nickname`, `mem_gender`, `mem_age`, `mem_email`, `mem_tel`, `mem_date`, `mem_pic`, `mem_discription`, `mem_department`, `mem_type`, `mem_disabled_type`) VALUES
(113, '1730600113916', 'วิโรจน์', 'กาสาวพัทธ์', 'ดม', 'm', '23', 'test-slam@hotmail.com', '029110020', '2016-06-05', 'xxxx', 'อยากวิ่งเล่น', '', 'disabled', ''),
(114, '1730600113916', 'รุจิรา', 'ธรรมสกุล', 'ดม', 'm', '24', 'test-slam@hotmail.com', '029110020', '2016-06-05', 'xxxx', 'อยากวิ่งเล่น', '', 'normal', ''),
(115, '1730600113916', 'อดุล', 'กาสาวพัทธ์', 'ดม', 'm', '24', 'test-slam@hotmail.com', '029110020', '2016-06-05', 'xxxx', 'อยากวิ่งเล่น', '', 'normal', ''),
(116, '1730600113916', 'ขวัญฤดี', 'ปานีสงค์', 'ดม', 'm', '12', 'test-slam@hotmail.com', '029110020', '2016-06-05', 'xxxx', 'อยากวิ่งเล่น', '', 'normal', ''),
(117, '1730600113916', 'กัญญุตา', 'มาก', 'ดม', 'm', '21', 'infernal-slam@hotmail.com', '029110020', '2016-06-05', 'xxxx', 'so good', '', 'normal', ''),
(118, '1730600113916', 'อดุล', 'กาสาวพัทธ์', 'ดม', 'm', '24', 'test-slam@hotmail.com', '029110020', '2016-06-05', 'xxxx', 'อยากวิ่งเล่น', '', 'normal', ''),
(119, '1730600113916', 'xxxxxx', 'กิจสวัสดิ์', 'อั้ม', 'm', '22', 'thanakornaum@gmail.com', '028110804', '0000-00-00', 'xxxxx', '', '', 'disabled', 'blind');

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
(2, 56, 1),
(3, 1, 2),
(4, 2, 2);

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
  MODIFY `detail_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;
--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `event_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `group`
--
ALTER TABLE `group`
  MODIFY `group_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `mem_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;
--
-- AUTO_INCREMENT for table `user_in_group`
--
ALTER TABLE `user_in_group`
  MODIFY `user_group_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
