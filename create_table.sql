-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 17, 2018 lúc 04:34 PM
-- Phiên bản máy phục vụ: 10.1.32-MariaDB
-- Phiên bản PHP: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `ibanking`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bank_account`
--

CREATE TABLE `bank_account` (
  `uid` int(11) NOT NULL,
  `balance` bigint(11) NOT NULL,
  `account_number` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `bank_account`
--

INSERT INTO `bank_account` (`uid`, `balance`, `account_number`) VALUES
(3, 392800, 5369569875811),
(4, 37780, 5504205075811),
(3, 9747800, 5504236575866),
(4, 346700, 5633230275444),
(4, 1313920, 5987451236544);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `beneficiary`
--

CREATE TABLE `beneficiary` (
  `uid` int(11) NOT NULL,
  `suggested_name` text COLLATE utf8_unicode_ci NOT NULL,
  `account_number` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `beneficiary`
--

INSERT INTO `beneficiary` (`uid`, `suggested_name`, `account_number`) VALUES
(3, 'Cường phi', 5504205075811),
(3, 'Cường BIDV', 5987451236544),
(4, 'Cường VPBank', 5369569875811);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `transaction`
--

CREATE TABLE `transaction` (
  `account_send` bigint(20) NOT NULL,
  `account_recieve` bigint(20) NOT NULL,
  `number_money` bigint(20) NOT NULL,
  `time` int(11) NOT NULL,
  `note` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `transaction`
--

INSERT INTO `transaction` (`account_send`, `account_recieve`, `number_money`, `time`, `note`) VALUES
(5504236575866, 5633230275444, 100000, 1545057590, 'nhậu chơi'),
(5504236575866, 5633230275444, 100000, 1545057659, 'nhậu chơi'),
(5504236575866, 5633230275444, 50000, 1545057680, 'nhậu chơi'),
(5369569875811, 5987451236544, 30000, 1545060049, '4 qua 3'),
(5504205075811, 5987451236544, 60020, 1545060102, '4 qua 3 tk khác'),
(5369569875811, 5987451236544, 25000, 1545060174, '3 qua 4 nè');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `username` text COLLATE utf8_unicode_ci NOT NULL,
  `password` text COLLATE utf8_unicode_ci NOT NULL,
  `rfToken` text COLLATE utf8_unicode_ci NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `email` text COLLATE utf8_unicode_ci NOT NULL,
  `phone` text COLLATE utf8_unicode_ci NOT NULL,
  `user_type` int(11) NOT NULL DEFAULT '0',
  `uid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`username`, `password`, `rfToken`, `name`, `email`, `phone`, `user_type`, `uid`) VALUES
('admin', 'admin', 'ckcWLVZYDSKeFgzFOc3PqFWZXigEchuGymP6Hv87QC4vebbMFcPmggOaczhLzvRZdSWzjrWdkPezoL73', '', '', '', 1, 1),
('cuonghothit', 'doccocuong', 'wSWyiI2jzZUu07huSkEKFVxBIFy8JHWd8tb8q1moN4m1hPHRkLbOQCutNXEe1WVWCF2G1ffesXPVxYzU', '', '', '', 0, 3),
('nficuong', 'cuonghothit', 'TNJE9a8jC1X6CmhxtW3RYocMSAFXSjOU6J8mYpDa5izHloTOXAAioO3pNtjPLTYGuJe5nPIP0Q3jcSri', '', '', '', 0, 4);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bank_account`
--
ALTER TABLE `bank_account`
  ADD PRIMARY KEY (`account_number`),
  ADD KEY `uid` (`uid`);

--
-- Chỉ mục cho bảng `beneficiary`
--
ALTER TABLE `beneficiary`
  ADD KEY `uid` (`uid`),
  ADD KEY `account_number` (`account_number`);

--
-- Chỉ mục cho bảng `transaction`
--
ALTER TABLE `transaction`
  ADD KEY `account_send` (`account_send`),
  ADD KEY `account_recieve` (`account_recieve`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `bank_account`
--
ALTER TABLE `bank_account`
  ADD CONSTRAINT `bank_account_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`);

--
-- Các ràng buộc cho bảng `beneficiary`
--
ALTER TABLE `beneficiary`
  ADD CONSTRAINT `beneficiary_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`),
  ADD CONSTRAINT `beneficiary_ibfk_2` FOREIGN KEY (`account_number`) REFERENCES `bank_account` (`account_number`);

--
-- Các ràng buộc cho bảng `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`account_send`) REFERENCES `bank_account` (`account_number`),
  ADD CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`account_recieve`) REFERENCES `bank_account` (`account_number`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
