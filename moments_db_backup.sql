-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: moments_db
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1),(2);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_item`
--

DROP TABLE IF EXISTS `cart_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_item` (
  `id` bigint NOT NULL,
  `quantity` int DEFAULT NULL,
  `cart_id` bigint DEFAULT NULL,
  `event_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `items_cart_fk` (`cart_id`),
  KEY `item_event_fk` (`event_id`),
  CONSTRAINT `item_event_fk` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`),
  CONSTRAINT `items_cart_fk` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_item`
--

LOCK TABLES `cart_item` WRITE;
/*!40000 ALTER TABLE `cart_item` DISABLE KEYS */;
INSERT INTO `cart_item` VALUES (1,1,2,1),(152,2,1,1);
/*!40000 ALTER TABLE `cart_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_item_guest_details`
--

DROP TABLE IF EXISTS `cart_item_guest_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_item_guest_details` (
  `cart_item_id` bigint NOT NULL,
  `guest_details_id` bigint NOT NULL,
  KEY `cart_item_guest_details_guest_fk` (`guest_details_id`),
  KEY `cart_item_guest_details_cartItem_fk` (`cart_item_id`),
  CONSTRAINT `cart_item_guest_details_cartItem_fk` FOREIGN KEY (`cart_item_id`) REFERENCES `cart_item` (`id`),
  CONSTRAINT `cart_item_guest_details_guest_fk` FOREIGN KEY (`guest_details_id`) REFERENCES `guest_details` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_item_guest_details`
--

LOCK TABLES `cart_item_guest_details` WRITE;
/*!40000 ALTER TABLE `cart_item_guest_details` DISABLE KEYS */;
INSERT INTO `cart_item_guest_details` VALUES (1,1),(152,7),(152,8);
/*!40000 ALTER TABLE `cart_item_guest_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_item_seq`
--

DROP TABLE IF EXISTS `cart_item_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_item_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_item_seq`
--

LOCK TABLES `cart_item_seq` WRITE;
/*!40000 ALTER TABLE `cart_item_seq` DISABLE KEYS */;
INSERT INTO `cart_item_seq` VALUES (251);
/*!40000 ALTER TABLE `cart_item_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `about` longtext,
  `city` varchar(255) DEFAULT NULL,
  `land_mark` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `venue` varchar(255) DEFAULT NULL,
  `available_tickets` int DEFAULT NULL,
  `banner_url` varchar(255) DEFAULT NULL,
  `date_time` datetime(6) DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `is_open` bit(1) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `suitable_for` varchar(255) DEFAULT NULL,
  `ticket_cost` int DEFAULT NULL,
  `total_tickets` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'Yo Yo Honey Singh India 10 city Tour 2025, Mumbai . Individuals below this age will not be permitted entry.   Stage Aaj Tak brings THE Biggest Blockbuster Tour of 2025 of THE ICON YO YO HONEY SINGH!\n!','Mumbai',NULL,'400035','Venue to be announced soon..',200,'https://i.imgur.com/7aDSs6k.jpeg','2025-02-22 18:00:00.000000','4 Hours','Music',_binary '','Millionaire India Tour ','16 yrs and above, Music Lovers',2000,200),(2,'ItΓÇÖs time to feel Arijit Singh\'s magic again!   Arijit Singh, the voice that has captivated millions, is back in AAMCHI MUMBAI for an unforgettable night! Here\'s your chance to witness a live spectacle from the heartthrob himself, right in your city','Mumbai',NULL,'400051','Jio world garden',300,'https://i.imgur.com/e5c9ogv.jpeg','2025-03-23 18:00:00.000000','4 Hours','Music',_binary '','Arijit Singh India Tour 2025','3 yrs and above',1000,300),(3,'Mumbai, itΓÇÖs once again time for AsiaΓÇÖs largest spoken word festival! Spend a weekend under the sky as words fill Mumbai\'s air with love, warmth, authentic human stories and music that tugs the heartstrings.','Mumbai',NULL,'400051','Jio World Garden',500,'https://i.imgur.com/oS7MXHp.jpeg','2025-02-01 14:00:00.000000','2 days','Festivals',_binary '','Spoken Fest | Mumbai 2025','Everyone',500,500),(4,'An Extraordinarily Mouthwatering Experience to Arouse all your sensory organs & Heighten Your Senses In a Relaxing, Mystifying Atmosphere of Total DarknessΓÇª   ','Mumbai',NULL,'400050','DORANGOS',400,'https://i.imgur.com/ol1CHPb.jpeg','2025-11-09 11:00:00.000000','1 Hours','Theatre',_binary '','Dark Senses-(Experience like never before)-FULL FOOD COVER','18 yrs and Above',200,400),(5,'Start your weekday with Some Salsa Dance.Its a 1 hour workshop,where you will get a taste Salsa Dance and also particpate.   Is gonna be fun with anything gos to make your Week day a fun filled evening.','Mumbai',NULL,'400050','Dorangos',100,'https://i.imgur.com/dSmpebi.jpeg','2025-02-18 16:00:00.000000','1 Hours','Workshops',_binary '','Salsa Time(Beginners Only)','16 yrs and Above',600,100),(6,'The Homegrown Festival is a first-of-its-kind culture and lifestyle festival in India that reimagines contemporary Indian culture and identity.2 Days | 1.5 Lakhs Sq Feet | 3 Warehouses | 10+ Performances | 0+ Brands | 10+ Launches & much more.','Mumbai',NULL,'400008','Richardson & Cruddas (1972) Ltd',500,'https://i.imgur.com/UcTJZ8J.jpeg','2025-02-22 12:30:00.000000','2 days','Festivals',_binary '','The Homegrown Festival - India\'s Definitive Culture & Lifestyle Festival','18 yrs and above',400,500),(7,'MUMBAI BUSINESS NETWORK | BUSINESS NETWORKING 2025   Mumbai Business Network the ultimate meetup for professionals seeking to connect exchange sales opportunities expand their business networks and engage in insightful discussions on industry-related topics.','Mumbai',NULL,'400052','603 The Coworking Space',50,'https://i.imgur.com/8037hh3.jpeg','2025-02-23 10:30:00.000000','3 Hours','Conferences',_binary '','MUMBAI BUSINESS NETWORK | BUSINESS NETWORKING 2025','18 yrs & above',450,50),(8,'Start a Date is not just an event; it`s an experience designed to facilitate genuine connections and meaningful interactions. During the event, participants engage in a variety of activities tailored to encourage conversation, laughter, and the discovery of common interests.','Mumbai',NULL,'400028','Shivaji park',50,'https://i.imgur.com/JkgM2Qh.png','2025-02-01 10:30:00.000000','3 Hours','Dating',_binary '','Start A Date | Dating |','18 yrs & above',150,50);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_gallery`
--

DROP TABLE IF EXISTS `event_gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_gallery` (
  `event_id` bigint NOT NULL,
  `gallery` varchar(255) DEFAULT NULL,
  KEY `FKe97kb3ouvqt2w45nj2t5g7iem` (`event_id`),
  CONSTRAINT `FKe97kb3ouvqt2w45nj2t5g7iem` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_gallery`
--

LOCK TABLES `event_gallery` WRITE;
/*!40000 ALTER TABLE `event_gallery` DISABLE KEYS */;
INSERT INTO `event_gallery` VALUES (1,'https://i.imgur.com/0TykR8c.jpeg'),(1,'https://i.imgur.com/ieC9GMc.jpeg'),(1,'https://i.imgur.com/19BFoln.jpeg'),(1,'https://i.imgur.com/dS5pIHi.jpeg'),(2,'https://i.imgur.com/4eQ8cMH.jpeg'),(2,'https://i.imgur.com/QqEChPr.jpeg'),(2,'https://i.imgur.com/7bURsEn.jpeg'),(3,'https://i.imgur.com/8vBr6SC.png'),(3,'https://i.imgur.com/iEgRweB.png'),(3,'https://i.imgur.com/aoTY3VT.png'),(3,'https://i.imgur.com/2IM3w8G.png'),(4,'https://i.imgur.com/n3O5Nld.jpeg'),(4,'https://i.imgur.com/rvbvSr2.jpeg'),(4,'https://i.imgur.com/vO4hAT3.jpeg'),(5,'https://i.imgur.com/o5ZTdvi.jpeg'),(5,'https://i.imgur.com/3KcIcOy.jpeg'),(5,'https://i.imgur.com/XrjxVHn.jpeg'),(6,'https://i.imgur.com/Uq9aYE8.jpeg'),(7,'https://i.imgur.com/NqTwA4c.jpeg'),(8,'https://i.imgur.com/WD2zQsm.jpeg'),(8,'https://i.imgur.com/ivVisox.jpeg');
/*!40000 ALTER TABLE `event_gallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_languages`
--

DROP TABLE IF EXISTS `event_languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_languages` (
  `event_id` bigint NOT NULL,
  `languages` varchar(255) DEFAULT NULL,
  KEY `FK63alq1wsn13rgr7vdcib68tfm` (`event_id`),
  CONSTRAINT `FK63alq1wsn13rgr7vdcib68tfm` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_languages`
--

LOCK TABLES `event_languages` WRITE;
/*!40000 ALTER TABLE `event_languages` DISABLE KEYS */;
INSERT INTO `event_languages` VALUES (1,'Hindi'),(1,'Punjabi'),(3,'English'),(3,'Hindi'),(4,'English'),(4,'Hindi'),(5,'English'),(5,'Hindi'),(6,'English'),(6,'Hindi'),(6,'Marathi'),(6,'Gujarati'),(7,'English'),(7,'Hindi'),(8,'English'),(8,'Hindi'),(8,'Telugu'),(8,'Marathi');
/*!40000 ALTER TABLE `event_languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_terms_and_conditions`
--

DROP TABLE IF EXISTS `event_terms_and_conditions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_terms_and_conditions` (
  `event_id` bigint NOT NULL,
  `terms_and_conditions` varchar(255) DEFAULT NULL,
  KEY `FKk0y19cwjnhd1bc5k1hxrve8pl` (`event_id`),
  CONSTRAINT `FKk0y19cwjnhd1bc5k1hxrve8pl` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_terms_and_conditions`
--

LOCK TABLES `event_terms_and_conditions` WRITE;
/*!40000 ALTER TABLE `event_terms_and_conditions` DISABLE KEYS */;
INSERT INTO `event_terms_and_conditions` VALUES (1,'Please carry a valid ID proof along with you.'),(1,'No refunds on purchased ticket are possible, even in case of any rescheduling.'),(1,'Security procedures, including frisking remain the right of the management.'),(1,'No dangerous or potentially hazardous objects including but not limited to weapons, knives, guns, fireworks, helmets, lazer devices, bottles, musical instruments will be allowed in the venue and may be ejected with or without the owner from the venue'),(1,'The sponsors/performers/organizers are not responsible for any injury or damage occurring due to the event. Any claims regarding the same would be settled in courts in Mumbai.'),(1,'Organizers hold the right to deny late entry to the event.'),(2,'Please note that all registrations and tickets are exclusively available only on District by Zomato.'),(2,'Beware of unauthorised parties claiming to issue tickets.'),(3,'Please carry a valid ID proof along with you.'),(3,'No refunds on purchased ticket are possible, even in case of any rescheduling.'),(3,'The sponsors/performers/organizers are not responsible for any injury or damage occurring due to the event. Any claims regarding the same would be settled in courts in Mumbai.'),(4,'Please carry a valid ID proof along with you.'),(4,'No refunds on purchased ticket are possible, even in case of any rescheduling.'),(4,'Security procedures, including frisking remain the right of the management.'),(4,'Venue rules apply.'),(5,'Please carry a valid ID proof along with you.'),(5,'No refunds on purchased ticket are possible, even in case of any rescheduling.'),(5,'People in an inebriated state may not be allowed entry.'),(5,'Organizers hold the right to deny late entry to the event.'),(6,'Please carry a valid ID proof along with you.'),(6,'No refunds on purchased ticket are possible, even in case of any rescheduling.'),(6,'Security procedures, including frisking remain the right of the management.'),(7,'Please carry a valid ID proof along with you.'),(7,'No refunds on purchased ticket are possible, even in case of any rescheduling.'),(7,'Security procedures, including frisking remain the right of the management.'),(7,'The sponsors/performers/organizers are not responsible for any injury or damage occurring due to the event. Any claims regarding the same would be settled in courts in Mumbai.'),(8,'Please carry a valid ID proof along with you.'),(8,'No refunds on purchased ticket are possible, even in case of any rescheduling.'),(8,'Security procedures, including frisking remain the right of the management.');
/*!40000 ALTER TABLE `event_terms_and_conditions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_ticket`
--

DROP TABLE IF EXISTS `event_ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_ticket` (
  `id` varchar(255) NOT NULL,
  `event_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `event_event_ticket_fk` (`event_id`),
  KEY `event_ticket_user_fk` (`user_id`),
  CONSTRAINT `event_event_ticket_fk` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`),
  CONSTRAINT `event_ticket_user_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_ticket`
--

LOCK TABLES `event_ticket` WRITE;
/*!40000 ALTER TABLE `event_ticket` DISABLE KEYS */;
INSERT INTO `event_ticket` VALUES ('2fd8632d-9256-46ee-b4a7-17403357581c',1,1),('7f829dc7-821d-4a4a-8b49-8915cd068bd8',1,2),('c785fce2-ed61-4394-9ac9-5a19a11ee02d',1,2);
/*!40000 ALTER TABLE `event_ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_ticket_guest_list`
--

DROP TABLE IF EXISTS `event_ticket_guest_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_ticket_guest_list` (
  `ticket_id` varchar(255) NOT NULL,
  `guest_id` bigint NOT NULL,
  KEY `FKo4bd8o1xgpdpvidu4yy9vvud` (`guest_id`),
  KEY `FK4606pjd618lp0sq1ehbywpxg1` (`ticket_id`),
  CONSTRAINT `FK4606pjd618lp0sq1ehbywpxg1` FOREIGN KEY (`ticket_id`) REFERENCES `event_ticket` (`id`),
  CONSTRAINT `FKo4bd8o1xgpdpvidu4yy9vvud` FOREIGN KEY (`guest_id`) REFERENCES `guest_details` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_ticket_guest_list`
--

LOCK TABLES `event_ticket_guest_list` WRITE;
/*!40000 ALTER TABLE `event_ticket_guest_list` DISABLE KEYS */;
INSERT INTO `event_ticket_guest_list` VALUES ('c785fce2-ed61-4394-9ac9-5a19a11ee02d',2),('c785fce2-ed61-4394-9ac9-5a19a11ee02d',3),('2fd8632d-9256-46ee-b4a7-17403357581c',4),('2fd8632d-9256-46ee-b4a7-17403357581c',5),('7f829dc7-821d-4a4a-8b49-8915cd068bd8',6);
/*!40000 ALTER TABLE `event_ticket_guest_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_what_to_expect`
--

DROP TABLE IF EXISTS `event_what_to_expect`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_what_to_expect` (
  `event_id` bigint NOT NULL,
  `what_to_expect` varchar(255) DEFAULT NULL,
  KEY `FK8b4uq7jxqgv23ni7s51jbhj23` (`event_id`),
  CONSTRAINT `FK8b4uq7jxqgv23ni7s51jbhj23` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_what_to_expect`
--

LOCK TABLES `event_what_to_expect` WRITE;
/*!40000 ALTER TABLE `event_what_to_expect` DISABLE KEYS */;
INSERT INTO `event_what_to_expect` VALUES (1,'You can definitely enjoy'),(3,'will be Great experience'),(3,'You will Love Bollywood world after this Fest!!'),(4,'You will find some dark senses'),(6,'you will know your culture after this event.'),(7,'Mumbai Business Network you\'ll have the opportunity to engage with like-minded individuals who are passionate about growing their businesses and expanding their reach.'),(8,'Authentic Engagement'),(8,'Balance and Flexibility'),(8,'Respectful Environment');
/*!40000 ALTER TABLE `event_what_to_expect` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest_details`
--

DROP TABLE IF EXISTS `guest_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest_details` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest_details`
--

LOCK TABLES `guest_details` WRITE;
/*!40000 ALTER TABLE `guest_details` DISABLE KEYS */;
INSERT INTO `guest_details` VALUES (1,'rahul ','tigaya'),(2,'raj','yadav'),(3,'puneet','superstar'),(4,'Samar','Singh'),(5,'John ','Doe'),(6,'raj','yadav'),(7,'dds','assacas'),(8,'saasdcd','dcds');
/*!40000 ALTER TABLE `guest_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ROLE_ADMIN','ROLE_USER') DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `cart_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKsb8bbouer5wak8vyiiy4pf2bx` (`username`),
  UNIQUE KEY `UK47dq8urpj337d3o65l3fsjph3` (`cart_id`),
  CONSTRAINT `user_cart_fk` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'$2a$10$bvFXnThz2jD7ytrYSZZrBuXvi3t18fha.GzX0eE2cPx5EOQj5Lknu','ROLE_ADMIN','rahultigaya44@gmail.com',1),(2,'$2a$10$vp8xWm.93hV.BSr5jDTUIuPzHwQMiP7ZVa965Y/tr/bnQNrSjNy/e','ROLE_USER','rahultigaya098@gmail.com',2);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_seq`
--

DROP TABLE IF EXISTS `user_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_seq`
--

LOCK TABLES `user_seq` WRITE;
/*!40000 ALTER TABLE `user_seq` DISABLE KEYS */;
INSERT INTO `user_seq` VALUES (101);
/*!40000 ALTER TABLE `user_seq` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-26 14:17:58
