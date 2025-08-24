-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 24, 2025 at 06:32 PM
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
(1, 4, 'certificate_2.pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756046321412-certificate_2.pdf', '2025-08-24 14:38:41'),
(2, 5, 'certificate_2 (1).pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756048090256-certificate_2 (1).pdf', '2025-08-24 15:08:10'),
(3, 5, 'certificate_13 (1).pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756048090258-certificate_13 (1).pdf', '2025-08-24 15:08:10'),
(4, 5, 'certificate_13.pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756048090258-certificate_13.pdf', '2025-08-24 15:08:10'),
(5, 5, 'certificate_2 (1).pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756048090258-certificate_2 (1).pdf', '2025-08-24 15:08:10'),
(6, 5, 'certificate_2.pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756048090258-certificate_2.pdf', '2025-08-24 15:08:10'),
(7, 5, 'certificate_11.pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756048090258-certificate_11.pdf', '2025-08-24 15:08:10'),
(8, 6, 'certificate_2.pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756048425931-certificate_2.pdf', '2025-08-24 15:13:45'),
(9, 6, 'certificate_14.pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756048425932-certificate_14.pdf', '2025-08-24 15:13:45'),
(10, 6, 'certificate_13 (1).pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756048425932-certificate_13 (1).pdf', '2025-08-24 15:13:45'),
(11, 6, 'certificate_11.pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756048425932-certificate_11.pdf', '2025-08-24 15:13:45'),
(12, 6, 'certificate_13.pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756048425932-certificate_13.pdf', '2025-08-24 15:13:45'),
(13, 6, 'certificate_14.pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756048425932-certificate_14.pdf', '2025-08-24 15:13:45'),
(14, 7, 'certificate_11.pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756048630088-certificate_11.pdf', '2025-08-24 15:17:10'),
(15, 7, 'certificate_11.pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756048630088-certificate_11.pdf', '2025-08-24 15:17:10'),
(16, 7, 'certificate_11.pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756048630088-certificate_11.pdf', '2025-08-24 15:17:10'),
(17, 8, 'certificate_2.pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756049052231-certificate_2.pdf', '2025-08-24 15:24:12'),
(18, 9, 'certificate_2.pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756049590165-certificate_2.pdf', '2025-08-24 15:33:10'),
(19, 9, 'certificate_2.pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756049590165-certificate_2.pdf', '2025-08-24 15:33:10'),
(20, 9, 'certificate_13.pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756049590167-certificate_13.pdf', '2025-08-24 15:33:10'),
(21, 9, 'certificate_13.pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756049590167-certificate_13.pdf', '2025-08-24 15:33:10'),
(22, 9, 'certificate_11.pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756049590167-certificate_11.pdf', '2025-08-24 15:33:10'),
(23, 9, 'certificate_13 (1).pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756049590167-certificate_13 (1).pdf', '2025-08-24 15:33:10'),
(24, 9, 'certificate_2.pdf', 'C:\\Users\\ivann\\business-permit-system\\backend\\uploads\\1756049590167-certificate_2.pdf', '2025-08-24 15:33:10');

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

