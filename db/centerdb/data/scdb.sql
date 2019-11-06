/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80013
Source Host           : localhost:3306
Source Database       : scdb

Target Server Type    : MYSQL
Target Server Version : 80013
File Encoding         : 65001

Date: 2019-10-25 15:42:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for modlist
-- ----------------------------
DROP TABLE IF EXISTS `modlist`;
CREATE TABLE `modlist` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `rpc` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `host` varchar(255) DEFAULT NULL,
  `port` int(11) DEFAULT NULL,
  `enable` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of modlist
-- ----------------------------
INSERT INTO `modlist` VALUES ('1', ' 测试服务', 'test', '1', '127.0.0.1', '3101', '1');
