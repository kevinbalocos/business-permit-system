-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 27, 2025 at 02:57 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `businesspermitdatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `application_documents`
--

CREATE TABLE `application_documents` (
  `id` int(11) NOT NULL,
  `application_id` int(11) DEFAULT NULL,
  `document_type` varchar(255) DEFAULT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `business_applications`
--

CREATE TABLE `business_applications` (
  `id` int(11) NOT NULL,
  `business_type` varchar(100) DEFAULT NULL,
  `dti_sec_cda_number` varchar(100) DEFAULT NULL,
  `business_name` varchar(255) DEFAULT NULL,
  `tax_id_number` varchar(100) DEFAULT NULL,
  `trade_name` varchar(255) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `extension` varchar(50) DEFAULT NULL,
  `sex` varchar(20) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `mobile` varchar(50) DEFAULT NULL,
  `region` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `barangay` varchar(100) DEFAULT NULL,
  `address_line_1` varchar(255) DEFAULT NULL,
  `taxpayer_zip_code` varchar(20) DEFAULT NULL,
  `business_area` decimal(10,2) DEFAULT NULL,
  `employees_in_area` int(11) DEFAULT NULL,
  `male_employees` int(11) DEFAULT NULL,
  `female_employees` int(11) DEFAULT NULL,
  `van_delivery_vehicles` int(11) DEFAULT NULL,
  `truck_delivery_vehicles` int(11) DEFAULT NULL,
  `motorcycle_delivery_vehicles` int(11) DEFAULT NULL,
  `same_as_business_address` tinyint(1) DEFAULT NULL,
  `taxpayer_region` varchar(100) DEFAULT NULL,
  `taxpayer_province` varchar(100) DEFAULT NULL,
  `taxpayer_city` varchar(100) DEFAULT NULL,
  `taxpayer_barangay` varchar(100) DEFAULT NULL,
  `taxpayer_address_line_1` varchar(255) DEFAULT NULL,
  `own_property` tinyint(1) DEFAULT NULL,
  `lessor_name` varchar(255) DEFAULT NULL,
  `monthly_rental` decimal(10,2) DEFAULT NULL,
  `tax_incentives` tinyint(1) DEFAULT NULL,
  `business_activity` varchar(255) DEFAULT NULL,
  `line_of_business` varchar(255) DEFAULT NULL,
  `products_services` text DEFAULT NULL,
  `number_of_units` int(11) DEFAULT NULL,
  `total_capitalization` decimal(15,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `business_applications`
--

INSERT INTO `business_applications` (`id`, `business_type`, `dti_sec_cda_number`, `business_name`, `tax_id_number`, `trade_name`, `first_name`, `middle_name`, `last_name`, `extension`, `sex`, `email`, `telephone`, `mobile`, `region`, `province`, `city`, `barangay`, `address_line_1`, `taxpayer_zip_code`, `business_area`, `employees_in_area`, `male_employees`, `female_employees`, `van_delivery_vehicles`, `truck_delivery_vehicles`, `motorcycle_delivery_vehicles`, `same_as_business_address`, `taxpayer_region`, `taxpayer_province`, `taxpayer_city`, `taxpayer_barangay`, `taxpayer_address_line_1`, `own_property`, `lessor_name`, `monthly_rental`, `tax_incentives`, `business_activity`, `line_of_business`, `products_services`, `number_of_units`, `total_capitalization`, `created_at`, `user_id`) VALUES
(1, 'Partnership', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0.00, 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', 0, '', 0.00, 0, '', '', '', 0, 0.00, '2025-08-24 23:28:58', NULL),
(2, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0.00, 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', 0, '', 0.00, 0, '', '', '', 0, 0.00, '2025-08-25 01:48:25', NULL),
(3, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0.00, 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', 0, '', 0.00, 0, '', '', '', 0, 0.00, '2025-08-25 01:50:25', NULL),
(4, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0.00, 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', 0, '', 0.00, 0, '', '', '', 0, 0.00, '2025-08-25 01:50:44', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` enum('pending','approved','denied') DEFAULT 'pending',
  `role` enum('user','admin','superadmin','cashier') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `verified` tinyint(1) DEFAULT NULL,
  `verification_token` varchar(255) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `status`, `role`, `created_at`, `verified`, `verification_token`, `first_name`, `last_name`, `phone_number`, `updated_at`) VALUES
