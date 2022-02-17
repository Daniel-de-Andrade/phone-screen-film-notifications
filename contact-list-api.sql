/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:8889
 Source Schema         : contact-list-api

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 16/02/2022 21:00:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for contacts
-- ----------------------------
DROP TABLE IF EXISTS `contacts`;
CREATE TABLE `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `name` varchar(80) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `email` varchar(80) DEFAULT NULL,
  `createdOn` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedOn` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of contacts
-- ----------------------------
BEGIN;
INSERT INTO `contacts` VALUES (1, 26, 'André', '123123', 'andre@gmail.com', '2022-02-16 20:24:27.928973', NULL);
INSERT INTO `contacts` VALUES (2, 26, NULL, NULL, NULL, '2022-02-16 20:26:54.636848', NULL);
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(100) NOT NULL,
  `createdOn` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedOn` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES (26, 'André', 'mytest@gmail.com', '$2b$10$W6XoMYxv6S8MBUblKfkX9uY1fdTKWuswlnOl2Ic7xks5IpfGKPr7O', '2022-02-15 00:53:20.079365', NULL);
INSERT INTO `users` VALUES (27, 'Daniel Andrade', 'danielandrade@gmail.comm', '$2b$10$VczhhrEU6YFmI6iWXSEbUetsec99JK10eNUhBsJfvAb.z7GNnr5CG', '2022-02-15 15:37:53.609413', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
