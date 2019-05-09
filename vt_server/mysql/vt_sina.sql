
SET NAMES UTF8;

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
('首页','/index','观品网首页'),
('分类','/classify','小说分类'),
('排行','/index.html','小说排行'),
('书架','/index.html','读者收藏'),
('充值','/index.html','用户充值');

#轮播图
CREATE TABLE vt_carousel_item(
	cid INT PRIMARY KEY AUTO_INCREMENT,
	bookId INT
);
INSERT INTO vt_carousel_item VALUES
(NULL,'3'),
(NULL,'2'),
(NULL,'4'),
(NULL,'5'),
(NULL,'6'),
(NULL,'7'),
(NULL,'8'),
(NULL,'9'),
(NULL,'10'),
(NULL,'1'),
(NULL,'11'),
(NULL,'5'),
(NULL,'12'),
(NULL,'6'),
(NULL,'13'),
(NULL,'14');

#出版图书
CREATE TABLE vt_publish(
	b1_id INT PRIMARY KEY AUTO_INCREMENT,
	bookId INT,
	sort INT
);
INSERT INTO vt_publish VALUES
('1','15','1'),
('2','14','2'),
('3','16','3'),
('4','17','4'),
('5','18','5'),
('6','19','6');

#出版图书导航
CREATE TABLE vt_publish_top(
	tid INT PRIMARY KEY AUTO_INCREMENT,
	label VARCHAR(8)
);
INSERT INTO vt_publish_top VALUES
(NULL,'小说'),
(NULL,'励志成功'),
(NULL,'文学'),
(NULL,'经济管理');


#出版编辑推荐表
CREATE TABLE vt_publish_recommend(
	rid INT PRIMARY KEY AUTO_INCREMENT,
	bookId INT,
	sort INT
);
INSERT INTO vt_publish_recommend VALUES
(NULL,'3','3'),
(NULL,'1','1'),
(NULL,'5','4'),
(NULL,'8','2');

#出版热销表
CREATE TABLE vt_publish_best(
	bid INT PRIMARY KEY AUTO_INCREMENT,
	bookId INT,
	sort INT
);
INSERT INTO vt_publish_best VALUES
(NULL,'12','5'),
(NULL,'13','1'),
(NULL,'15','3'),
(NULL,'14','2'),
(NULL,'16','4'),
(NULL,'17','6'),
(NULL,'18','7'),
(NULL,'19','8'),
(NULL,'10','9'),
(NULL,'9','10'),
(NULL,'7','11'),
(NULL,'5','12'),
(NULL,'8','13');

#出版新书表
CREATE TABLE vt_publish_new(
	nid INT PRIMARY KEY AUTO_INCREMENT,
	bookId INT,
	sort INT
);
INSERT INTO vt_publish_new VALUES
(NULL,'4','1'),
(NULL,'8','2'),
(NULL,'6','3'),
(NULL,'7','4'),
(NULL,'3','5'),
(NULL,'5','6'),
(NULL,'9','7');

#书籍分类标签表
CREATE TABLE vt_classify(
	cid INT PRIMARY KEY AUTO_INCREMENT,
	cname VARCHAR(8),         #类型分类
	label VARCHAR(8)          #标签
);
INSERT INTO vt_classify VALUES
(NULL,'频道','全部'),
(NULL,'频道','出版'),
(NULL,'频道','经典'),
(NULL,'频道','国外'),
(NULL,'类型','全部'),
(NULL,'类型','文学'),
(NULL,'类型','传记'),
(NULL,'类型','武侠'),
(NULL,'类型','绘画'),
(NULL,'类型','教育'),
(NULL,'类型','国学'),
(NULL,'类型','玄幻'),
(NULL,'类型','历史'),
(NULL,'类型','言情'),
(NULL,'类型','社科'),
(NULL,'类型','政治'),
(NULL,'类型','科幻'),
(NULL,'类型','都市'),
(NULL,'类型','推理'),
(NULL,'类型','管理'),
(NULL,'类型','外文'),
(NULL,'类型','少儿'),
(NULL,'类型','宗教'),
(NULL,'类型','哲学'),
(NULL,'类型','美食'),
(NULL,'类型','艺术'),
(NULL,'类型','军事'),
(NULL,'类型','时尚'),
(NULL,'类型','养生'),
(NULL,'类型','法律'),
(NULL,'类型','休闲'),
(NULL,'类型','体育'),
(NULL,'其它','全部'),
(NULL,'其它','免费'),
(NULL,'其它','特价'),
(NULL,'其它','VIP');

#创建用户表
CREATE TABLE vt_user(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	uname VARCHAR(16),
	upwd  VARCHAR(32),
	phone VARCHAR(16),
	email VARCHAR(32),
	avatar VARCHAR(128), 
	bg  VARCHAR(128),
	readFontF SMALLINT,
	readFontS SMALLINT,
	readBg SMALLINT,
	isVIP BOOL,
	balance INT 
);
INSERT INTO vt_user VALUES
(NULL,'aaa',md5('123456'),'13812345678','aaa@163.com','/img/user/icon/default.png','bg.jpg',0,18,0,0,0);

#用户头像表
CREATE TABLE vt_avatar(
	aid INT PRIMARY KEY AUTO_INCREMENT,
	pic VARCHAR(128)
);
INSERT INTO vt_avatar VALUES
(NULL,"/img/user/icon/0002.gif"),
(NULL,"/img/user/icon/0004.gif"),
(NULL,"/img/user/icon/0010.gif"),
(NULL,"/img/user/icon/0018.gif"),
(NULL,"/img/user/icon/0019.gif"),
(NULL,"/img/user/icon/0020.gif");

#用户背景表
CREATE TABLE vt_bg(
	gid INT PRIMARY KEY AUTO_INCREMENT,
	pic VARCHAR(128)
);
INSERT INTO vt_bg VALUES
(NULL,'bg.jpg'),
(NULL,'bg01.jpg'),
(NULL,'bg02.jpg'),
(NULL,'bg03.jpg'),
(NULL,'bg04.jpg'),
(NULL,'bg05.jpg'),
(NULL,'bg06.jpg');

