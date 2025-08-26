-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 26, 2025 at 04:07 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 7.4.16

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
  `application_id` int(11) NOT NULL,
  `document_type` varchar(100) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `application_documents`
--

INSERT INTO `application_documents` (`id`, `application_id`, `document_type`, `file_path`, `uploaded_at`) VALUES
(41, 26, 'certificate_2.pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756204100770-certificate_2.pdf', '2025-08-26 10:28:20'),
(42, 26, 'certificate_13.pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756204100775-certificate_13.pdf', '2025-08-26 10:28:20'),
(43, 26, 'certificate_13.pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756204100775-certificate_13.pdf', '2025-08-26 10:28:20'),
(44, 26, 'certificate_11.pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756204100776-certificate_11.pdf', '2025-08-26 10:28:20'),
(45, 26, 'certificate_13 (1).pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756204100776-certificate_13 (1).pdf', '2025-08-26 10:28:20'),
(46, 26, 'certificate_14.pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756204100776-certificate_14.pdf', '2025-08-26 10:28:20'),
(47, 31, 'certificate_2.pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756210759622-certificate_2.pdf', '2025-08-26 12:19:19'),
(48, 35, 'certificate_2.pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756213741532-certificate_2.pdf', '2025-08-26 13:09:01'),
(49, 36, 'certificate_11.pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756213989127-certificate_11.pdf', '2025-08-26 13:13:09');

-- --------------------------------------------------------

--
-- Table structure for table `business_applications`
--

