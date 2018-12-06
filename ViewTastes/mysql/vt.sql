#创建数据库
SET NAMES UTF8;
DROP DATABASE  IF EXISTS vt;
CREATE DATABASE vt CHARSET=UTF8;
USE vt;

#网站基本信息
CREATE TABLE vt_site_info(
	site_name VARCHAR(16),
	logo VARCHAR(64),
	copyright VARCHAR(64)
);
INSERT INTO vt_site_info VALUES('观品','img/logo.png','2018 All Rights Reserved 观品科技股份有限公司 版权所有');

#导航条目
CREATE TABLE vt_navbar_item(
	name VARCHAR(16),
	url VARCHAR(64),
	title VARCHAR(32)
);
INSERT INTO vt_navbar_item VALUES
('首页','/index.html','观品网首页'),
('分类','/index.html','小说分类'),
('排行','/index.html','小说排行'),
('书架','/index.html','读者收藏'),
('上传作品','/index.html','上传小说');

#轮播图
CREATE TABLE vt_carousel_item(
	cid INT PRIMARY KEY AUTO_INCREMENT,
	pic VARCHAR(128),
	url VARCHAR(128),
	title VARCHAR(32)
);
INSERT INTO vt_carousel_item VALUES
(NULL,'img/pic_1,jpg','/m1.html','成功的失败者：张学良传'),
(NULL,'img/pic_2,jpg','/m2.html','悲剧的诞生：尼采美学文选'),
(NULL,'img/pic_3,jpg','/m3.html','民国大师文库：中国绘画史'),
(NULL,'img/pic_4,jpg','/m4.html','小书馆：曾国潘治学方法');

#出版图书
CREATE TABLE vt_b1f(
	b1_id INT NOT NULL,
	b1_img VARCHAR(128),
	b1_title VARCHAR(16),
	b1_author VARCHAR(16)
);
INSERT INTO vt_b1f VALUES
('1','/img/book/b1f_1.jpg','异海','蛇从革'),
('2','/img/book/b1f_2.jpg','掌控谈话','克里斯·沃斯 塔尔·拉兹'),
('3','/img/book/b1f_3.jpg','权力巅峰的女人','蒋胜男'),
('4','/img/book/b1f_4.jpg','大雪无痕','陆天明'),
('5','/img/book/b1f_5.jpg','宇宙超度指南','李诞'),
('6','/img/book/b1f_6.jpg','圈子不同，不必强融','张超');

#创建用户表
CREATE TABLE vt_user(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	uname VARCHAR(16),
	upwd  VARCHAR(16),
	phone VARCHAR(16),
	email VARCHAR(32),
	age TINYINT,
	gender TINYINT,        #女-0 男-1
	avatar VARCHAR(128),
	isOnline BOOL
);
INSERT INTO vt_user VALUES
(NULL,'aaa','123456','13812345678','aaa@163.com','18','0','/img/avatar/aaa.jpg','0');

#创建书籍表
CREATE TABLE vt_book(
	bid INT PRIMARY KEY AUTO_INCREMENT,
	bname VARCHAR(32),
	author VARCHAR(16),    #作者
	genre VARCHAR(8),      #类型
	words DECIMAL(5,2)     #字数/万
);
INSERT INTO vt_book VALUES
(NULL,'活着','余华','文学','9.6');