#充值金额表
CREATE TABLE vt_money(
	yid INT PRIMARY KEY AUTO_INCREMENT,
	pay SMALLINT,
	bookCoin INT,
	give INT
);
INSERT INTO vt_money VALUES
(NULL,20,2000,0),
(NULL,50,5000,0),
(NULL,100,10000,0),
(NULL,200,20000,1000),
(NULL,300,30000,2000),
(NULL,500,50000,5000);

#充值VIP表
CREATE TABLE vt_vip(
	vid INT PRIMARY KEY AUTO_INCREMENT,
	pay SMALLINT,
	buyTime VARCHAR(64),
	vipGive INT
);
INSERT INTO vt_vip VALUES
(NULL,20,'1月',0),
(NULL,50,'3月',500),
(NULL,188,'1年',1000);

#创建书评表
CREATE TABLE vt_comments(
	cid INT PRIMARY KEY AUTO_INCREMENT,
	bookId INT,
	uid INT,
	content VARCHAR(1024),
	ctime DATETIME
);
INSERT INTO vt_comments VALUES
(NULL,1,1,'好看',now()),
(NULL,1,1,'真的好看',now()),
(NULL,1,1,'电视剧看了一遍，电影看了一遍，文字看了一遍，有声听了一遍！演的也好，写的更好！',now()),
(NULL,1,1,'看完，泪奔。小的时候也经历过农村的苦日子，感同身受。那么多不幸集于一身，然而唯有活着，才不枉来世间走一遭',now()),
(NULL,1,1,'生病的不是人，是哪个时代。社会价值观的扭曲！没有使人向善！',now()),
(NULL,1,1,'二刷',now());

#创建书架表
CREATE TABLE vt_bookshelf(
	sid INT PRIMARY KEY AUTO_INCREMENT,
	uid INT,
	bookId INT,
	readed INT,
	isBuy BOOL
);
INSERT INTO vt_bookshelf VALUES
(NULL,1,3,0,0),
(NULL,1,5,0,0),
(NULL,1,6,0,1),
(NULL,1,8,0,0),
(NULL,1,2,0,1),
(NULL,1,13,0,1);

#小程序轮播图
CREATE TABLE vt_wx_casel(
	cid INT PRIMARY KEY AUTO_INCREMENT,
	pic VARCHAR(256)
);
INSERT INTO vt_wx_casel VALUES
(NULL,'/img/index/wxcasel01.jpg'),
(NULL,'/img/index/wxcasel02.jpg'),
(NULL,'/img/index/wxcasel03.jpg'),
(NULL,'/img/index/wxcasel04.jpg');

#小程序排行导航(上)
CREATE TABLE vt_wx_rankTopNav(
	nid INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(8)
);
INSERT INTO vt_wx_rankTopNav VALUES
(NULL,'出版'),
(NULL,'经典'),
(NULL,'国外'),
(NULL,'男生'),
(NULL,'女生');

#小程序排行导航(左)
CREATE TABLE vt_wx_rankLeftNav(
	nid INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(8)	
);
INSERT INTO vt_wx_rankLeftNav VALUES
(NULL,'畅销榜'),
(NULL,'新书榜'),
(NULL,'推荐榜');