CREATE TABLE `business_applications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `business_type` varchar(100) DEFAULT NULL,
  `dti_sec_cda_number` varchar(100) DEFAULT NULL,
  `business_name` varchar(255) DEFAULT NULL,
  `tax_id_number` varchar(100) DEFAULT NULL,
  `trade_name` varchar(255) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `extension` varchar(50) DEFAULT NULL,
  `sex` varchar(10) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `mobile` varchar(50) DEFAULT NULL,
  `region` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `barangay` varchar(100) DEFAULT NULL,
  `address_line_1` varchar(255) DEFAULT NULL,
  `taxpayer_zip_code` varchar(20) DEFAULT NULL,
  `business_area` varchar(100) DEFAULT NULL,
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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `business_applications`
--

INSERT INTO `business_applications` (`id`, `user_id`, `business_type`, `dti_sec_cda_number`, `business_name`, `tax_id_number`, `trade_name`, `first_name`, `middle_name`, `last_name`, `extension`, `sex`, `email`, `telephone`, `mobile`, `region`, `province`, `city`, `barangay`, `address_line_1`, `taxpayer_zip_code`, `business_area`, `employees_in_area`, `male_employees`, `female_employees`, `van_delivery_vehicles`, `truck_delivery_vehicles`, `motorcycle_delivery_vehicles`, `same_as_business_address`, `taxpayer_region`, `taxpayer_province`, `taxpayer_city`, `taxpayer_barangay`, `taxpayer_address_line_1`, `own_property`, `lessor_name`, `monthly_rental`, `tax_incentives`, `business_activity`, `line_of_business`, `products_services`, `number_of_units`, `total_capitalization`, `created_at`) VALUES
(25, 4, 'Sole Proprietorship', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', 0, '', 0.00, 0, '', '', '', 0, 0.00, '2025-08-26 10:24:10'),
(26, 4, 'Sole Proprietorship', '323232', 'asdas', '23232', 'asdas', 'asd', 'asds', 'asda', 'jr', 'Male', 'ibrilata.dev@gmail.com', '09956738140', '09151698172', 'REGION IV-A (CALABARZON)', 'LAGUNA', 'ALAMINOS', 'AQUINO', 'asdaas', '4325', '22222', 2, 2, 1, 0, 2, 1, 0, 'adsa', 'asda', 'asdsa', 'asdas', 'asdsaa', 0, 'asdsa', 22222.00, 0, 'Main Office', 'Retail Trade', 'asdassa', 22222, 222222222.00, '2025-08-26 10:28:20'),
(27, 4, 'Sole Proprietorship', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', 0, '', 0.00, 0, '', '', '', 0, 0.00, '2025-08-26 10:35:25'),
(28, 4, 'Sole Proprietorship', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', 0, '', 0.00, 0, '', '', '', 0, 0.00, '2025-08-26 11:55:39'),
(29, 4, 'Sole Proprietorship', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', 0, '', 0.00, 0, '', '', '', 0, 0.00, '2025-08-26 11:56:57'),
(30, 4, 'Sole Proprietorship', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', 0, '', 0.00, 0, '', '', '', 0, 0.00, '2025-08-26 12:07:50'),
(31, 4, 'Sole Proprietorship', '23232', 'asda', '23232', 'asdsa', 'asd', 'asda', 'asdsa', 'jr', 'Male', 'ibrilata.dev@gmail.com', '09956738140', '09151698172', 'REGION IV-A (CALABARZON)', 'LAGUNA', 'ALAMINOS', 'BULA', 'asdas', '4325', '222222', 2, 2, 2, 2, 2, 2, 0, 'asdsa', 'asdasdas', 'asdaa', 'asdsasd', 'asdas', 0, 'asdassd', 22221.00, 0, 'Main Office', 'Transportation', 'asdadas', 22222, 222222.00, '2025-08-26 12:19:19'),
(32, 4, 'Sole Proprietorship', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', 0, '', 0.00, 0, '', '', '', 0, 0.00, '2025-08-26 12:32:07'),
(33, 4, 'Sole Proprietorship', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', 0, '', 0.00, 0, '', '', '', 0, 0.00, '2025-08-26 12:43:13'),
(34, 4, 'Sole Proprietorship', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', 0, '', 0.00, 0, '', '', '', 0, 0.00, '2025-08-26 12:46:02'),
(35, 4, 'Sole Proprietorship', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', 0, '', 0.00, 0, '', '', '', 0, 0.00, '2025-08-26 13:09:01'),
(36, 4, 'Sole Proprietorship', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0, '', '', '', '', '', 0, '', 0.00, 0, '', '', '', 0, 0.00, '2025-08-26 13:13:09');

-- --------------------------------------------------------

--
-- Table structure for table `business_assessments`
--

CREATE TABLE `business_assessments` (
  `id` int(11) NOT NULL,
  `application_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `business_permit_fee` decimal(10,2) DEFAULT 0.00,
  `mayors_permit_fee` decimal(10,2) DEFAULT 0.00,
  `sanitary_permit_fee` decimal(10,2) DEFAULT 0.00,
  `fire_safety_fee` decimal(10,2) DEFAULT 0.00,
  `environmental_fee` decimal(10,2) DEFAULT 0.00,
  `capitalization_fee` decimal(10,2) DEFAULT 0.00,
  `employee_fee` decimal(10,2) DEFAULT 0.00,
  `delivery_vehicle_fee` decimal(10,2) DEFAULT 0.00,
  `late_penalty` decimal(10,2) DEFAULT 0.00,
  `interest_charges` decimal(10,2) DEFAULT 0.00,
  `subtotal` decimal(10,2) NOT NULL,
  `tax_amount` decimal(10,2) DEFAULT 0.00,
  `total_amount` decimal(10,2) NOT NULL,
  `assessment_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `assessed_by` varchar(100) DEFAULT 'System',
  `notes` text DEFAULT NULL,
  `status` enum('pending','approved','revised') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `business_assessments`
--

INSERT INTO `business_assessments` (`id`, `application_id`, `user_id`, `business_permit_fee`, `mayors_permit_fee`, `sanitary_permit_fee`, `fire_safety_fee`, `environmental_fee`, `capitalization_fee`, `employee_fee`, `delivery_vehicle_fee`, `late_penalty`, `interest_charges`, `subtotal`, `tax_amount`, `total_amount`, `assessment_date`, `assessed_by`, `notes`, `status`) VALUES
(1, 29, 4, 500.00, 200.00, 150.00, 300.00, 100.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1250.00, 150.00, 1400.00, '2025-08-26 11:56:57', 'System', 'Auto-generated assessment for NEW application', 'pending'),
(2, 30, 4, 500.00, 200.00, 150.00, 300.00, 100.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1250.00, 150.00, 1400.00, '2025-08-26 12:07:50', 'System', 'Auto-generated assessment for NEW application', 'pending'),
(3, 31, 4, 500.00, 200.00, 150.00, 300.00, 100.00, 222.22, 100.00, 600.00, 0.00, 0.00, 2172.22, 260.67, 2432.89, '2025-08-26 12:19:19', 'System', 'Auto-generated assessment for NEW application', 'pending'),
(4, 32, 4, 500.00, 200.00, 150.00, 300.00, 100.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1250.00, 150.00, 1400.00, '2025-08-26 12:32:07', 'System', 'Auto-generated assessment for NEW application', 'pending'),
(5, 33, 4, 500.00, 200.00, 150.00, 300.00, 100.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1250.00, 150.00, 1400.00, '2025-08-26 12:43:13', 'System', 'Auto-generated assessment for NEW application', 'pending'),
(6, 34, 4, 500.00, 200.00, 150.00, 300.00, 100.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1250.00, 150.00, 1400.00, '2025-08-26 12:46:02', 'System', 'Auto-generated assessment for NEW application', 'pending'),
(7, 35, 4, 500.00, 200.00, 150.00, 300.00, 100.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1250.00, 150.00, 1400.00, '2025-08-26 13:09:01', 'System', 'Auto-generated assessment for NEW application', 'pending'),
(8, 36, 4, 500.00, 200.00, 150.00, 300.00, 100.00, 0.00, 0.00, 0.00, 0.00, 0.00, 1250.00, 150.00, 1400.00, '2025-08-26 13:13:09', 'System', 'Auto-generated assessment for NEW application', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `business_payments`
--

CREATE TABLE `business_payments` (
  `id` int(11) NOT NULL,
  `application_id` int(11) NOT NULL,
  `assessment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `payment_method` enum('gcash','paymaya','bank_transfer','credit_card','over_counter') NOT NULL,
  `payment_amount` decimal(10,2) NOT NULL,
  `reference_number` varchar(100) DEFAULT NULL,
  `transaction_id` varchar(100) DEFAULT NULL,
  `payment_details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`payment_details`)),
  `payment_status` enum('pending','processing','completed','failed','cancelled','refunded') DEFAULT 'pending',
  `payment_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `confirmed_date` timestamp NULL DEFAULT NULL,
  `receipt_number` varchar(50) DEFAULT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_history`
--

CREATE TABLE `payment_history` (
  `id` int(11) NOT NULL,
  `payment_id` int(11) NOT NULL,
  `old_status` enum('pending','processing','completed','failed','cancelled','refunded') DEFAULT NULL,
  `new_status` enum('pending','processing','completed','failed','cancelled','refunded') NOT NULL,
  `changed_by` varchar(100) DEFAULT NULL,
  `change_reason` varchar(255) DEFAULT NULL,
  `change_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `metadata` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`metadata`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` enum('pending','approved','denied') DEFAULT 'pending',
  `role` enum('user','superadmin','admin') DEFAULT 'user',
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
(3, 'superadmin@example.com', '$2b$10$TWt7OC84LRKHM.SPDz0FmOZSSF2MafKScV9qLyNmo8iCgffrjykQG', 'approved', 'superadmin', '2025-08-22 12:51:08', 1, NULL, 'Super', 'Admin', '0000000000', '2025-08-22 12:51:08'),
(4, 'brilataivan86@gmail.com', '$2b$10$73nryApbna2vM8y.Ze.jGesTX.sW/OwvcRbDwoQbPW9gr4zINAt7m', 'approved', 'user', '2025-08-22 14:03:50', 1, NULL, 'ivan', 'Brilata', '09956738140', '2025-08-22 14:13:18'),
(5, 'ibrilata.dev@gmail.com', '$2b$10$mFN4n6/xRXobyEQPNnW..OvLs0fD6EuVhdAEUzcqKNJG82/CTWEfS', 'approved', 'admin', '2025-08-22 14:35:39', 1, NULL, 'ivan', 'brilata', '09956738140', '2025-08-22 14:36:34');

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
-- Indexes for table `business_assessments`
--
ALTER TABLE `business_assessments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_application_id` (`application_id`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_assessment_date` (`assessment_date`);