INSERT INTO `business_applications` (`id`, `business_type`, `dti_sec_cda_number`, `business_name`, `tax_id_number`, `trade_name`, `first_name`, `middle_name`, `last_name`, `extension`, `sex`, `email`, `telephone`, `mobile`, `region`, `province`, `city`, `barangay`, `address_line_1`, `taxpayer_zip_code`, `business_area`, `employees_in_area`, `male_employees`, `female_employees`, `van_delivery_vehicles`, `truck_delivery_vehicles`, `motorcycle_delivery_vehicles`, `same_as_business_address`, `taxpayer_region`, `taxpayer_province`, `taxpayer_city`, `taxpayer_barangay`, `taxpayer_address_line_1`, `own_property`, `lessor_name`, `monthly_rental`, `tax_incentives`, `business_activity`, `line_of_business`, `products_services`, `number_of_units`, `total_capitalization`, `created_at`) VALUES
(1, 'Sole Proprietorship', '2222', 'asda', '22', 'asd', 'asd', 'asd', 'asd', 'jr', 'Male', 'ibrilata.dev@gmail.com', '09956738140', '09956738140', 'REGION IV-A (CALABARZON)', 'LAGUNA', 'ALAMINOS', 'AQUINO', 'asda', '4325', '222', 2, 2, 2, 1, 2, 0, 0, '', '', '', '', '', 0, '', 0.00, 0, 'Main Office', 'Education', 'sadsa', 22, 222222.00, '2025-08-24 14:22:03'),
(2, 'Sole Proprietorship', '2222', 'asda', '22', 'asd', 'asd', 'asd', 'asd', 'jr', 'Male', 'ibrilata.dev@gmail.com', '09956738140', '09956738140', 'REGION IV-A (CALABARZON)', 'LAGUNA', 'ALAMINOS', 'AQUINO', 'asda', '4325', '222', 2, 2, 2, 1, 2, 0, 0, '', '', '', '', '', 0, '', 0.00, 0, 'Main Office', 'Education', 'sadsa', 22, 222222.00, '2025-08-24 14:27:18'),
(3, 'Sole Proprietorship', '2222', 'asda', '22', 'asd', 'asd', 'asd', 'asd', 'jr', 'Male', 'ibrilata.dev@gmail.com', '09956738140', '09956738140', 'REGION IV-A (CALABARZON)', 'LAGUNA', 'ALAMINOS', 'AQUINO', 'asda', '4325', '222', 2, 2, 2, 1, 2, 0, 0, '', '', '', '', '', 0, '', 0.00, 0, 'Main Office', 'Education', 'sadsa', 22, 222222.00, '2025-08-24 14:30:19'),
(4, 'Sole Proprietorship', '2222', 'asdsa', '222', 'asd', 'asd', 'asd', 'asd', 'jr', 'Male', 'ibrilata.dev@gmail.com', '09956738140', '09956738140', 'REGION IV-A (CALABARZON)', 'LAGUNA', 'ALAMINOS', 'AQUINO', 'asdsa', '4325', '2', 1, 2, 2, 2, 2, 2, 0, 'sad', 'asd', 'asd', 'asd', 'asd', 0, 'asdsa', 2222.00, 0, 'Main Office', 'Financial Services', 'asdsa', 222, 222.00, '2025-08-24 14:38:41'),
(5, 'Sole Proprietorship', '23232', 'ada', '222', 'sad', 'asd', 'asd', 'asd', 'jr', 'Male', 'ibrilata.dev@gmail.com', '09956738140', '09151698172', 'REGION IV-A (CALABARZON)', 'LAGUNA', 'ALAMINOS', 'AQUINO', 'adsa', '4325', '2222', 2, 2, 2, 2, 2, 2, 0, 'asd', 'asd', 'asd', 'as', 'asd', 0, 'sadas', 222222.00, 0, 'Main Office', 'Real Estate', 'asdas', 2222, 2222222.00, '2025-08-24 15:08:10'),
(6, 'Sole Proprietorship', 'asda', 'asda', '222', 'asdsa', 'asds', 'asd', 'asd', 'jr', 'Male', 'ibrilata.dev@gmail.com', '09956738140', '09956738140', 'REGION IV-A (CALABARZON)', 'LAGUNA', 'ALAMINOS', 'AQUINO', 'asdsa', '4325', '2222', 1, 2, 2, 2, 2, 2, 0, 'asd', 'sad', 'asd', 'asd', 'adsadas', 0, 'asd', -2.00, 0, 'Main Office', 'Retail Trade', 'asda', 222, 22222.00, '2025-08-24 15:13:45'),
(7, 'Sole Proprietorship', '2222', 'asd', '222', 'asd', 'asd', 'asd', 'asd', 'jr', 'Male', 'ibrilata.dev@gmail.com', '09956738140', '09151698172', 'REGION IV-A (CALABARZON)', 'LAGUNA', 'ALAMINOS', 'AQUINO', 'asda', '4325', '22222', 2, 2, 2, 2, 2, 0, 0, 'asdsa', 'asd', 'asd', 'asd', 'asdsaas', 0, 'asd', 0.00, 0, 'Main Office', 'Education', 'asdsa', 2222, 22222.00, '2025-08-24 15:17:10'),
(8, 'Sole Proprietorship', '222', 'asda', '222', 'asd', 'asd', 'asd', 'asdsa', 'jr', 'Male', 'ibrilata.dev@gmail.com', '09956738140', '09151698172', 'REGION IV-A (CALABARZON)', 'LAGUNA', 'ALAMINOS', 'AQUINO', 'asdsa', '4325', '2222', 2, 2, 2, 2, 2, 2, 0, 'asd', 'asd', 'asd', 'asd', 'adsasdsa', 0, 'asdas', 0.00, 0, 'Main Office', 'Education', 'asdasad', 222, 22222.00, '2025-08-24 15:24:12'),
(9, 'Sole Proprietorship', '2222', 'asd', 'asd', 'asasd', 'asd', 'asd', 'asd', 'jr', 'Male', 'ibrilata.dev@gmail.com', '09956738140', '09151698172', 'REGION IV-A (CALABARZON)', 'LAGUNA', 'ALAMINOS', 'AQUINO', 'asdsa', '4325', '2222', 1, 2, 2, 2, 2, 1, 0, 'asdas', 'asdsad', 'asda', 'asd', 'asd', 0, 'asdasd', 22222.00, 0, 'Main Office', 'Wholesale Trade', 'asdad', 2222, 222222.00, '2025-08-24 15:33:10');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
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

INSERT INTO `users` (`id`, `name`, `email`, `password`, `status`, `role`, `created_at`, `verified`, `verification_token`, `first_name`, `last_name`, `phone_number`, `updated_at`) VALUES
(3, '', 'superadmin@example.com', '$2b$10$TWt7OC84LRKHM.SPDz0FmOZSSF2MafKScV9qLyNmo8iCgffrjykQG', 'approved', 'superadmin', '2025-08-22 12:51:08', 1, NULL, 'Super', 'Admin', '0000000000', '2025-08-22 12:51:08'),
(4, '', 'brilataivan86@gmail.com', '$2b$10$73nryApbna2vM8y.Ze.jGesTX.sW/OwvcRbDwoQbPW9gr4zINAt7m', 'approved', 'user', '2025-08-22 14:03:50', 1, NULL, 'ivan', 'Brilata', '09956738140', '2025-08-22 14:13:18'),
(5, '', 'ibrilata.dev@gmail.com', '$2b$10$mFN4n6/xRXobyEQPNnW..OvLs0fD6EuVhdAEUzcqKNJG82/CTWEfS', 'approved', 'admin', '2025-08-22 14:35:39', 1, NULL, 'ivan', 'brilata', '09956738140', '2025-08-22 14:36:34');

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
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `application_documents`
--
ALTER TABLE `application_documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `business_applications`
--
ALTER TABLE `business_applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