#创建书籍表
CREATE TABLE vt_books(
	bid INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(32),
	author VARCHAR(16),    #作者
	label VARCHAR(32),     #类型
	words DECIMAL(5,1),    #字数/万
	price SMALLINT,        #价格(单位:书币)
	watch INT,             #观看人数
	pic VARCHAR(128),      #图片路径
	intro VARCHAR(1024),   #书籍介绍
	catalogs TEXT,         #书籍目录 
	texts TEXT             #书籍正文
);
INSERT INTO vt_books VALUES
(NULL,'活着','余华','经典@文学@VIP','9.6','880','30154','/img/book/hz.jpg','20世纪中国文学当之无愧的经典之作，已被译介至30多个国家和地区，获得国内外多个文学大奖，如意大利格林扎纳·卡佛文学奖（1998年）、台湾《中国时报》10本好书奖（1994年）、香港“博益”15本好书奖（1994年）、第三届世界华文“冰心文学奖”（2002年），入选香港《亚洲周刊》评选的“20世纪中文小说百年百强”、中国百位批评家和文学编辑评选的“20世纪90年代最有影响的10部作品”。余华的每一部长篇小说，都震撼着一批又一批的读者。他的长篇小说是中国当代文学中的经典之作。《活着》是一部充满血泪的小说。余华通过一位中国农民的苦难生活讲述了人如何去承受巨大的苦难；讲述了眼泪的丰富和宽广；讲述了绝望的不存在：讲述了人是为了活着本身而活着……《活着》讲述了农村人福贵悲惨的人生遭遇。福贵本是个阔少爷，可他嗜赌如命，终于赌光了家业，一贫如洗。他的父亲被他活活气死，母亲则在穷困中患了重病，福贵前去求药，却在途中被国民党抓去当壮丁。经过几番波折回到家里，才知道母亲早已去世，妻子家珍含辛茹苦地养大两个儿女。此后更加悲惨的命运一次又一次降临到福贵身上，他的妻子、儿女和孙子相继死去，最后只剩福贵和一头老牛相依为命，但老人依旧活着，仿佛比往日更加洒脱与坚强。','第1章@第2章@第3章@第4章@第5章@第6章@第7章@第8章@第9章@第10章','敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!'),
(NULL,'成功的失败者：张学良传','王充闾','出版@传记@免费','19.3','350','156','../img/book/cgdsbz.jpg','本书以张学良与父亲张作霖、前妻于凤至、妻子赵一荻等三个亲人，周恩来、郭松龄、宋美龄、蒋士云等四个朋友以及蒋介石、溥仪这两个当事人交往的故事为线索，梳理出其荣辱交叠、波澜起伏的人生经历，展现其复杂的性格，并对他在“九·一八”事变、西安事变等事件中的行为和心态做出精辟深邃的辨析。','第1章 人之初@第2章 一代枭雄@第3章 “大姐”风范@第4章 尴尬的四重奏@第5章 只有为了爱@第6章 两股道上跑的车@第7章 九·一八，九·一八@第8章 猛回头@第9章 别样恩仇@第10章 道义之交@第11章 “良”言“美”语@第12章 史里觅道@第13章 将军本色是诗人@第14章 庆生辰@第15章 情注梨园@第16章 夕阳山外山@第17章 鹤有还巢梦@第18章 “长寿经”@第19章 人生几度秋凉@第20章 成功的失败者@后记','“四大怪” 我的家乡——辽宁省盘山县大荒村，水土丰美，地广人稀，民众生活并不特别穷困，但它由于处在几县接壤地带，属于“三不管”地区，开发得晚，成为名副其实的荒乡僻壤。这里，历史上没有出过什么大人物，要说有，就数张学良了。他的出生地，与我的故里相距只有十五公里。所以，当地人关于他的传闻可说是“海海的”，信息量比较大。 这一带，当时流行着这样一个顺口溜，名曰“四大怪”：“白天青纱帐，晚上撸锄杠；老少三辈对面炕；偷个‘鸡鸡’怀里放；孩子生在大车上。”头一句说的是，兵荒马乱，土匪横行，老百姓白天躲进高粱棵里，晚上再回家莳弄园田。第二句，是讲当地的居住习惯：为了冬天屋里暖和，许多人家都搭南北对面炕，小两口住北面，老两口住南面；有的讲究一点，中间挂个幔幛。第三句，反映一种可笑的民俗：镇里有座娘娘庙，每逢四月十八“娘娘庙会”，大姑娘、小媳妇街头云集，看人、看戏、看热闹；而那些结了婚的少妇，还有一个共同愿望，就是给“子孙娘娘”上香，“拜佛求子”。到了这里，她们都不再羞涩，变得比较开放，烧香磕头之后，一般都会弯下身去，用手摸摸娘娘脚下泥塑男孩的“小鸡鸡”，有的大胆些，趁势把它偷偷揪下、塞进怀里，带回家去泡水喝——传说这样就会生下男孩。人家远道前来，就是奔着求个儿子；可是，小男孩却把“宝贝儿”丢了，成了“没把的茶壶”，这怎么行！管香火的庙祝只好事先准备很多“配件”，偷走了再安上。最后一句，特指张学良，说他的出生，不在炕头，不在床上，而是“落草”在大马车上，这也算是今古奇闻。 对此，张学良本人是这样说的： 我，实际上不是在地上降生的，我是在车上生的。你看，我的头上都有疤。我们那时正在逃难嘛，我母亲生我在车上。 张作霖于光绪二十七年（1901年）二月十八日，遭到辽西巨匪金寿山的突然袭击，狼狈逃窜，率领保险队来到八角台——就是后来的台安县城。所谓“保险队”，还不同于打家劫舍的土匪，而是负责给这个或那个村庄做保险，每月你交付一笔钱，如果有土匪来袭，他们就出面保护，替村里拦截土匪。张作霖就是这么起来的。他从小就在附近的七乡三镇活动，这一带又是他的亲戚窝——他的妻子赵春桂就迎娶自这里。当时正值祸乱丛生，烽烟四起，为了逃难，居无定所又身怀六甲的赵春桂，在旧历四月十七（公历6月4日）这天，带着大女儿首芳，乘坐马车，从桑林子村胡家窝堡赶往张家窝堡她的堂侄赵明德家。路程本不算远，但由于乡村道路坑洼不平，剧烈颠簸，结果孩子生在了马车上。 这个孩子就是张学良。他的生日原本是6月4日，但是，因为后来张作霖在“皇姑屯事件”中，被日本人炸死在这一天，成了父亲的忌日，张学良便把自己的生日改在6月3日了。 张作霖听说生了个儿子，自是万分兴奋，而他的保险队重新拥有了二百多号人马，他还当上了团练长，升官又生子，他说这是“双喜临门”，因而给儿子起名为“双喜”。 那么，桑林子村张家窝堡就成了张学良的出生地。他在五岁之前，一直住在亲戚赵明德家。资料记载，当时赵家分为三个院落，主人住东院和腰院；赵春桂带着女儿、儿子住在西院，当时叫西园子。据年已九十的赵老太太（当年的亲历者、邻家的女儿）说： 我是光绪二十八年出生的，比少帅小一岁。我们两家中间只隔一道小矮墙，因为都沾亲带故，两家走得很近。小时候，我们总在一起玩，玩饿了就在一起吃饭，吃鸡蛋，他总是让我吃蛋清。从小，他就特别聪明伶俐，脑袋瓜好使，人小，心眼儿可不小，用当地的话说，叫做“有道眼”“鬼”“心里有沫”，人们都叫他“小嘎子”。四五岁时，我们在一起玩“扯拉拉狗”（现在叫“老鹰抓小鸡”），他在最后头，怎么也抓不着他；他去抓别人，常常是假装动一下，你一闪，他就一把把你扯住。小小子（指男孩）在一起“打瓦”（认定一个目标，离开一丈多远，抛掷用石片制成的圆砣，看谁打得准），每次他都扔得很准。还有一种玩法，每个小孩手拿一堆高粱秸秆，都是筷子那么长的，用嘴数数，一、二、三、四、五，谁数得快、数得准，就扔出一根，他脑袋瓜灵，总是他赢；大伙起哄，说他做假了，罚他多拿几根，那也不行，还是他赢。还一块去抓蚂蚱、抓蛤蟆，他更是能手，人小会算计，脚步轻轻的，眼睛尖，手法灵，每次都是他抓得多。我比他小，又是小丫头，心又死，手又笨，个头也小，总是两手空空，气得抹眼泪。他哈哈一笑，像个大将似的，哄着我：“别哭，别哭，看大哥来给你抓。”这样，再出去，我就不下手了，只是帮他拿那些抓住的。他像个威武的将军，扛着竹竿，摇摇晃晃，走在前面，我就跟在他的身后，像个大老板的“跟包的”。 双喜出生以后，就没有赶上好年成，农村条件很差，母子三人整天以高粱粥、糠饼子、苣麻菜充饥，奶汁缺乏，双喜靠着母亲为他嚼的“奶布子”活下来，饿得皮包骨头。少帅晚年回忆说： 我小时候总有病，身体很不好，还吐过血，我能活下来，自己才叫感到奇怪。那时母亲也有病，没有奶给我吃，吃什么呢？就是把高粱米饭嚼碎了，成糊糊状，用来喂我。我没想到，我还能活到这么大的岁数！@@少帅眼中的老帅 旧时代有两句流传很广的俗话，叫做“打虎亲兄弟，上阵父子兵”，后来被收进童蒙读本《增广贤文》里，成了家喻户晓的格言。 说到“上阵父子兵”，人们会立刻想到三国时孙坚、孙权父子，当时还留下一句“生子当如孙仲谋”的佳话。唐朝开国的李渊、李世民父子，也是赫赫有名的；到了宋朝，就是“杨家将”——老令公和他的“七狼八虎”的儿郎了。那么，现代有没有呢？当然有，最著名的，一个是江南的蒋家父子，一个是东北的张家父子。 关于张作霖、张学良父子，海外著名学者唐德刚有过这样一段话： 在上世纪初年，他（张学良）本是一位旧军阀的纨绔子弟，吃喝玩乐，挥金如土。这本是清末民初那个荒唐时代所有高干子弟的共同现象。只是张学良这位公子哥儿更会花钱、更会玩乐罢了。因为在民初的“四大公子”中，他的本钱最雄厚。 可是，一旦过了青春期而及于成熟期，他的生活便有了两面性。一方面，他仍然是个旧式军阀的儿子，吃喝玩乐，未改其公子哥儿的本性；但另一方面，他已能随时代进步，成为旧军阀集团内部的青年改革派的领导者。……当“张大帅”那个“行伍”集团搞不下去了的时候，继之而起的改革派首领，却是他自己的儿子，所以，它能够自我进化，不断延续下去……@@迟到的“会晤” 对张学良来说，他已经实现了“红尘觉悟”，百年风霜历尽，万事秋风过耳，一切都付之旷怀达观，因此，有“平生无憾事”的说法。其实，根本不是这么一回事。他自己比谁都清楚，哪里是“无憾事”，而是憾恨多多呀！甚至可以说，多到“恒河沙数”，难以计筹的程度。那些“重头戏”不去说了，只拣在他的百年生涯中一件说大未必大、说小绝非小的情感方面的缺憾来讲。 1991年，张学良专程赴美探亲。依照常理，他的结发妻子于凤至，尽管二十几年前解除了婚约，但彼此间的情感并未斩断，所以，所探之亲中应该列在首位。可是，令人憾恨的是，竟然来晚了一步，她已经提前走了。她隔海相望了整整半个世纪，“望穿了盈盈秋水，蹙损了淡淡春山”，苦苦地等啊，等啊，最后实在撑持不下去了，不得不颓然倒下，怅憾先行。晚到的责任，当然不能记在张老先生身上。古人说“戴盆难以望天”，铁窗生涯中他身不由己呀！ 从张学良研究专家窦应泰所著《张学良在美国》一书中得知，抵美之后，老先生曾在他和于凤至的女儿闾瑛的陪同下，乘飞机从旧金山前往洛杉矶，然后，驱车直奔风景秀丽的好莱坞山。女儿搀扶着他，看了山顶上那幢掩映在苍松翠柏间的风格独特的米黄色建筑，里面陈设的一桌一椅，每一件都是严格按照女主人和张学良在东北的家的样式摆放的。女儿说，这是母亲十二年前以巨金买下来的别墅，她希望有朝一日，夫妻能够共同在这里安度晚年。听到这里，老先生神色黯然，低下了头。他在想什么？是忆念？是愧疚？我们无从得知。他在静夜无眠之时，是否也曾追忆过凤至“大姐”那颀长、窈窕的身影？因而也说不清楚此刻他的心里究竟是什么滋味。只听老将军以喑哑的声音，催促着迅速前往城外的树林草地墓园，说要尽快地赶往久违了的凤至大姐的身旁。 汽车沿着山麓飞速地前行，穿过了郁郁葱葱的雪杉、红松林，不远处，就见到了这处墓地。小小的一个方块，有矮矮的石墙围着，墓前竖立着一尊白色大理石女神雕像，墓碑用英文刻着“凤至张？摇1899—1990”一行字。就是说，她仍然自认是张将军的结发妻子。而最令人伤情、令人感动的，是在她的墓旁还有一块墓地，说是留给丈夫张学良的。谁知竟然成了空空的等待！ 老先生此刻满怀伤感地肃立在墓前，微闭着双眼，声音低沉地叨念着：“大姐，你去得太匆忙了。你若再等一等，我们就能见面了。”是呀，他清楚地记得，“大姐”离开人间的那天，是上年3月20日，再过几天，就整整一年了。@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待'),
(NULL,'创新的洞见','虎嗅','出版@管理@免费','29.4','259','479','/img/book/cxddj.jpg','虎嗅2015精选集。作为领先的科技创新媒体及交流平台，虎嗅网365天不停歇地在追踪趋势、讨论方法与得失。它发布的文章的角度与深度，令这个平台独特。这本书是从它2015年近万篇文章中精心选择出来的代表作品，它们成功超越了时间施加在新闻上的速朽效应。希望读者能从这些看似乎零星散落的篇章里感知创新的去处、未来的风口。','第1章 人之初@第2章 一代枭雄@第3章 “大姐”风范@第4章 尴尬的四重奏@第5章 只有为了爱@第6章 两股道上跑的车@第7章 九·一八，九·一八@第8章 猛回头@第9章 别样恩仇@第10章 道义之交@第11章 “良”言“美”语@第12章 史里觅道@第13章 将军本色是诗人@第14章 庆生辰@第15章 情注梨园@第16章 夕阳山外山@第17章 鹤有还巢梦@第18章 “长寿经”@第19章 人生几度秋凉@第20章 成功的失败者@后记','“四大怪” 我的家乡——辽宁省盘山县大荒村，水土丰美，地广人稀，民众生活并不特别穷困，但它由于处在几县接壤地带，属于“三不管”地区，开发得晚，成为名副其实的荒乡僻壤。这里，历史上没有出过什么大人物，要说有，就数张学良了。他的出生地，与我的故里相距只有十五公里。所以，当地人关于他的传闻可说是“海海的”，信息量比较大。 这一带，当时流行着这样一个顺口溜，名曰“四大怪”：“白天青纱帐，晚上撸锄杠；老少三辈对面炕；偷个‘鸡鸡’怀里放；孩子生在大车上。”头一句说的是，兵荒马乱，土匪横行，老百姓白天躲进高粱棵里，晚上再回家莳弄园田。第二句，是讲当地的居住习惯：为了冬天屋里暖和，许多人家都搭南北对面炕，小两口住北面，老两口住南面；有的讲究一点，中间挂个幔幛。第三句，反映一种可笑的民俗：镇里有座娘娘庙，每逢四月十八“娘娘庙会”，大姑娘、小媳妇街头云集，看人、看戏、看热闹；而那些结了婚的少妇，还有一个共同愿望，就是给“子孙娘娘”上香，“拜佛求子”。到了这里，她们都不再羞涩，变得比较开放，烧香磕头之后，一般都会弯下身去，用手摸摸娘娘脚下泥塑男孩的“小鸡鸡”，有的大胆些，趁势把它偷偷揪下、塞进怀里，带回家去泡水喝——传说这样就会生下男孩。人家远道前来，就是奔着求个儿子；可是，小男孩却把“宝贝儿”丢了，成了“没把的茶壶”，这怎么行！管香火的庙祝只好事先准备很多“配件”，偷走了再安上。最后一句，特指张学良，说他的出生，不在炕头，不在床上，而是“落草”在大马车上，这也算是今古奇闻。 对此，张学良本人是这样说的： 我，实际上不是在地上降生的，我是在车上生的。你看，我的头上都有疤。我们那时正在逃难嘛，我母亲生我在车上。 张作霖于光绪二十七年（1901年）二月十八日，遭到辽西巨匪金寿山的突然袭击，狼狈逃窜，率领保险队来到八角台——就是后来的台安县城。所谓“保险队”，还不同于打家劫舍的土匪，而是负责给这个或那个村庄做保险，每月你交付一笔钱，如果有土匪来袭，他们就出面保护，替村里拦截土匪。张作霖就是这么起来的。他从小就在附近的七乡三镇活动，这一带又是他的亲戚窝——他的妻子赵春桂就迎娶自这里。当时正值祸乱丛生，烽烟四起，为了逃难，居无定所又身怀六甲的赵春桂，在旧历四月十七（公历6月4日）这天，带着大女儿首芳，乘坐马车，从桑林子村胡家窝堡赶往张家窝堡她的堂侄赵明德家。路程本不算远，但由于乡村道路坑洼不平，剧烈颠簸，结果孩子生在了马车上。 这个孩子就是张学良。他的生日原本是6月4日，但是，因为后来张作霖在“皇姑屯事件”中，被日本人炸死在这一天，成了父亲的忌日，张学良便把自己的生日改在6月3日了。 张作霖听说生了个儿子，自是万分兴奋，而他的保险队重新拥有了二百多号人马，他还当上了团练长，升官又生子，他说这是“双喜临门”，因而给儿子起名为“双喜”。 那么，桑林子村张家窝堡就成了张学良的出生地。他在五岁之前，一直住在亲戚赵明德家。资料记载，当时赵家分为三个院落，主人住东院和腰院；赵春桂带着女儿、儿子住在西院，当时叫西园子。据年已九十的赵老太太（当年的亲历者、邻家的女儿）说： 我是光绪二十八年出生的，比少帅小一岁。我们两家中间只隔一道小矮墙，因为都沾亲带故，两家走得很近。小时候，我们总在一起玩，玩饿了就在一起吃饭，吃鸡蛋，他总是让我吃蛋清。从小，他就特别聪明伶俐，脑袋瓜好使，人小，心眼儿可不小，用当地的话说，叫做“有道眼”“鬼”“心里有沫”，人们都叫他“小嘎子”。四五岁时，我们在一起玩“扯拉拉狗”（现在叫“老鹰抓小鸡”），他在最后头，怎么也抓不着他；他去抓别人，常常是假装动一下，你一闪，他就一把把你扯住。小小子（指男孩）在一起“打瓦”（认定一个目标，离开一丈多远，抛掷用石片制成的圆砣，看谁打得准），每次他都扔得很准。还有一种玩法，每个小孩手拿一堆高粱秸秆，都是筷子那么长的，用嘴数数，一、二、三、四、五，谁数得快、数得准，就扔出一根，他脑袋瓜灵，总是他赢；大伙起哄，说他做假了，罚他多拿几根，那也不行，还是他赢。还一块去抓蚂蚱、抓蛤蟆，他更是能手，人小会算计，脚步轻轻的，眼睛尖，手法灵，每次都是他抓得多。我比他小，又是小丫头，心又死，手又笨，个头也小，总是两手空空，气得抹眼泪。他哈哈一笑，像个大将似的，哄着我：“别哭，别哭，看大哥来给你抓。”这样，再出去，我就不下手了，只是帮他拿那些抓住的。他像个威武的将军，扛着竹竿，摇摇晃晃，走在前面，我就跟在他的身后，像个大老板的“跟包的”。 双喜出生以后，就没有赶上好年成，农村条件很差，母子三人整天以高粱粥、糠饼子、苣麻菜充饥，奶汁缺乏，双喜靠着母亲为他嚼的“奶布子”活下来，饿得皮包骨头。少帅晚年回忆说： 我小时候总有病，身体很不好，还吐过血，我能活下来，自己才叫感到奇怪。那时母亲也有病，没有奶给我吃，吃什么呢？就是把高粱米饭嚼碎了，成糊糊状，用来喂我。我没想到，我还能活到这么大的岁数！@@少帅眼中的老帅 旧时代有两句流传很广的俗话，叫做“打虎亲兄弟，上阵父子兵”，后来被收进童蒙读本《增广贤文》里，成了家喻户晓的格言。 说到“上阵父子兵”，人们会立刻想到三国时孙坚、孙权父子，当时还留下一句“生子当如孙仲谋”的佳话。唐朝开国的李渊、李世民父子，也是赫赫有名的；到了宋朝，就是“杨家将”——老令公和他的“七狼八虎”的儿郎了。那么，现代有没有呢？当然有，最著名的，一个是江南的蒋家父子，一个是东北的张家父子。 关于张作霖、张学良父子，海外著名学者唐德刚有过这样一段话： @@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待@@敬请期待!'),
(NULL,'民国大师文库：中国绘画史','陈师曾','出版@绘画@特价','15.8','660','85','/img/book/zghhs.jpg','先生悲绘事之沦涣，忧师承之不明，因述《中国绘画史》一书，以明授受之渊源。顾颇自谦抑，自谓短篇小册，半爪一麟，不能博引旁证，搜求宏富。然识者论之，则谓纲领所在，已提挈无疑；始于伏羲记数而画卦，苍颉造字以象形，且对历代绘事之盛衰，各朝之沿革，画家之派别，绘事之本末，无不详为胪述，诚为后学之先导，问道之津梁也。——苏吉亨','第1章@第2章@第3章@第4章@第5章@第6章@第7章@第8章@第9章@第10章','敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待'),
(NULL,'小书馆：曾国潘治学方法','胡哲敷','出版@教育@免费','8.2','530','234','/img/book/zgpzxff.jpg','本书为“小书馆”丛书之一，绝版多年。这是一部民国人对曾国藩的解读，曾国藩女儿曾纪芬推崇备至，亲自作序推荐。它堪称一部精神的冶炼志，有关人生的各个方面，居官、同僚、子女、养生、读书、观人、器量、骄奢、淡泊、挫辱、坚忍，自省、笃实……在民国史家凝重的笔触下，对一个普通读书人变成巍峨君子的精神冶炼历程，给与了淋漓尽致的、有震撼力的叙述。','第1章@第2章@第3章@第4章@第5章@第6章@第7章@第8章@第9章@第10章','敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待'),
(NULL,'黄帝内经','国学书院编委会','出版@国学@特价','20.7','299','18','/img/book/hdnj.jpg','对于我们每一个人来说，健康才是最宝贵的财富。所以人类从古至今都在不断探索着强身健体之道。中国是人类医药文化最早的发祥地之一，迥异于西方医学的中医药学更是一个庞大的体系，成为中国一项宝贵的文化遗产。中医药学内容博大精深，历史源远流长，作为国学文化的一个重要组成部分，智慧的先人们更是为我们留下了无数经典著作。黄帝内经即是一本老祖宗留下来的经典中的经典。','第1章@第2章@第3章@第4章@第5章@第6章@第7章@第8章@第9章@第10章','敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待'),
(NULL,'边城','沈从文','经典@文学@VIP','9.2','198','14897','/img/book/bc.jpg','《边城》是沈从文的代表作，入选20世纪中文小说100强，排名第二位，仅次于鲁迅的《呐喊》。它以20世纪30年代川湘交界的边城小镇茶峒为背景，以兼具抒情诗和小品文的优美笔触，描绘了湘西地区特有的风土人情；借船家少女翠翠的纯爱故事，展现出了人性的善良美好。由于《边城》的美学艺术，《边城》这部小说在中国近代文学史上具有独特的地位。','第1章@第2章@第3章@第4章@第5章@第6章@第7章@第8章@第9章@第10章','敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待'),
(NULL,'列奥纳多·达·芬奇传','沃尔特·艾萨克森','国外@传记@特价','29.1','1899','55','/img/book/dfqlz.jpg','《史蒂夫·乔布斯传》作者沃尔特·艾萨克森，以列奥纳多·达·芬奇令人震惊的7200页笔记，以及关于他的生平和作品的新发现为基础，用电影般的叙事娓娓道来。他剥去尸体面部的皮肉，绘制嘴唇运动的肌肉，然后在《蒙娜丽莎》的脸上画出了历史上令人难忘的笑容；他探索光学的数学原理，阐明光线如何照射在视网膜上，然后制造出了《最后的晚餐》中视觉变换的错觉，他毕生对舞台演出的热爱也促进了绘画和发明创造。他的人生提醒我们：无论是我们自己，还是我们的孩子，都不应止于吸收知识，更要去质疑，要充满想象力，敢于不同凡“想”，就像任何时代的“异类”天才和创新者一样。','第1章@第2章@第3章@第4章@第5章@第6章@第7章@第8章@第9章@第10章','敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待'),
(NULL,'傅雷家书','沃尔特·艾萨克森','经典@文学@VIP','40.6','399','781','/img/book/fljs.jpg','本书与三联旧版《傅雷家书》一脉相承，是傅敏先生对这部当代经典的最新修订，以傅雷夫妇为主线，傅聪信以附录形式收入。编排上针对层次较高的读者，更重视傅雷家书的思想性和丰富性，对傅家父子之间关于音乐、文学等艺术，为人处世的人生哲学，以及对文学艺术名家的讨论等都尽量忠实收录，是更厚重、更原汁原味的傅雷家书。','第1章@第2章@第3章@第4章@第5章@第6章@第7章@第8章@第9章@第10章','敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待'),
(NULL,'Harry Potter： The Complete Collection','J.K.Rowling','国外@外文@VIP','263.6','3999','98','/img/book/harrypotter.jpg',"There is a plot, Harry Potter. A plot to make most terrible things happen at Hogwarts School of Witchcraft and Wizardry this year.' Harry Potter's summer has included the worst birthday ever, doomy warnings from a house-elf called Dobby, and rescue from the Dursleys by his friend Ron Weasley in a magical flying car! Back at Hogwarts School of Witchcraft and Wizardry for his second year, Harry hears strange whispers echo through empty corridors - and then the attacks start. Students are found as though turned to stone... Dobby's sinister predictions seem to be coming true. ",'第1章@第2章@第3章@第4章@第5章@第6章@第7章@第8章@第9章@第10章','敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待'),
(NULL,'易中天中华史：朱明王朝','易中天','出版@历史@特价','6.3','399','8','/img/book/yztzhs.jpg','朱元璋称帝没多久，就掀翻了传统政治的桌子，通过一系列组合拳，重建了帝国的制度，改变了中华的航向。朱棣从侄子手中篡取皇位，并将国都迁往边地北京，他的制度设计，更是奠定了整个明朝的个性和特色。朱明王朝，是彻头彻尾的朱姓王朝：皇帝们恣意任性；大臣们沦为家奴；文字狱和太监擅权层出不穷；锦衣卫和东西厂无孔不入。而在皇权的边缘，江南富庶，人物风流。繁华的城镇里经济活跃，并催生了多样而新颖的市井文化。从庙堂到江湖，大明精彩。学者易中天，颠覆传统史学著作的写作方法，以优美诗意的语言、独特创新的全球视角，将用五年时间写作六部共三十二卷巨著《易中天中华史》：第一部《先秦》，第二部《秦汉魏晋南北朝》，第三部《隋唐》，第四部《宋元》，第五部《明清》，第六部《近现代》，现已出版前二十一卷。跟随《易中天中华史》，我们将进行一场历史寻根之旅，体验夏的质朴、商的绚烂、周的儒雅、汉的强悍、唐的四海为家八方来朝，品味宋的纤细、元的空灵，直至明的世俗，清的官腔。由此解开诸多历史的疑惑：夏商周是王朝吗？先秦诸子都是谁？魏晋风度长什么样？盛唐之音你听见过吗？当旅程结束时，我们或将明白：什么是中华根、中华梦、中华魂。','第1章@第2章@第3章@第4章@第5章@第6章@第7章@第8章@第9章@第10章','敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待'),
(NULL,'知否？知否？应是绿肥红瘦','关心则乱','出版@言情@VIP','140.8','2099','576','/img/book/zfzf.jpg','历经艰险，在好几次死里逃生之后，姚依依终于在顾府站稳脚跟，顾侯夫人的名声响彻内帷。眼见着夫妻和睦，小日子蒸蒸日上，眼红的自然也多了。不仅家里的几个姨娘丫鬟不安分，就连朝堂上也风云诡谲，动荡不安。内忧外患之际，怀孕艰险之时，偏偏顾廷烨又要出公差，还一走就是好几天，姚依依很是头疼，这次可别再出什么事了。但是很显然，她的担心不是多余的，一双双看不见的手，正在暗处布满阴毒的陷阱，等着她跳下……本书是《应是绿肥红瘦》的出版版本。','第1章@第2章@第3章@第4章@第5章@第6章@第7章@第8章@第9章@第10章','敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待'),
(NULL,'流浪地球','刘慈欣','出版@科幻@VIP','2.3','699','294','/img/book/lldq.jpg','50亿年的壮丽生涯已成为飘逝的梦幻，太阳死了。幸运的是，还有人活着。地球航出了冥王星轨道，航出了太阳系，在寒冷广漠的外太空继续着它孤独的航程。地球在航行2400年后到达比邻星，再过100年时间，它将泊入这颗恒星的轨道，成为它的一颗卫星。','第1章@第2章@第3章@第4章@第5章@第6章@第7章@第8章@第9章@第10章','敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待'),
(NULL,'掌控谈话','克里斯·沃斯 塔尔·拉兹','国外@社科@免费','14.5','699','0','/img/book/zkth.jpg','国际危机谈判专家、谈判领域少有的“特种兵”克里斯·沃斯全面总结了20余年的实战经验。他将从生死一线的实际案例中总结出的谈话技巧和策略倾囊相授：从战胜哈佛大学教授的10条谈话技巧，到浓缩到1页纸的精华版谈话清单，都在这本书中。学会这些策略和技巧，你可以掌握谈话的主动权。本书实现了从实践到理论再到实践的两次飞跃。从生死一线的实战谈判入手，引出掌控谈话的策略和技巧，*终又落实到每个人日常生活中的真实场景。说服前领导同意调岗、让老板心甘情愿为你加薪、以什么都不用做的方式拿到*价格……生活本身就是一场又一场谈话，需要我们全力以赴。本书的谈话技巧定能祝你成功，作者克里斯·沃斯创造出任何时刻都有效的语言模式。掌控谈话，才能掌控人生。没看这本书之前，千万别开口！','第1章@第2章@第3章@第4章@第5章@第6章@第7章@第8章@第9章@第10章','敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待'),
(NULL,'异海','蛇从革','出版@推理@免费','18','198','20','/img/book/yh.jpg','20世纪80年代，一个在对越自卫反击战中立下战功的军人吴XX接到国家指派的神秘任务：化名曹沧，参与一个中美合作的物理实验。这个实验的目的是尝试进入另外一个空间——异海。随着中美联合实验在诡秘异海的展开，一系列离奇惊险的状况不断发生，很多神秘事件的谜团也慢慢浮出水面：疍族的“水路簿”、神秘的百慕大三角、西汉黄金的消失、罗布泊实验、大西洋科考、星球大战计划、末日黎明计划、费城实验……曹沧逐渐发现此次联合实验的目的是为了在异海建立新的世界秩序。而此时，前苏联也派遣了核潜艇尾随中美联合科考队进入了异海。三国的科考人员，面对诡异的异海，不得不选择合作，却又各怀心事，暗中谋取其所属国家的最大利益。当三个国家的科考人员渐渐产生友谊，准备共同完成实验的时候，他们却震惊地发现，已经有人先行一步……','第1章@第2章@第3章@第4章@第5章@第6章@第7章@第8章@第9章@第10章','敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待'),
(NULL,'权力巅峰的女人','蒋胜男','出版@政治@特价','12.8','60','69','/img/book/qldfdnr.jpg','20世纪80年代，一个在对越自卫反击战中立下战功的军人吴XX接到国家指派的神秘任务：化名曹沧，参与一个中美合作的物理实验。这个实验的目的是尝试进入另外一个空间——异海。随着中美联合实验在诡秘异海的展开，一系列离奇惊险的状况不断发生，很多神秘事件的谜团也慢慢浮出水面：疍族的“水路簿”、神秘的百慕大三角、西汉黄金的消失、罗布泊实验、大西洋科考、星球大战计划、末日黎明计划、费城实验……曹沧逐渐发现此次联合实验的目的是为了在异海建立新的世界秩序。而此时，前苏联也派遣了核潜艇尾随中美联合科考队进入了异海。三国的科考人员，面对诡异的异海，不得不选择合作，却又各怀心事，暗中谋取其所属国家的最大利益。当三个国家的科考人员渐渐产生友谊，准备共同完成实验的时候，他们却震惊地发现，已经有人先行一步……','第1章@第2章@第3章@第4章@第5章@第6章@第7章@第8章@第9章@第10章','敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待'),
(NULL,'大雪无痕','陆天明','出版@都市@免费','30.8','699','3','/img/book/dxwh.jpg','20世纪80年代，一个在对越自卫反击战中立下战功的军人吴XX接到国家指派的神秘任务：化名曹沧，参与一个中美合作的物理实验。这个实验的目的是尝试进入另外一个空间——异海。随着中美联合实验在诡秘异海的展开，一系列离奇惊险的状况不断发生，很多神秘事件的谜团也慢慢浮出水面：疍族的“水路簿”、神秘的百慕大三角、西汉黄金的消失、罗布泊实验、大西洋科考、星球大战计划、末日黎明计划、费城实验……曹沧逐渐发现此次联合实验的目的是为了在异海建立新的世界秩序。而此时，前苏联也派遣了核潜艇尾随中美联合科考队进入了异海。三国的科考人员，面对诡异的异海，不得不选择合作，却又各怀心事，暗中谋取其所属国家的最大利益。当三个国家的科考人员渐渐产生友谊，准备共同完成实验的时候，他们却震惊地发现，已经有人先行一步……','第1章@第2章@第3章@第4章@第5章@第6章@第7章@第8章@第9章@第10章','敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待'),
(NULL,'宇宙超度指南','李诞','出版@科幻@特价','6.8','899','0','/img/book/yzcdzn.jpg','20世纪80年代，一个在对越自卫反击战中立下战功的军人吴XX接到国家指派的神秘任务：化名曹沧，参与一个中美合作的物理实验。这个实验的目的是尝试进入另外一个空间——异海。随着中美联合实验在诡秘异海的展开，一系列离奇惊险的状况不断发生，很多神秘事件的谜团也慢慢浮出水面：疍族的“水路簿”、神秘的百慕大三角、西汉黄金的消失、罗布泊实验、大西洋科考、星球大战计划、末日黎明计划、费城实验……曹沧逐渐发现此次联合实验的目的是为了在异海建立新的世界秩序。而此时，前苏联也派遣了核潜艇尾随中美联合科考队进入了异海。三国的科考人员，面对诡异的异海，不得不选择合作，却又各怀心事，暗中谋取其所属国家的最大利益。当三个国家的科考人员渐渐产生友谊，准备共同完成实验的时候，他们却震惊地发现，已经有人先行一步……','第1章@第2章@第3章@第4章@第5章@第6章@第7章@第8章@第9章@第10章','敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待'),
(NULL,'圈子不同，不必强融','张超','出版@社科@特价','14.3','999','11','/img/book/qzbtbbqr.jpg','20世纪80年代，一个在对越自卫反击战中立下战功的军人吴XX接到国家指派的神秘任务：化名曹沧，参与一个中美合作的物理实验。这个实验的目的是尝试进入另外一个空间——异海。随着中美联合实验在诡秘异海的展开，一系列离奇惊险的状况不断发生，很多神秘事件的谜团也慢慢浮出水面：疍族的“水路簿”、神秘的百慕大三角、西汉黄金的消失、罗布泊实验、大西洋科考、星球大战计划、末日黎明计划、费城实验……曹沧逐渐发现此次联合实验的目的是为了在异海建立新的世界秩序。而此时，前苏联也派遣了核潜艇尾随中美联合科考队进入了异海。三国的科考人员，面对诡异的异海，不得不选择合作，却又各怀心事，暗中谋取其所属国家的最大利益。当三个国家的科考人员渐渐产生友谊，准备共同完成实验的时候，他们却震惊地发现，已经有人先行一步……','第1章@第2章@第3章@第4章@第5章@第6章@第7章@第8章@第9章@第10章','敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待!@@敬请期待');