--
-- Indexes for table `business_payments`
--
ALTER TABLE `business_payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_application_id` (`application_id`),
  ADD KEY `idx_assessment_id` (`assessment_id`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_reference_number` (`reference_number`),
  ADD KEY `idx_payment_status` (`payment_status`),
  ADD KEY `idx_payment_date` (`payment_date`);

--
-- Indexes for table `payment_history`
--
ALTER TABLE `payment_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_payment_id` (`payment_id`),
  ADD KEY `idx_change_date` (`change_date`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `application_documents`
--
ALTER TABLE `application_documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `business_applications`
--
ALTER TABLE `business_applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `business_assessments`
--
ALTER TABLE `business_assessments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `business_payments`
--
ALTER TABLE `business_payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_history`
--
ALTER TABLE `payment_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `application_documents`
--
ALTER TABLE `application_documents`
  ADD CONSTRAINT `application_documents_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `business_applications` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `business_assessments`
--
ALTER TABLE `business_assessments`
  ADD CONSTRAINT `business_assessments_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `business_applications` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `business_assessments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `business_payments`
--
ALTER TABLE `business_payments`
  ADD CONSTRAINT `business_payments_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `business_applications` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `business_payments_ibfk_2` FOREIGN KEY (`assessment_id`) REFERENCES `business_assessments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `business_payments_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `payment_history`
--
ALTER TABLE `payment_history`
  ADD CONSTRAINT `payment_history_ibfk_1` FOREIGN KEY (`payment_id`) REFERENCES `business_payments` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
