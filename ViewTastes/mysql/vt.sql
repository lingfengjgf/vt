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
('充值','/index.html','用户充值');

#轮播图
CREATE TABLE vt_carousel_item(
	cid INT PRIMARY KEY AUTO_INCREMENT,
	pic VARCHAR(128),
	href VARCHAR(128),
	title VARCHAR(32),
	intro VARCHAR(1024)
);
INSERT INTO vt_carousel_item VALUES
(NULL,'../img/index/cxddj.jpg','javascript:;','创新的洞见','虎嗅2015精选集。作为领先的科技创新媒体及交流平台，虎嗅网365天不停歇地在追踪趋势、讨论方法与得失。它发布的文章的角度与深度，令这个平台独特。这本书是从它2015年近万篇文章中精心选择出来的代表作品，它们成功超越了时间施加在新闻上的速朽效应。希望读者能从这些看似乎零星散落的篇章里感知创新的去处、未来的风口。'),
(NULL,'../img/index/cgdsbz.jpg','javascript:;','成功的失败者：张学良传','本书以张学良与父亲张作霖、前妻于凤至、妻子赵一荻等三个亲人，周恩来、郭松龄、宋美龄、蒋士云等四个朋友以及蒋介石、溥仪这两个当事人交往的故事为线索，梳理出其荣辱交叠、波澜起伏的人生经历，展现其复杂的性格，并对他在“九·一八”事变、西安事变等事件中的行为和心态做出精辟深邃的辨析。'),
(NULL,'../img/index/zghhs.jpg','javascript:;','民国大师文库：中国绘画史','先生悲绘事之沦涣，忧师承之不明，因述《中国绘画史》一书，以明授受之渊源。顾颇自谦抑，自谓短篇小册，半爪一麟，不能博引旁证，搜求宏富。然识者论之，则谓纲领所在，已提挈无疑；始于伏羲记数而画卦，苍颉造字以象形，且对历代绘事之盛衰，各朝之沿革，画家之派别，绘事之本末，无不详为胪述，诚为后学之先导，问道之津梁也。——苏吉亨'),
(NULL,'../img/index/zgpzxff.jpg','javascript:;','小书馆：曾国潘治学方法','本书为“小书馆”丛书之一，绝版多年。这是一部民国人对曾国藩的解读，曾国藩女儿曾纪芬推崇备至，亲自作序推荐。它堪称一部精神的冶炼志，有关人生的各个方面，居官、同僚、子女、养生、读书、观人、器量、骄奢、淡泊、挫辱、坚忍，自省、笃实……在民国史家凝重的笔触下，对一个普通读书人变成巍峨君子的精神冶炼历程，给与了淋漓尽致的、有震撼力的叙述。');

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