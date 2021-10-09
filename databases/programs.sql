-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 09, 2021 at 04:38 PM
-- Server version: 5.7.35-cll-lve
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `murlango_programs`
--

-- --------------------------------------------------------

--
-- Table structure for table `developer`
--

CREATE TABLE `developer` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `organisationName` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `website` varchar(255) NOT NULL,
  `terms` text NOT NULL,
  `ownership` text NOT NULL,
  `membership` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `info`
--

CREATE TABLE `info` (
  `constid` int(11) NOT NULL,
  `dynamicid` varchar(256) NOT NULL,
  `type` tinytext NOT NULL,
  `price` smallint(6) NOT NULL,
  `category` varchar(64) NOT NULL,
  `rating` tinyint(4) NOT NULL,
  `name` varchar(64) NOT NULL,
  `longname` varchar(128) NOT NULL,
  `description` text NOT NULL,
  `shortdescription` tinytext NOT NULL,
  `license` varchar(128) NOT NULL,
  `bugs` varchar(255) NOT NULL,
  `feedback` varchar(255) NOT NULL,
  `supports` int(11) NOT NULL,
  `developer` int(11) NOT NULL,
  `installing` int(11) NOT NULL,
  `requirements` int(11) NOT NULL,
  `permissions` int(11) NOT NULL,
  `media` int(11) NOT NULL,
  `firstuploaddate` date NOT NULL,
  `latestupdatedate` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `installing`
--

CREATE TABLE `installing` (
  `id` int(11) NOT NULL,
  `strict` tinyint(1) NOT NULL,
  `x64` tinyint(1) NOT NULL,
  `x32` tinyint(1) NOT NULL,
  `ARM64` tinyint(1) NOT NULL,
  `ARM32` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` int(11) NOT NULL,
  `hascoverimage` tinyint(1) NOT NULL,
  `hascovervideo` tinyint(1) NOT NULL,
  `covercolor` varchar(16) NOT NULL,
  `hasdesktopvideo` tinyint(1) NOT NULL,
  `hastabletvideo` tinyint(1) NOT NULL,
  `hasmobilevideo` tinyint(1) NOT NULL,
  `mobilescreenshots` tinyint(4) NOT NULL,
  `desktopscreenshots` tinyint(4) NOT NULL,
  `tabletscreenshots` tinyint(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `requirements`
--

CREATE TABLE `requirements` (
  `id` int(11) NOT NULL,
  `hwkeyboard` tinyint(1) NOT NULL,
  `hwkeyboardPreferred` tinyint(1) NOT NULL,
  `hwmouse` tinyint(1) NOT NULL,
  `hwmousePreferred` tinyint(1) NOT NULL,
  `hwtouchinput` tinyint(1) NOT NULL,
  `hwtouchinputPreferred` tinyint(1) NOT NULL,
  `hwcontrollersMin` tinyint(4) NOT NULL,
  `hwcontrollersMinPreferred` tinyint(4) NOT NULL,
  `hwcontrollersMax` tinyint(4) NOT NULL,
  `hwcontrollersMaxPreferred` tinyint(4) NOT NULL,
  `hwmemory` int(11) NOT NULL,
  `hwmemoryPreferred` int(11) NOT NULL,
  `swoswindows` varchar(16) NOT NULL,
  `swoswindowsPreferred` varchar(16) NOT NULL,
  `swosmac` varchar(16) NOT NULL,
  `swosmacPreferred` varchar(16) NOT NULL,
  `swosandroid` varchar(16) NOT NULL,
  `swosandroidPreferred` varchar(16) NOT NULL,
  `swosios` varchar(16) NOT NULL,
  `swosiosPreferred` varchar(16) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `developer`
--
ALTER TABLE `developer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `info`
--
ALTER TABLE `info`
  ADD PRIMARY KEY (`constid`),
  ADD UNIQUE KEY `dynamicid` (`dynamicid`);

--
-- Indexes for table `installing`
--
ALTER TABLE `installing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `requirements`
--
ALTER TABLE `requirements`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `info`
--
ALTER TABLE `info`
  MODIFY `constid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `installing`
--
ALTER TABLE `installing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `requirements`
--
ALTER TABLE `requirements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