(29, 'kevinbalocos@gmail.com', '$2b$10$3pI58TrxVxbHnP0JMT6tH.C51S5Hw9335GXfugy1d6JpPCv4RA0OS', 'denied', 'admin', '2025-07-24 09:12:07', 1, NULL, 'Jade Kevin', 'Balocos', '09054651578', '2025-08-27 12:48:00'),
(34, 'kevinbalocos1@gmail.com', '$2b$10$3DEJnD2XhMUe/35DHTJ.lOtvTNRNLXNizeHyAgkPjWvaXTl32odk2', 'denied', 'user', '2025-07-31 12:35:34', 0, '277c0714720c1b118daa581b4b5a4e7bf18c6c30df977e460c59dfa499596b20', '123', '123', '123123123', '2025-08-27 12:47:58'),
(35, 'kevinbalocos21@gmail.com', '$2b$10$DfuW7eIkEF1s.egc.MY4M.7Ap7UdOVw99esQo/a3xpRrpkqQt9VrC', 'denied', 'user', '2025-07-31 12:38:08', 0, '47d6cd460743085b112e076b2c349f985150ad35c666a002661a279a20ce32c5', '123123', '123123', '123123132', '2025-08-27 12:48:03'),
(37, 'kevinbalocos023@gmail.com', '$2b$10$FFub5dVY0upPrkaq3qX3I.Ol7OWl4Xwavq/NKBOycB.i8R.qPN.Fm', 'denied', 'admin', '2025-07-31 12:52:32', 0, '0d4a3c20d3e9b60526229af855877bbb855c3b3e1da109ff00b837834493abc7', '123123123', '123123', '123123123123', '2025-08-27 12:47:59'),
(39, 'superadmin@example.com', '$2b$10$1WSkB796wgqQmChyRXw83eaWZIK6VK1FYWx4jbsGU73RTqjENbBnW', 'approved', 'superadmin', '2025-07-31 12:54:34', 1, NULL, 'Super', 'Admin', '0000000000', '2025-07-31 15:56:16'),
(40, 'kevinbalocosasd@gmail.com', '$2b$10$vxISv0QLFUnPGGXbj7nS2e957SKEn1IdipUvvAxehyl3pXYEkZ10m', 'approved', 'user', '2025-07-31 13:30:26', 0, '58cf3bb9006f72e26fa02ced64d7ed9d1453f3fb9d59b6066a8ec29c144e63fc', 'asd', 'asd', '1231231312313', '2025-08-27 12:47:54'),
(43, 'ibrilata.dev@gmail.com', '$2b$10$3Go56SHTSujCjio87SHe1.NMLRSUeitFbG/Hw3Z8jwC4zuy6Tjc1G', 'denied', 'user', '2025-07-31 15:37:17', 1, NULL, 'ivan', 'brilata', '09956738140', '2025-08-27 12:48:12'),
(48, 'brilataivan86@gmail.com', '$2b$10$ou7XX.kK6slEAzt1lOHrRuDS6Gi262UjrOZP9YaG5xlYy00Z6PdU.', 'approved', 'user', '2025-08-01 08:08:03', 1, NULL, 'ivan', 'atalirb', '09956738140', '2025-08-27 12:47:56'),
(53, 'aybanbrilata05@gmail.com', '$2b$10$rjmyt76TL/0IHnPvFLr7q.V5/bmabVQmojG6KjNGq9ryeRTc66JKy', 'denied', 'admin', '2025-08-02 15:58:40', 1, NULL, 'asd', 'ivan', '09956738140', '2025-08-27 12:47:59'),
(65, 'kevinbalocos032@gmail.com', '$2b$10$ceNdzkZ3TK7TNkHevQDvruZ04jJll5Ylscl8zu5A/O9Uqg.WdR8qm', 'denied', 'cashier', '2025-08-26 12:02:54', 0, 'a659ea9ef774be185737a4707d161095ece7b12d6e1503451d9ac99de19b3e34', '123', '123', '213', '2025-08-27 12:48:02'),
(66, 'kevinbalocos013@gmail.com', '$2b$10$FxMy5/1bBDa56aPJolILFuhtuXrbIsfpNL2NqyjqdZGFQdtNFK/96', 'approved', 'cashier', '2025-08-26 12:03:55', 0, '00b8d0c5cf3ec0f26063bc56c8d288a2164a01d327c8b1338ae15dbd282eedb4', '123', '123', '123', '2025-08-27 12:39:09'),
(67, 'kevinbalocos03@gmail.com', '$2b$10$lobd9sBr/SMk2eZc.0OVjOd2o8HSwb2.inCZ0I8nq/qVVmUXOVmH2', 'approved', 'user', '2025-08-26 12:04:57', 1, NULL, 'Jade Kevin', 'Balocos', '09054651578', '2025-08-26 12:16:53'),
(68, 'asdasd@gmail.com', '$2b$10$UIJlNuJnfcqEdMoiF40g3.5NO7y3NOIMw9nsO2bLJ0IHvBQccXWpG', 'approved', 'user', '2025-08-26 13:09:43', 0, 'fd2d55873544989778e14b7f6378dbb7cad521437900cf2275bd2f87f8347f4d', 'asd', 'asd', '123', '2025-08-27 12:47:56'),
(69, 'kevinbalocos0323@gmail.com', '$2b$10$2BCuJd5WlT8jgWIaKzG43e2whjmVRrM2aYDuByOfsBWPPK6LO7Eu6', 'denied', 'admin', '2025-08-26 13:13:17', 0, 'e344e950114c4fc88fe7e7ced794fb3c6c90f549b4acc29750c2759e93f9b1d8', '123', '123', '123', '2025-08-27 12:47:59'),
(70, 'kevinbalocos0321@gmail.com', '$2b$10$L2fRPv7d/gmPxZsiTMwMLu4NVvWA7t2YkVigPcNDTAKNQfY5xpeP2', 'approved', 'user', '2025-08-27 12:46:36', 0, 'e6a0857eaca5c82d67b84614fc746df294b9277e2acb4844eabe94ca437cf492', '123', '123', '09054651578', '2025-08-27 12:47:57'),
(73, 'kevinbalocos03221@gmail.com', '$2b$10$pzpGohBZd9yKsbbK5izljuwKf2adEMEqWl.ffJ.8c1PxJlGYfYP4y', 'approved', 'user', '2025-08-27 12:46:54', 0, '23d61525106a72c472b7dfbff771a7636bc2eba9e72703b4c478c1fae330be16', '123', '123', '09054651578', '2025-08-27 12:47:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `application_documents`
--
ALTER TABLE `application_documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `application_id` (`application_id`);

--
-- Indexes for table `business_applications`
--
ALTER TABLE `business_applications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `application_documents`
--
ALTER TABLE `application_documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `business_applications`
--
ALTER TABLE `business_applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `application_documents`
--
ALTER TABLE `application_documents`
  ADD CONSTRAINT `application_documents_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `business_applications` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
