CREATE TABLE IF NOT EXISTS `Users` (
  `id` varchar(100) NOT NULL,
  `username` varchar(100) not null,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `registered` datetime ,
  `last_login` datetime ,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;




