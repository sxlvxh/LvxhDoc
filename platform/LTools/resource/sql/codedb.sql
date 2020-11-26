/*
SQLyog 企业版 - MySQL GUI v8.14 
MySQL - 5.6.12 : Database - codedb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `t_model_sql` */

DROP TABLE IF EXISTS `t_model_sql`;

CREATE TABLE `t_model_sql` (
  `id` varchar(64) NOT NULL,
  `comment` varchar(64) DEFAULT NULL,
  `class_name` varchar(32) DEFAULT NULL,
  `name` varchar(32) DEFAULT NULL,
  `str_sql` text,
  `model_id` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `t_model_sql` */

insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('06f56ed7-d874-4903-9a97-bb8397253f08','查询用户菜单','PlatUserRoleMenu','plat_user_role_menu','SELECT\n  D.*,\n  A.USER_CODE,\n  C.PRODUCT_CODE\nFROM PLAT_USER_ROLE A,\n  PLAT_ROLE_MENU B,\n  PLAT_MODEL_PRO C,\n  PLAT_MENU D\nWHERE A.ROLE_ID = B.ROLE_ID\n    AND B.MENU_CODE = D.MENU_CODE\n    AND D.MODEL_CODE = C.MODEL_CODE','plat');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('0a6355ec-35eb-4564-8b58-9d72b13b6ade','庭审公告','SchedulingList','scheduling_list','SELECT\n  A.*,\n  B.COURT_NAME,\n  C.THIRD_PLACE,\n  E.DATA_NAME   AS SCH_STATUS_NAME,\n  D.DATA_NAME   AS IS_PUBLIC_NAME,\n  \'\'            AS COURT_QUERY,\n  \'\'            AS ROOM_QUERY\nFROM CHC_COURT_SCHEDULING A\n  LEFT JOIN CONF_COURT B\n    ON A.COURT_CODE = B.COURT_CODE\n  LEFT JOIN CHC_COURT_ROOM C\n    ON A.TRIBUNAL_CODE = C.TRIAL_ID\n  LEFT JOIN CONF_DICTIONARIES D\n    ON D.GROUP_ID = \'ISPUBLIC\'\n      AND D.DATA_ID = A.ISPUBLIC\n  LEFT JOIN CONF_DICTIONARIES E\n    ON E.GROUP_ID = \'COURT_STATUS\'\n      AND E.DATA_ID = A.STATUS','chc');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('0c2c5d7f-4aa8-4dd8-9953-604254010fff','回收员统计','RecyclerReport','recycler_report','SELECT\n  CONF_USER.NAME,\n  D.INCREASED,\n  D.WEIGHT_SUM,\n  C.REDUCED,\n  CONF_USER.ID     AS USER_ID,\n  E.INCREASED      AS KHS_WEIGHT,\n  F.INCREASED      AS CY_WEIGHT,\n  G.INCREASED      AS YH_WEIGHT,\n  H.INCREASED      AS OTHER_WEIGHT,\n  D.CREATE_TIME,\n  I.RESIDENT_COUNT\nFROM CONF_USER\n  LEFT JOIN (SELECT\n               A.*,\n               SUM(A.INTEGRAL)   AS INCREASED,\n               SUM(A.WEIGHT)     AS WEIGHT_SUM\n             FROM GCMS_GARBAGE_DISPOSAL A\n             WHERE A.CREATE_TIME < \'2019-09-09 25:59:59\'\n                 AND A.CREATE_TIME > \'2019-09-09 00:00:00\'\n                 AND A.ISDEL = 0\n             GROUP BY A.USER_ID) D\n    ON D.USER_ID = CONF_USER.ID\n  LEFT JOIN (SELECT\n               B.*,\n               SUM(B.NUM)        AS REDUCED\n             FROM GCMS_INTEGRAL_EXCHANGE B\n             WHERE B.CREATE_TIME < \'2019-09-09 25:59:59\'\n                 AND B.CREATE_TIME > \'2019-09-09 00:00:00\'\n                 AND B.ISDEL = 0\n             GROUP BY B.USER_ID) C\n    ON C.USER_ID = CONF_USER.ID\n  LEFT JOIN (SELECT\n               A.*,\n               SUM(A.WEIGHT)   AS INCREASED\n             FROM GCMS_GARBAGE_DISPOSAL A\n             WHERE A.TYPE_ONE = \'10000\'\n                 AND A.ISDEL = 0\n                 AND A.CREATE_TIME < \'2019-09-09 25:59:59\'\n                 AND A.CREATE_TIME > \'2019-09-09 00:00:00\'\n             GROUP BY A.USER_ID) E\n    ON E.USER_ID = CONF_USER.ID\n  LEFT JOIN (SELECT\n               A.*,\n               SUM(A.WEIGHT)   AS INCREASED\n             FROM GCMS_GARBAGE_DISPOSAL A\n             WHERE A.TYPE_ONE = \'20000\'\n                 AND A.ISDEL = 0\n                 AND A.CREATE_TIME < \'2019-09-09 25:59:59\'\n                 AND A.CREATE_TIME > \'2019-09-09 00:00:00\'\n             GROUP BY A.USER_ID) F\n    ON F.USER_ID = CONF_USER.ID\n  LEFT JOIN (SELECT\n               A.*,\n               SUM(A.WEIGHT)   AS INCREASED\n             FROM GCMS_GARBAGE_DISPOSAL A\n             WHERE A.TYPE_ONE = \'30000\'\n                  AND A.ISDEL = 0\n                 AND A.CREATE_TIME < \'2019-09-09 25:59:59\'\n                 AND A.CREATE_TIME > \'2019-09-09 00:00:00\'\n             GROUP BY A.USER_ID) G\n    ON G.USER_ID = CONF_USER.ID\n  LEFT JOIN (SELECT\n               A.*,\n               SUM(A.WEIGHT)   AS INCREASED\n             FROM GCMS_GARBAGE_DISPOSAL A\n             WHERE A.TYPE_ONE = \'40000\'\n                 AND A.ISDEL = 0\n                 AND A.CREATE_TIME < \'2019-09-09 25:59:59\'\n                 AND A.CREATE_TIME > \'2019-09-09 00:00:00\'\n             GROUP BY A.USER_ID) H\n    ON H.USER_ID = CONF_USER.ID\n  LEFT JOIN (SELECT\n               S.USER_ID,\n               COUNT(*)          AS RESIDENT_COUNT\n             FROM (SELECT\n                     A.USER_ID,\n                     A.RESIDENT_ID\n                   FROM GCMS_GARBAGE_DISPOSAL A\n                   WHERE A.CREATE_TIME < \'2019-09-09 25:59:59\'\n                       AND A.CREATE_TIME > \'2019-09-09 00:00:00\'\n                       AND A.ISDEL = 0\n                   GROUP BY A.USER_ID,A.RESIDENT_ID) S\n             GROUP BY S.USER_ID) I\n    ON I.USER_ID = CONF_USER.ID','gcms');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('16f60da9-50b2-4214-a842-c16c3fa6c8c2','垃圾分类统计','ClassifiedReport','classified_report','SELECT\n  C.*,\n  SUM(C.WEIGHT) AS WEIGHT_SUM\nFROM (SELECT\n        A.*,\n        B.UNITS_ID\n      FROM GCMS_GARBAGE_DISPOSAL A,\n        GCMS_RESIDENT_INFO B\n      WHERE A.RESIDENT_ID = B.ID\n           AND A.ISDEL = 0\n          AND A.CREATE_TIME < \'2019-09-09 25:59:59\'\n          AND A.CREATE_TIME > \'2019-09-09 00:00:00\') C\nGROUP BY C.UNITS_ID,C.REFUSE_CLS','gcms');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('178801cf-ed47-4788-bd85-afbb8c521faf','查询用户的权限菜单和按钮','PlatUserRoleMb','plat_user_role_mb','SELECT\n  A.*,\n  b.MENU_CODE\nFROM PLAT_USER_ROLE A,\n  PLAT_ROLE_MENU B\nWHERE A.ROLE_ID = B.ROLE_ID','plat');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('17ef7ae0-5083-43f9-90b6-992bee37f6b7','单位或小区列表','ClsUnitsList','cls_units_list','SELECT A.*,B.ENT_NAME,C.NAME AS USER_NAME,\n F.DATA_NAME AS UNITS_NAME, \n CASE A.REGION_CLS WHEN 1 THEN \'城市\' ELSE \'农村\' END AS REGION_NAME, D.NAME AS STREET_NAME, E.NAME AS COMMUNITY_NAME,\n B.extend_indexd AS AREA_NAME\nFROM GCMS_REFUSE_CLS_UNITS A\n LEFT JOIN CONF_ENT B ON A.ENT_CODE = B.ENT_CODE \n LEFT JOIN CONF_USER C ON A.USER_ID = C.ID \n LEFT JOIN ECS_STREETS D ON A.EX1 = D.CODE \n LEFT JOIN ECS_STREETS E ON A.EX2 = E.CODE \n LEFT JOIN conf_dictionaries F ON F.GROUP_ID = \'CLS_UNITS_TYPE\' AND F.DATA_ID = A.TYPE \n','gcms');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('34325c54-a876-4a59-8ccb-e472e591ab93','金沙田设备实时信息','DevRealtimeList','dev_realtime_list','SELECT\n  A.*,\n  B.NAME AS GARBAGE_TYPE_NAME\nFROM GCMS_DEV_REALTIME_INFO A\n  LEFT JOIN (SELECT\n               T.CODE,\n               T.NAME\n             FROM GCMS_GARBAGE_TYPE T\n             WHERE T.LEVEL = 4) B\n    ON A.GARBAGE_TYPE = B.CODE','gcms');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('3450d38e-6320-4b23-89d2-256e35ae7084','域列表','DomainList','domain_list','SELECT * FROM t_domain_info','sde');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('3b8dbec6-88c8-4435-9dae-d1dc08f1ccf2','居民信息查询','GcmsResidentInfoQuery','gcms_resident_info_query','SELECT   A.*,   B.NAME AS VILLAGE_NAME,   C.NAME AS COMMUNITY_NAME,   D.NAME AS STREET_NAME,   E.NAME AS ADMIN_NAME,   F.ENT_NAME,   G.NAME AS DEP_NAME FROM GCMS_RESIDENT_INFO A   LEFT JOIN GCMS_REFUSE_CLS_UNITS B ON A.UNITS_ID = B.ID   LEFT JOIN ECS_STREETS C ON B.EX2 = C.CODE   LEFT JOIN ECS_STREETS D ON B.EX1 = D.CODE   LEFT JOIN CONF_USER E ON E.ID = A.USER_ID    LEFT JOIN CONF_ENT F ON F.ENT_CODE = A.ENT_CODE   LEFT JOIN CONF_DEPARTMENT G ON G.ID = A.DEPT_ID','gcms');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('4a72a17c-b12f-4fa6-9b49-022f6aa06caf','设备数统计','DevCount','dev_count','SELECT\n  (SELECT\n     COUNT(*)\n   FROM T_GROUP_CHANNEL\n     LEFT JOIN T_GROUP_INFO_EX\n       ON T_GROUP_CHANNEL.GROUP_CODE = T_GROUP_INFO_EX.GROUP_CODE\n   WHERE T_GROUP_INFO_EX.PARENT LIKE \'7551,7552,%\') AS DEV_COUNT,\n  (SELECT\n     COUNT(*)\n   FROM T_GROUP_CHANNEL,\n     T_GROUP_INFO_EX,\n     T_VIDEO_CHANNEL_INFO,\n     T_DEVICE_INFO\n   WHERE T_GROUP_CHANNEL.GROUP_CODE = T_GROUP_INFO_EX.GROUP_CODE\n       AND T_VIDEO_CHANNEL_INFO.DEV_CODE = T_DEVICE_INFO.DEV_CODE\n       AND T_GROUP_CHANNEL.CHANNEL_CODE = T_VIDEO_CHANNEL_INFO.VIDEO_CHANNEL_CODE\n       AND T_GROUP_INFO_EX.PARENT LIKE \'7551,7552,%\'\n       AND T_VIDEO_CHANNEL_INFO.ONLINE_STATE = 1) AS ONLINE_COUNT,\n       \'\' AS PARENT_SEQ','sde');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('4f6f424d-c6ca-4b1b-8744-b457f843b5c8','启用任务的岗点时间人员','EfenceTaskTimeUser','efence_task_time_user','SELECT\n  A.TASK_NAME,\n  B.ID        AS EFENCE_ID,\n  C.START_TIME,\n  C.END_TIME,\n  CONCAT(C.START_TIME,\'-\',C.END_TIME) AS SPT_TIME,\n  D.TITLE,\n  D.TAGS,\n  D.ENT_CODE,\n  D.DEPT_ID,\n  E.USER_ID\nFROM CG_TASK_TEMPLATE A,\n  CG_TASKTEMP_AREA B,\n  CG_TASKTEMP_AREATIME C,\n  CG_EFENCE D,\n  CG_TASKTEMP_USER E\nWHERE A.STATUS = 1\n    AND A.ID = B.TASKTEMP_ID\n    AND B.ID = C.TEMP_AREA_ID\n    AND B.AREA_TYPE = 2\n    AND B.EFENCE_ID = D.ID\n    AND E.AREA_TIME_ID = C.ID','cg');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('530c2af0-daba-474f-8e78-b843b9eab269','用户列表','PlatUserList','plat_user_list','SELECT\n  a.*,\n  b.ENT_NAME,\n  b.ENT_PARAMS,\n  c.DATA_NAME  AS sex_name,\n  D.JOB_NAME,\n  E.DATA_NAME  AS ISCHARGE_NAME,\n  F.DATA_NAME  AS ID_TYPE_NAME,\n  G.DATA_NAME  AS USER_TYPE_NAME,\n  H.DATA_NAME  AS USER_SERVICE_TYPE_NAME,\n  j.role_names,\n  I.NAME       AS DEP_NAME,\n  \'\'           AS active_ent_code\nFROM plat_user a\n  LEFT JOIN plat_ent b\n    ON a.ENT_CODE = b.ENT_CODE\n  LEFT JOIN plat_dict c\n    ON c.DATA_ID = a.SEX\n      AND c.GROUP_ID = \'sex\'\n  LEFT JOIN plat_job d\n    ON a.JOB_CODE = D.JOB_CODE\n  LEFT JOIN plat_dict E\n    ON E.DATA_ID = A.ISCHARGE\n      AND E.GROUP_ID = \'YES_OR_NO\'\n  LEFT JOIN plat_dict F\n    ON F.DATA_ID = A.ID_TYPE\n      AND F.GROUP_ID = \'ID_TYPE\'\n  LEFT JOIN plat_dict G\n    ON G.DATA_ID = A.USER_TYPE\n      AND G.GROUP_ID = \'USER_TYPE\'\n  LEFT JOIN plat_dict H\n    ON H.DATA_ID = A.USER_SERVICE_TYPE\n      AND H.GROUP_ID = \'USER_SERVICE_TYPE\'\n  LEFT JOIN plat_dep I\n    ON I.DEP_CODE = A.USER_DEP_CODE\n  LEFT JOIN (SELECT\n               a1.USER_CODE,\n               GROUP_CONCAT(b1.ROLE_NAME) AS role_names\n             FROM plat_user_role a1,\n               plat_role b1\n             WHERE a1.ROLE_ID = b1.ID\n             GROUP BY a1.USER_CODE) j\n    ON j.user_code = a.USER_CODE\nWHERE FIND_IN_SET(a.ENT_CODE,GET_CHILD_ENT(\'A320101\'))\n','plat');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('5c5a3efc-7712-48bc-bda4-d18f597cc7cb','垃圾回收记录列表','DisposalList','disposal_list','SELECT\n  A.*,\n  B.UNITS_ID,\n  F.NAME AS UNITS_NAME,\n  B.NAME AS USER_NAME,\n  C.NAME AS ADMIN_NAME,\n  D.NAME AS MAX_TYPE_NAME,\n  E.NAME AS MIN_TYPE_NAME,\n  B.CARD_NUM\nFROM GCMS_GARBAGE_DISPOSAL A\n  LEFT JOIN GCMS_RESIDENT_INFO B\n    ON A.RESIDENT_CARD_NUM = B.CARD_NUM\n  LEFT JOIN CONF_USER C\n    ON A.USER_ID = C.ID\n  LEFT JOIN GCMS_GARBAGE_TYPE D\n    ON D.CODE = A.REFUSE_CLS\n  LEFT JOIN GCMS_GARBAGE_TYPE E\n    ON E.CODE = A.SUB_CLS\nLEFT JOIN GCMS_REFUSE_CLS_UNITS F ON F.ID = B.UNITS_ID','gcms');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('5dac1482-7d33-4b94-b8d5-c1cd95212230','用户时间范围考勤统计','EfenceUserTime','efence_user_time','SELECT\n  S.*,\n  S1.TOUCH_TIMES\nFROM (SELECT\n        A.COLLECT_TIME,\n        SUM(A.A_MILEAGE)/1000 AS SUM_MILEAGE,\n  COUNT(*)*10/60 AS SUM_LENGTH_STAY,\n  MIN(A.COLLECT_TIME) AS START_TIME,\n        A.USER_ID\n      FROM CG_USER_MIN_REPORT A\n      WHERE A.ATTENDANCE_CHECK = 1\n          AND A.USER_ID = 13024039\n          AND A.COLLECT_TIME >= \'2019-12-19 00:40:00\'\n          AND A.COLLECT_TIME <= \'2019-12-19 23:40:00\'\n      GROUP BY A.USER_ID) S\n  LEFT JOIN (SELECT\n               B.USER_ID,\n               COUNT(*)        AS TOUCH_TIMES\n             FROM (SELECT\n                     A.*\n                   FROM CG_USER_MIN_REPORT A\n                   WHERE A.ATTENDANCE_CHECK = 1\n                       AND A.USER_ID = 13024039\n                       AND A.COLLECT_TIME >= \'2019-12-19 00:40:00\'\n                       AND A.COLLECT_TIME <= \'2019-12-19 23:40:00\'\n                   GROUP BY A.CUUID) B) S1\n    ON S.USER_ID = S1.USER_ID','cg');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('5fda39af-b6c0-4046-a9b6-28dbc3445d57','根据产品编号查询模块','PlatModelByProduct','plat_model_by_product','SELECT\n  PLAT_MODEL_PRO.PRODUCT_CODE,\n  PLAT_MODEL.*\nFROM PLAT_MODEL_PRO,\n  PLAT_MODEL\nWHERE PLAT_MODEL.MODEL_CODE = PLAT_MODEL_PRO.MODEL_CODE','plat');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('60db26e2-f427-4ebf-a19a-81ea9bf4375d','查询企业列表','PlatEntList','plat_ent_list','SELECT\n  A.*,\n  B.ENT_NAME  AS PARENT_ENT_NAME,\n  C.DATA_NAME AS ENT_TYPE_NAME,\n  \'\'          AS ACTIVE_ENT_CODE\nFROM PLAT_ENT A\n  LEFT JOIN PLAT_ENT B\n    ON A.PARENT_CODE = B.ENT_CODE\n  LEFT JOIN PLAT_DICT C\n    ON C.GROUP_ID = \'ENT_TYPE\'\n      AND C.DATA_ID = A.ENT_TYPE\nWHERE FIND_IN_SET(A.ENT_CODE,GET_CHILD_ENT(\'A320101\'))','plat');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('65762a87-09f2-4e43-a210-6a36a3358701','垃圾箱列表查询','GcmsGarbageQuery','gcms_garbage_query','SELECT a.*, b.DATA_NAME AS type_name ,c.NAME AS units_name FROM gcms_garbage a LEFT JOIN conf_dictionaries b ON (a.TYPE=b.DATA_ID AND b.GROUP_ID=\'REFUSE_CLASS\')  LEFT JOIN gcms_refuse_cls_units c ON a.UNITS_ID=c.ID','gcms');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('66337f2a-d251-44ad-8c44-9fbfa3fcb0d8','操作日志列表','PlatLogList','plat_log_list','SELECT\n  A.*,\n  B.CLASS_DESC,\n  E.DATA_NAME  AS OPT_TYPE,\n  F.NAME       AS USER_NAME\nFROM PLAT_OPT_LOG A\n  LEFT JOIN PLAT_ATTR B\n    ON B.CLASS_NAME = A.LOG_HOLDER\n      AND B.ATTR_NAME = \'ID\'\n  LEFT JOIN PLAT_DICT E\n    ON E.DATA_ID = A.LOG_TYPE\n      AND E.GROUP_ID = \'LOG_TYPE\'\n  LEFT JOIN PLAT_USER F\n    ON A.CREATE_USER_ID = F.ID','plat');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('68e61847-7c4f-4e15-802c-371def53588a','车辆查询','GcmsGarbageCarQuery','gcms_garbage_car_query','SELECT C.*, R.SDOMAIN_CODE, R.DEV_CODE, R.VIDEO_CHANNEL_CODE, R.VIDEO_STREAM_CODE ,\'\' AS EFENCE_IDS , R.ID AS ROOM_NODE_ID, R.ROOM_ID FROM   gcms_garbage_car C  LEFT JOIN CONF_ROOM_NODE R ON R.ID = C.EX1','gcms');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('68fe4abc-cbc3-4f01-95ce-73beb4253e32','短信列表','PsmsList','psms_list','SELECT\n  A.*,\n  B.DATA_NAME AS SMS_RECV_NAME\nFROM PSMS_SMS A\n  LEFT JOIN PLAT_DICT B\n    ON A.SMS_RECV = B.DATA_ID\n      AND B.GROUP_ID = \'YES_OR_NO\'','psms');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('6b14fdae-8406-4c01-907e-dd5d8f4c8142','查询群组联系人列表','PlatCommUserList','plat_comm_user_list','SELECT\n  B.*,\n  A.GROUP_TYPE,\n  A.GROUP_NAME,\n  A.GROUP_ICON,\n  C.NAME       AS USER_NAME,\n  C.IMG_URL\nFROM PLAT_CONTACT_GROUP A,\n  PLAT_CONTACT B,\n  PLAT_USER C\nWHERE A.GROUP_CODE = B.GROUP_CODE\n    AND C.USER_CODE = B.FRIEND_USER_CODE','plat');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('707dd6d9-2d4f-4956-8eab-abede893b1cb','积分兑换列表','IntegralExchangeList','integral_exchange_list','SELECT\n  A.*,\n  B.NAME AS COMMODITY_NAME,\n  B.URL,\n  C.NAME AS RESIDENT_NAME,\n  C.CARD_NUM,\n  D.NAME AS RECYCLER_NAME,\n  C.UNITS_ID,\n  E.NAME AS UNITS_NAME\nFROM GCMS_INTEGRAL_EXCHANGE A\n  LEFT JOIN GCMS_COMMODITY B\n    ON B.ID = A.PRODUCT_CODE\n    LEFT JOIN GCMS_RESIDENT_INFO C ON C.ID = A.RESIDENT_ID\n    LEFT JOIN CONF_USER D ON D.ID = A.USER_ID \n    LEFT JOIN GCMS_REFUSE_CLS_UNITS E ON E.ID = C.UNITS_ID\n      ','gcms');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('71ebdaaf-86a8-41ac-a95d-f7035bcdfd74','码流列表','StreamList','stream_list','SELECT\n  A.*,\n  B.VIDEO_STREAM_CODE,\n  B.VIDEO_STREAM_NAME\nFROM T_CHANNEL_LIST A,\n  T_VIDEO_STREAM B\nWHERE A.VIDEO_CHANNEL_CODE = B.VIDEO_CHANNEL_CODE\n    AND A.GROUP_CODE = \'34010000000000933\'','sde');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('755742f5-6312-4dd9-9d9b-16be72e075f3','执行考勤','CgUserAttendance','cg_user_attendance','SELECT \ntemp.*,\nconf_user.name,\ncg_task_template.TASK_NAME,\ncg_efence.TITLE,\ncg_task_template.CG_TEMPLATE_TYPE,\ncg_task_template.CLASSIFY \nFROM (\nSELECT \ncg_user_min_report.*,\n(CASE FORMAT(COUNT(cuuid)*ATTENDANCE_CHECK*10/60, 2) WHEN 0 THEN \'\' ELSE FORMAT(COUNT(cuuid)*ATTENDANCE_CHECK*10/60, 2) END) innertime,\n(CASE FORMAT(SUM(A_MILEAGE)/1000, 2) WHEN 0 THEN \'\'ELSE FORMAT(SUM(A_MILEAGE)/1000, 2) END) MILEAGE,\nCONCAT( MIN(CHECK_time),\'~\',DATE_FORMAT(MAX(CHECK_END_TIME),\'%H:%i:%s\') ) AS showtime\nFROM cg_user_min_report \nWHERE cuuid IS NOT NULL \n\n				AND cg_user_min_report.`CHECK_TIME` >= \'2019-10-17 00:00:00\'\n		\n				AND cg_user_min_report.`CHECK_TIME` <=\'2019-10-17 23:00:00\'\n		\n				AND efence_id = 405\n\nGROUP BY cuuid \nORDER BY CHECK_time \n) temp ,cg_task_template,cg_tasktemp_area,cg_efence,conf_user \nWHERE temp.task_id = cg_task_template.ID AND cg_task_template.STATUS = \'1\' \nAND temp.task_id = cg_tasktemp_area.TASKTEMP_ID \nAND temp.task_area_id =cg_tasktemp_area.ID \nAND cg_tasktemp_area.EFENCE_ID = cg_efence.ID\nAND temp.user_id = conf_user.ID','cg');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('768d7ff0-22cc-4efd-9c06-1b1f1b2d87f9','参与户数','ParticipatingHouseholds','participating_households','SELECT\n  S.*,\n  S1.NAME AS VILLAGE_NAME\nFROM (SELECT\n        A.*,\n        B.USER_ID AS AMDIN_ID\n      FROM GCMS_RESIDENT_INFO A,\n        GCMS_GARBAGE_DISPOSAL B\n      WHERE A.ID = B.RESIDENT_ID) S\nLEFT JOIN GCMS_REFUSE_CLS_UNITS S1\nON S1.ID = S.UNITS_ID','gcms');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('7c0d69fc-fa38-4418-bd02-c0198b27d8c3','商品兑换统计列表','CommExchangeList','comm_exchange_list','SELECT\n  A.*,\n  B.SUM_INTEGRAL,\n  B.SUM_NUM,\n  B.UNITS_ID,\n  B.UNITE_NAME\nFROM GCMS_COMMODITY A\n  LEFT JOIN (SELECT\n               A.ID,\n               SUM(A.INTEGRAL_USED)    SUM_INTEGRAL,\n               SUM(A.NUM)      AS SUM_NUM,\n               A.UNITS_ID,\n               A.UNITE_NAME\n             FROM (SELECT\n                     GCMS_COMMODITY.*,\n                     GCMS_REFUSE_CLS_UNITS.ID             AS UNITS_ID,\n                     GCMS_REFUSE_CLS_UNITS.NAME           AS UNITE_NAME,\n                     GCMS_INTEGRAL_EXCHANGE.INTEGRAL_USED,\n                     GCMS_INTEGRAL_EXCHANGE.NUM\n                   FROM GCMS_COMMODITY,\n                     GCMS_INTEGRAL_EXCHANGE,\n                     GCMS_RESIDENT_INFO,\n                     GCMS_REFUSE_CLS_UNITS\n                   WHERE GCMS_COMMODITY.ID = GCMS_INTEGRAL_EXCHANGE.PRODUCT_CODE\n                       AND GCMS_INTEGRAL_EXCHANGE.RESIDENT_ID = GCMS_RESIDENT_INFO.ID\n                       AND GCMS_RESIDENT_INFO.UNITS_ID = GCMS_REFUSE_CLS_UNITS.ID\n                       AND GCMS_INTEGRAL_EXCHANGE.CREATE_TIME > \'2019-11-01 09:11:58\'\n                       AND GCMS_INTEGRAL_EXCHANGE.CREATE_TIME < \'2019-12-01 09:11:58\') A\n             GROUP BY A.ID) B\n    ON A.ID = B.ID','gcms');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('87cf59a6-aa8e-4957-a78c-d31e43a55b99','权限设备分组','GroupByRole','group_by_role','SELECT\n  A.*,\n  A.GROUP_ID     AS ID,\n  B.ID           AS DEV_TYPE_ID,\n  B.DEV_TYPE,\n  B.DATA_ROLE_ID,\n  D.NAME         AS DATA_ROLE_NAME,\n  C.DATA_NAME    AS DEV_TYPE_NAME,\n  E.USER_ID\nFROM T_GROUP_LIST A\n  LEFT JOIN SDE_GROUP_TYPE B\n    ON A.GROUP_ID = B.DEV_ID\n  LEFT JOIN CONF_DICTIONARIES C\n    ON C.GROUP_ID = \'ROOM_TYPE\'\n      AND C.DATA_ID = B.DEV_TYPE\n  LEFT JOIN SDE_ROLE D\n    ON D.ID = B.DATA_ROLE_ID\n  LEFT JOIN (SELECT\n               CONF_USER.ID            AS USER_ID,\n               CONF_USER.NAME          AS USER_NAME,\n               T_GROUP_LIST.GROUP_CODE,\n               SDE_GROUP_TYPE.DEV_TYPE\n             FROM CONF_USER_DATA_ROLE,\n               CONF_USER,\n               SDE_ROLE,\n               SDE_GROUP_TYPE,\n               T_GROUP_LIST\n             WHERE SDE_ROLE.ID = SDE_GROUP_TYPE.DATA_ROLE_ID\n                 AND SDE_ROLE.ID = CONF_USER_DATA_ROLE.DATA_ROLE_ID\n                 AND CONF_USER_DATA_ROLE.USER_ID = 1\n                 AND SDE_GROUP_TYPE.DEV_ID = T_GROUP_LIST.GROUP_ID\n                 AND SDE_GROUP_TYPE.DEV_TYPE = 1\n             GROUP BY SDE_GROUP_TYPE.DEV_ID) E\n    ON E.GROUP_CODE = A.GROUP_CODE','sde');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('87fa06f5-3726-48a3-989d-6533b7a169b3','任务明细','TaskTempInfo','task_temp_info','SELECT\n  P.*,\n  D.NAME           DEPT_NAME,\n  E.ENT_NAME,\n  DIC.DATA_NAME    CG_TEMPLATE_TYPE_NAME,\n  F.ENT_CODE    AS PARENT_TASK_ENT_CODE,\n  F.TASK_NAME   AS PARENT_TASK_NAME,\n  F.DEPT_ID     AS PARENT_DEP_ID,\n  G.NAME        AS PARENT_DEP_NAME,\n  \'\'            AS ACTIVE_ENT_CODE\nFROM CG_TASK_TEMPLATE P\n   LEFT JOIN CONF_ENT E\n    ON E.ENT_CODE = P.ENT_CODE\n   LEFT JOIN CONF_DEPARTMENT D\n    ON D.ID = P.DEPT_ID\n  LEFT JOIN CONF_DICTIONARIES DIC\n    ON DIC.GROUP_ID = \'CG_TEMPLATE_TYPE\'\n      AND DIC.DATA_ID = P.CG_TEMPLATE_TYPE\n  LEFT JOIN CG_TASK_TEMPLATE F\n    ON P.PARENT_ID = F.ID\n  LEFT JOIN CONF_DEPARTMENT G\n    ON F.DEPT_ID = G.ID\nWHERE FIND_IN_SET(P.ENT_CODE,QUERYCHILDENTINFO(320101))','cg');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('8d6349d0-fa95-435e-9d5a-422aa146d7a0','岗点事件明细','EfenceReportDetial','efence_report_detial','SELECT\n  A.*,\n  B.USER_ID,\n  B.EXEC_TIME,\n  B.EXEC_NAME,\n  B.EXEC_STATUS,\n  C.EXEC_TYPE,\n  C.CONTENT_TYPE,\n  C.CONTENT,\n  C.FILE_PATH,\n  C.DOMAIN_CODE,\n  C.RECORD_ID\nFROM CG_TASK A,\n  CG_TASK_EXEC B,\n  CG_TASK_EXEC_DTL C\nWHERE A.ID = B.TASK_ID\n    AND B.USER_ID = 13023453\n    AND B.EXEC_TIME >= \'2019-12-25 14:00:00\'\n    AND B.EXEC_TIME <= \'2019-12-25 17:30:00\'\n    AND C.EXEC_ID = B.ID','cg');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('94c7d89a-7db9-42e4-9fa4-67bb69011408','部门列表','PlatDepList','plat_dep_list','SELECT\n  A.*,\n  B.NAME      AS PARENT_NAME,\n  C.ENT_NAME,\n  D.NAME      AS ADMIN_NAME,\n  E.DATA_NAME AS DEP_TYPE_NAME,\n  \'\'          AS ACTIVE_ENT_CODE\nFROM PLAT_DEP A\n  LEFT JOIN PLAT_DEP B\n    ON A.PARENT_CODE = B.DEP_CODE\n  LEFT JOIN PLAT_ENT C\n    ON A.ENT_CODE = C.ENT_CODE\n  LEFT JOIN PLAT_USER D\n    ON A.USER_CODE = D.USER_CODE\n  LEFT JOIN PLAT_DICT E\n    ON E.DATA_ID = A.DEP_TYPE\n      AND E.GROUP_ID = \'DEP_TYPE\'\nWHERE FIND_IN_SET(A.ENT_CODE,GET_CHILD_ENT(\'A320101\'))','plat');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('953d63f9-29f1-40f6-9252-c3c2b89fc2a6','街道社区列表','StreetList','street_list','SELECT   A.*,   B.NAME      AS STREATE_NAME,   C.DATA_NAME AS STREATE_TYPE,   D.ENT_NAME FROM ECS_STREETS A   LEFT JOIN ECS_STREETS B     ON A.EXTEND_COL3 = B.CODE   LEFT JOIN CONF_DICTIONARIES C     ON A.EXTEND_COL2 = C.DATA_ID       AND C.GROUP_ID = \'STREET_TYPE\'   LEFT JOIN CONF_ENT D     ON D.ENT_CODE = A.ENT_CODE','gcms');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('a237b6dd-2c81-430e-8582-b8c6a844f313','属性列表','PlatFieldList','plat_field_list','SELECT\n  A.*,\n  B.NAME        AS MENU_NAME,\n  C.DATA_NAME   AS FIELD_TYPE_NAME,\n  D.BUTTON_NAME,\n  E.DATA_NAME   AS DISPLAY_NAME,\n  F.DATA_NAME   AS ENABLE_NAME\nFROM plat_field A\n  LEFT JOIN PLAT_MENU B\n    ON A.MENU_CODE = B.MENU_CODE\n  LEFT JOIN PLAT_DICT C\n    ON A.FIELD_TYPE = C.DATA_ID\n      AND C.GROUP_ID = \'FIELD_TYPE\'\n  LEFT JOIN PLAT_BUTTON D\n    ON D.BUTTON_CODE = A.BUTTON_CODE\n  LEFT JOIN PLAT_DICT E\n    ON A.DISPLAY = E.DATA_ID\n      AND E.GROUP_ID = \'YES_OR_NO\'\n  LEFT JOIN PLAT_DICT F\n    ON A.ENABLE = F.DATA_ID\n      AND F.GROUP_ID = \'YES_OR_NO\'','plat');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('a73703bf-b839-4aec-9400-b580c3a527ee','岗点触碰统计','PointAreaReport','point_area_report','SELECT\n	S.*,\n	SUM(S.SC) AS ZGSC,\n	SUM(S.A_MILEAGE)/1000 AS SUM_A_MILEAGE,\n	COUNT(*) AS CPCS \nFROM (                                                                                                 \n	SELECT \n		B.ID       AS PARENT_ID,\n		B.TITLE,\n		B.ENT_CODE AS EFENCE_ENT_CODE,\n		B.TAGS,\n		B.DEPT_ID AS EFENCE_DEP_ID,\n		E.NAME     AS USER_NAME,\n		E.ENT_CODE AS USER_ENT_CODE,\n		D.ENT_NAME AS USER_ENT_NAME,\n		D.EXTEND_INDEXA AS USER_DEP_ID,\n		C.*,COUNT(*)*10/60 AS SC\n	FROM CG_TASKTEMP_USER A,\n	   CG_EFENCE B,\n	   CG_USER_MIN_REPORT C ,\n	   CONF_USER E,\n	   CONF_ENT D\n	WHERE A.EFENCE_ID = B.ID\n		AND E.ENT_CODE = D.ENT_CODE\n		AND C.USER_ID = E.ID\n		AND B.AREA_TYPE = 2\n		AND B.ENT_CODE = 320102\n		AND A.USER_ID = C.USER_ID\n	    AND C.CHECK_TIME > \'2019-12-16 00:40:00\'\n	    AND C.CHECK_TIME < \'2019-12-16 23:40:00\'\n	    AND C.ATTENDANCE_CHECK =1\n	    GROUP BY C.CUUID \n	)S \nGROUP BY S.EFENCE_DEP_ID','cg');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('a7918d05-6980-4d38-9cb8-08d68940f494','新增蓝绿积分和总总量','BlueGreenWeight','blue_green_weight','SELECT\n  H.*,\n  I.BLUE_INTEGRAL,\n  J.GREEN_INTEGRAL\nFROM (SELECT\n        C.UNITS_ID,\n        SUM(C.WEIGHT)     AS WEIGHT_SUM\n      FROM (SELECT\n              A.*,\n              B.UNITS_ID\n            FROM GCMS_GARBAGE_DISPOSAL A,\n              GCMS_RESIDENT_INFO B\n            WHERE A.RESIDENT_ID = B.ID\n                AND A.ISDEL = 0\n                AND A.CREATE_TIME < \'2019-10-31 09:11:58\'\n                AND A.CREATE_TIME > \'2019-10-01 09:11:58\') C\n      GROUP BY C.UNITS_ID) H\n  LEFT JOIN (SELECT\n               C.UNITS_ID,\n               SUM(C.INTEGRAL)   AS BLUE_INTEGRAL\n             FROM (SELECT\n                     A.*,\n                     B.UNITS_ID\n                   FROM GCMS_GARBAGE_DISPOSAL A,\n                     GCMS_RESIDENT_INFO B\n                   WHERE A.RESIDENT_ID = B.ID\n                        AND A.ISDEL = 0\n                       AND A.TYPE_ONE = 20000\n                       AND A.CREATE_TIME < \'2019-10-31 09:11:58\'\n                       AND A.CREATE_TIME > \'2019-10-01 09:11:58\') C\n             GROUP BY C.UNITS_ID) I\n    ON H.UNITS_ID = I.UNITS_ID\n  LEFT JOIN (SELECT\n               C.UNITS_ID,\n               SUM(C.INTEGRAL)   AS GREEN_INTEGRAL\n             FROM (SELECT\n                     A.*,\n                     B.UNITS_ID\n                   FROM GCMS_GARBAGE_DISPOSAL A,\n                     GCMS_RESIDENT_INFO B\n                   WHERE A.RESIDENT_ID = B.ID\n                       AND A.ISDEL = 0\n                       AND A.TYPE_ONE <> 20000\n                       AND A.CREATE_TIME < \'2019-10-31 09:11:58\'\n                       AND A.CREATE_TIME > \'2019-10-01 09:11:58\') C\n             GROUP BY C.UNITS_ID) J\n    ON H.UNITS_ID = J.UNITS_ID','gcms');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('ae185585-737b-40ef-a847-3c4ad26a2ba3','用户执行信息','CgUserExecDtl','cg_user_exec_dtl','SELECT\n  a.*,\n  b.ID   AS user_id,\n  b.NAME\nFROM cg_task_exec_dtl a,\n  conf_user b\nWHERE a.SRC = b.LOGIN_NAME\n    AND b.ID IN(13022673,13022679,13022687)','cg');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('b0c41ad4-08b5-4d98-a25c-f435970c8a4e','案件列表','CaseList','case_list','SELECT\n  A.*,\n  B.DATA_NAME AS CASE_TYPE_NAME,\n  C.NAME      AS DEP_NAME,\n  D.NAME      AS CHIEF_JUDGE_NAME,\n  E.NAME      AS UNDERTAKER_NAME,\n  F.NAME      AS CLERK_NAME\nFROM FFS_CASE A\n  LEFT JOIN CONF_DICTIONARIES B\n    ON A.CASE_TYPE = B.DATA_ID\n      AND B.GROUP_ID = \'CASE_TYPE\'\n  LEFT JOIN CONF_DEPARTMENT C\n    ON C.ID = A.DEPARTMENT_ID\n  LEFT JOIN CONF_USER D\n    ON D.ID = A.CHIEF_JUDGE_ID\n  LEFT JOIN CONF_USER E\n    ON E.ID = A.UNDERTAKER_ID\n  LEFT JOIN CONF_USER F\n    ON F.ID = A.CLERK_ID','ffs');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('b8d257fc-7a20-419e-8ecc-297e1e68d413','岗点考勤分类汇总','EfenceReportSum','efence_report_sum','SELECT\n  A.*,\n  SUM(A.TOUCH_TIMES) AS SUM_TOUCH_TIMES,\n  SUM(A.MILEAGES) AS SUM_MILEAGES,\n  SUM(A.LENGTH_STAY) AS SUM_LENGTH_STAY,\n  SUM(A.PIR) AS SUM_PIR,\n  SUM(A.EIR) AS SUM_EIR\nFROM CG_EFENCE_REPORT A\nGROUP BY A.REPORT_DATE','cg');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('ba24484a-be43-47a8-a381-9d4c573aea6c','按钮列表','PlatButtonList','plat_button_list','SELECT\n  A.*,\n  B.NAME        AS MENU_NAME,\n  C.DATA_NAME   AS BUTTON_TYPE_NAME,\n  D.BUTTON_NAME AS PARENT_BUTTON_NAME,\n  E.DATA_NAME   AS DISPLAY_NAME,\n  F.DATA_NAME   AS ENABLE_NAME\nFROM PLAT_BUTTON A\n  LEFT JOIN PLAT_MENU B\n    ON A.MENU_CODE = B.MENU_CODE\n  LEFT JOIN PLAT_DICT C\n    ON A.BUTTON_TYPE = C.DATA_ID\n      AND C.GROUP_ID = \'BUTTON_TYPE\'\n  LEFT JOIN PLAT_BUTTON D\n    ON D.BUTTON_CODE = A.PARENT_CODE\n  LEFT JOIN PLAT_DICT E\n    ON A.DISPLAY = E.DATA_ID\n      AND E.GROUP_ID = \'YES_OR_NO\'\n  LEFT JOIN PLAT_DICT F\n    ON A.ENABLE = F.DATA_ID\n      AND F.GROUP_ID = \'YES_OR_NO\'','plat');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('bc3e213a-8ab2-4f04-8b75-2dfff2c4b140','菜单列表','PlatMenuList','plat_menu_list','SELECT\n  S.*,\n  S1.PRODUCT_CODE\nFROM (SELECT\n        A.*,\n        B.MODEL_NAME,\n        C.DATA_NAME      AS MENU_TYPE_NAME,\n        E.NAME           AS PARENT_NAME\n      FROM PLAT_MENU A\n        LEFT JOIN PLAT_MODEL B\n          ON A.MODEL_CODE = B.MODEL_CODE\n        LEFT JOIN PLAT_DICT C\n          ON C.DATA_ID = A.MENU_TYPE\n            AND C.GROUP_ID = \'MENU_TYPE\'\n        LEFT JOIN PLAT_MENU E\n          ON A.PARENT_CODE = E.MENU_CODE) S,\n  PLAT_MODEL_PRO S1\nWHERE S.MODEL_CODE = S1.MODEL_CODE','plat');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('c1d8c9ef-568b-4ce1-938d-7b23b555e123','菜单角色列表','PlatRoleList','plat_role_list','SELECT\n  A.*,\n  C.ENT_NAME,\n  E.DATA_NAME AS ROLE_TYPE_NAME,\n  \'\'          AS ACTIVE_ENT_CODE\nFROM PLAT_ROLE A\n  LEFT JOIN PLAT_ENT C\n    ON A.ENT_CODE = C.ENT_CODE\n  LEFT JOIN PLAT_DICT E\n    ON E.DATA_ID = A.ROLE_TYPE\n      AND E.GROUP_ID = \'ROLE_TYPE\'\nWHERE FIND_IN_SET(A.ENT_CODE,GET_CHILD_ENT(\'A320101\'))','plat');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('c378024c-d737-44d7-8433-ba4f3fd07535','根据岗点查任务','TaskByEfence','task_by_efence','SELECT\n  T.ID                  TASKTEMP_ID,\n  T.ENT_CODE,\n  T.DEPT_ID,\n  T.TASK_CODE,\n  T.TASK_NAME,\n  T.CG_TEMPLATE_TYPE,\n  A.ID                  AREA_ID,\n  A.EFENCE_ID,\n  A.TEMP_AREA_NAME      AREA_NAME,\n  A.AREA_TYPE,\n  B.START_TIME,\n  B.END_TIME,\n  C.USER_IDS,\n  C.USER_NAMES\nFROM (SELECT *\n      FROM CG_TASKTEMP_AREA F\n      WHERE F.EFENCE_ID = 7005) A\n  LEFT JOIN CG_TASK_TEMPLATE T\n    ON A.TASKTEMP_ID = T.ID\n  LEFT JOIN (SELECT *\n             FROM CG_TASKTEMP_AREATIME E\n             GROUP BY E.TASKTEMP_ID,E.EFENCE_ID,E.START_TIME,E.END_TIME) B\n    ON T.ID = B.TASKTEMP_ID\n      AND B.EFENCE_ID = A.EFENCE_ID\n  LEFT JOIN (SELECT\n               U.TEMP_ID,\n               U.EFENCE_ID,\n               GROUP_CONCAT(U.USER_ID)    USER_IDS,\n               GROUP_CONCAT(U.USER_NAME)    USER_NAMES\n             FROM CG_TASKTEMP_USER U\n             GROUP BY U.TEMP_ID,U.EFENCE_ID) C\n    ON T.ID = C.TEMP_ID\n      AND A.EFENCE_ID = C.EFENCE_ID','cg');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('cd6f8c9f-5193-43a8-9f55-cfb1ce709a3a','消息列表','PlatSmsList','plat_sms_list','SELECT\n  *,\n  B.NAME AS SRC_NAME,\n  B.IMG_URL AS SRC_IMG_URL,\n  C.NAME AS TARGET_NAME,\n  C.IMG_URL AS TARGET_IMG_URL\nFROM PLAT_SMS A\n  LEFT JOIN PLAT_USER B\n    ON A.SRC_CODE = B.USER_CODE\n  LEFT JOIN PLAT_USER C\n    ON A.TARGET_CODE = C.USER_CODE','plat');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('ce7d9df4-e6bc-4fad-b4b0-0a78ce84fcf6','设备分组类型列表','GroupTypeList','group_type_list','SELECT\n  A.*,\n  A.GROUP_ID AS ID,\n  B.ID        AS DEV_TYPE_ID,\n  B.DEV_TYPE,\n  B.DATA_ROLE_ID,\n  D.NAME AS DATA_ROLE_NAME,\n  C.DATA_NAME AS DEV_TYPE_NAME\nFROM T_GROUP_LIST A\n  LEFT JOIN SDE_GROUP_TYPE B\n    ON A.GROUP_ID = B.DEV_ID\n  LEFT JOIN CONF_DICTIONARIES C\n    ON C.GROUP_ID = \'ROOM_TYPE\'\n      AND C.DATA_ID = B.DEV_TYPE\n LEFT JOIN sde_role D ON D.ID = B.DATA_ROLE_ID','sde');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('d081ad5c-09e5-4ecd-9fbf-e974ce9729af','参与率统计表','ParticipationReport','participation_report','SELECT\n  A.ID,\n  A.NAME,\n  A.BUILD_DATE,\n  B.NAME     AS STREET_NAME,\n  C.NAME     AS COMMUNITY_NAME,\n  D.EXTEND_INDEXD AS AREA_NAME,\n  D.ENT_NAME,\n  A.CREATE_TIME,\n  A.INHABITANTS_NUM,\n  E.USER_COUNT,\n  E.USER_COUNT / A.INHABITANTS_NUM AS ACCOUNT_RATE,\n  F.PARTICIPANTS AS CYLJ_PARTICIPANTS,\n  G.PARTICIPANTS AS KHSLJ_PARTICIPANTS,\n  H.RESIDENT_COUNT AS CYLJ_RESIDENT_COUNT,\n  I.RESIDENT_COUNT AS KHSLJ_RESIDENT_COUNT,\n  F.PARTICIPANTS / A.INHABITANTS_NUM AS CYLJ_PARTICIPATION_RATE,\n  G.PARTICIPANTS / A.INHABITANTS_NUM AS KHSLJ_PARTICIPATION_RATE,\n  H.RESIDENT_COUNT / A.INHABITANTS_NUM AS CYLJ_PARTICIPATION_NUM_RATE,\n  I.RESIDENT_COUNT / A.INHABITANTS_NUM AS KHSLJ_PARTICIPATION_NUM_RATE,\n  J.NEW_USER_COUNT\nFROM GCMS_REFUSE_CLS_UNITS A\nLEFT JOIN ECS_STREETS B    ON A.EX1 = B.CODE\nLEFT JOIN ECS_STREETS C    ON A.EX2 = C.CODE\nLEFT JOIN CONF_ENT D    ON A.ENT_CODE = D.ENT_CODE\nLEFT JOIN (SELECT A.UNITS_ID,COUNT(*) AS USER_COUNT FROM GCMS_RESIDENT_INFO A GROUP BY A.UNITS_ID)   E   ON E.UNITS_ID = A.ID\nLEFT JOIN ( SELECT A.CREATE_TIME, COUNT(*) AS PARTICIPANTS,B.UNITS_ID\n             FROM GCMS_GARBAGE_DISPOSAL A,GCMS_RESIDENT_INFO B\n             WHERE A.RESIDENT_ID=B.ID AND  A.TYPE_ONE = \'20000\'\n                 AND A.CREATE_TIME < \'2019-11-09 00:00:00\'\n                 AND A.CREATE_TIME > \'2019-09-09 00:00:00\'\n                  AND A.ISDEL = 0\n             GROUP BY B.UNITS_ID\n         ) F ON A.ID = F.UNITS_ID\nLEFT JOIN ( SELECT  A.CREATE_TIME, COUNT(*) AS PARTICIPANTS,B.UNITS_ID\n             FROM GCMS_GARBAGE_DISPOSAL A,GCMS_RESIDENT_INFO B\n             WHERE A.RESIDENT_ID=B.ID AND  A.TYPE_ONE = \'10000\'\n                 AND A.CREATE_TIME < \'2019-11-09 00:00:00\'\n                 AND A.CREATE_TIME > \'2019-09-09 00:00:00\'\n                  AND A.ISDEL = 0\n             GROUP BY B.UNITS_ID ) G ON A.ID = G.UNITS_ID\nLEFT JOIN (SELECT\n               S.RESIDENT_ID, S.UNITS_ID,COUNT(*) AS RESIDENT_COUNT\n             FROM (SELECT  A.RESIDENT_ID,B.UNITS_ID\n                   FROM GCMS_GARBAGE_DISPOSAL A,GCMS_RESIDENT_INFO B\n                   WHERE B.ID = A.RESIDENT_ID AND  A.TYPE_ONE = \'20000\'\n                    AND  A.CREATE_TIME < \'2019-11-09 00:00:00\'\n                    AND A.CREATE_TIME > \'2019-09-09 00:00:00\' \n                     AND A.ISDEL = 0                      \n                   GROUP BY A.RESIDENT_ID) S\n             GROUP BY S.UNITS_ID) H ON A.ID = H.UNITS_ID\nLEFT JOIN (SELECT\n               S.RESIDENT_ID, S.UNITS_ID,COUNT(*) AS RESIDENT_COUNT\n             FROM (SELECT  A.RESIDENT_ID,B.UNITS_ID\n                   FROM GCMS_GARBAGE_DISPOSAL A,GCMS_RESIDENT_INFO B\n                   WHERE B.ID = A.RESIDENT_ID AND  A.TYPE_ONE = \'10000\'\n                    AND A.ISDEL = 0\n                    AND  A.CREATE_TIME < \'2019-11-09 00:00:00\'\n                    AND A.CREATE_TIME > \'2019-09-09 00:00:00\'                       \n                   GROUP BY A.RESIDENT_ID) S\n             GROUP BY S.UNITS_ID) I ON A.ID = I.UNITS_ID\nLEFT JOIN (SELECT A.UNITS_ID,COUNT(*) AS NEW_USER_COUNT FROM GCMS_RESIDENT_INFO A WHERE  A.CREATE_TIME < \'2019-11-09 00:00:00\'\n                    AND A.CREATE_TIME > \'2019-09-09 00:00:00\' GROUP BY A.UNITS_ID) J ON A.ID = J.UNITS_ID','gcms');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('dacfce5b-61b6-4314-bff1-b92fcb5c9367','垃圾类型列表','GarbageTypeList','garbage_type_list','SELECT   A.*,B.NAME AS PARENT_NAME,  CASE A.IS_MIN WHEN 0 THEN \'否\' ELSE \'是\' END AS IS_MIN_NAME ,CASE A.IS_MAX_TYPE WHEN 0 THEN \'否\' ELSE \'是\' END AS IS_MAX_TYPE_NAME  FROM GCMS_GARBAGE_TYPE A     LEFT JOIN GCMS_GARBAGE_TYPE B  ON A.PARENT_CODE = B.CODE','gcms');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('dad878c6-e530-474e-8ecc-59e44b3c00e5','金沙田设备记录','JstRecordList','jst_record_list','SELECT\n  A.*,\n  B.NAME     AS GARBAGE_TYPE_NAME,\n  C.DEV_NAME\nFROM gcms_dev_record A\n  LEFT JOIN GCMS_GARBAGE_TYPE B\n    ON A.GAR_TYPE = b.CODE\n  LEFT JOIN GCMS_DEV_INFO C\n    ON A.DEV_ID = C.DEV_ID','gcms');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('dc292382-92a1-4d04-8801-585944db39ea','分组统计岗点数','PointGroupReport','point_group_report','SELECT\n  A.ENT_CODE,\n  A.DEPT_ID,\n  A.AREA_TYPE,\n  A.TAGS,\n  A.POST_ID,\n  B.ENT_NAME,\n  C.NAME AS DEP_NAME,\n  \'\' AS ACTIVE_ENT_CODE,\n  0 AS CPCS,\n  0.0 AS ZGSC,\n  0.0 AS SUM_A_MILEAGE,\n  COUNT(*) AS EFENCE_COUNT\nFROM CG_EFENCE A,\n  CONF_ENT B,\n  CONF_DEPARTMENT C\nWHERE FIND_IN_SET(A.ENT_CODE,QUERYCHILDENTINFO(320101))\n    AND A.ENT_CODE = B.ENT_CODE\n    AND C.ID = A.DEPT_ID\n    GROUP BY A.DEPT_ID','cg');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('e69b2a35-6665-4970-a166-44578e5d8444','排期列表','ReceptionList','reception_list','SELECT\n  G.*,\n  A.CASE_CODE,\n  A.CASE_NAME,\n  B.DATA_NAME   AS CASE_TYPE_NAME,\n  C.NAME        AS DEP_NAME,\n  D.NAME        AS CHIEF_JUDGE_NAME,\n  E.NAME        AS UNDERTAKER_NAME,\n  F.NAME        AS CLERK_NAME,\n  H.ROOM_NAME,\n  G.CREATE_TIME AS RECEPTION_TIME\nFROM FFS_CASE_RECEPTION G\n  LEFT JOIN FFS_CASE A\n    ON A.ID = G.CASE_ID\n  LEFT JOIN CONF_DICTIONARIES B\n    ON A.CASE_TYPE = B.DATA_ID\n      AND B.GROUP_ID = \'CASE_TYPE\'\n  LEFT JOIN CONF_DEPARTMENT C\n    ON C.ID = A.DEPARTMENT_ID\n  LEFT JOIN CONF_USER D\n    ON D.ID = A.CHIEF_JUDGE_ID\n  LEFT JOIN CONF_USER E\n    ON E.ID = A.UNDERTAKER_ID\n  LEFT JOIN CONF_USER F\n    ON F.ID = A.CLERK_ID\n  LEFT JOIN CONF_ROOM H\n    ON H.ID = G.ROOM_ID','ffs');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('e9b6bafc-b0e6-4221-a1c1-71ef2f502690','产品列表','PlatProductList','plat_product_list','SELECT\n  A.*,\n  B.MODEL_NAMES\nFROM PLAT_PRODUCT A\n  LEFT JOIN (SELECT\n               PLAT_MODEL_PRO.PRODUCT_CODE,\n               GROUP_CONCAT(PLAT_MODEL.MODEL_NAME,\'\') AS MODEL_NAMES\n             FROM PLAT_MODEL,\n               PLAT_MODEL_PRO\n             WHERE PLAT_MODEL.MODEL_CODE = PLAT_MODEL_PRO.MODEL_CODE\n             GROUP BY PLAT_MODEL_PRO.PRODUCT_CODE) B\n    ON A.PRODUCT_CODE = B.PRODUCT_CODE','plat');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('ea91d466-43ee-4c46-bf65-23ea65593255','商品兑换列表','CommodityList','commodity_list','SELECT\n  A.*,\n  C.SUM_NUM,\n  C.SUM_INTEGRAL_USED\nFROM GCMS_COMMODITY A\n  LEFT JOIN (SELECT\n               B.PRODUCT_CODE,\n               SUM(B.NUM)           AS SUM_NUM,\n               SUM(B.INTEGRAL_USED) AS SUM_INTEGRAL_USED\n             FROM GCMS_INTEGRAL_EXCHANGE B\n             GROUP BY B.PRODUCT_CODE) C\n    ON A.ID = C.PRODUCT_CODE','gcms');
insert  into `t_model_sql`(`id`,`comment`,`class_name`,`name`,`str_sql`,`model_id`) values ('f5ee72f3-ac8e-40b0-840e-66587cbe2fa3','岗点考勤明细','PointAreaList','point_area_list','SELECT\n	S.*,\n	SUM(S.A_MILEAGE)/1000 AS SUM_A_MILEAGE,\n	COUNT(*) AS CPCS \nFROM (                                                                                                 \n	SELECT \n		B.ID       AS PARENT_ID,\n		B.TITLE,\n		B.ENT_CODE AS EFENCE_ENT_CODE,\n		B.TAGS,\n		B.DEPT_ID AS EFENCE_DEP_ID,\n		E.NAME     AS USER_NAME,\n		E.ENT_CODE AS USER_ENT_CODE,\n		D.ENT_NAME AS USER_ENT_NAME,\n		D.EXTEND_INDEXA AS USER_DEP_ID,\n		C.*,COUNT(*)*10/60 AS ZGSC\n	FROM CG_TASKTEMP_USER A,\n	   CG_EFENCE B,\n	   CG_USER_MIN_REPORT C ,\n	   CONF_USER E,\n	   CONF_ENT D\n	WHERE A.EFENCE_ID = B.ID\n		AND E.ENT_CODE = D.ENT_CODE\n		AND C.USER_ID = E.ID\n		AND B.AREA_TYPE = 2\n		AND B.ENT_CODE = 320102\n		AND A.USER_ID = C.USER_ID\n	    AND C.CHECK_TIME > \'2019-12-16 00:40:00\'\n	    AND C.CHECK_TIME < \'2019-12-16 23:40:00\'\n	    AND C.ATTENDANCE_CHECK =1\n	    GROUP BY C.CUUID \n	)S \nGROUP BY S.PARENT_ID','cg');

/*Table structure for table `t_project_model` */

DROP TABLE IF EXISTS `t_project_model`;

CREATE TABLE `t_project_model` (
  `id` varchar(64) NOT NULL,
  `ip` varchar(256) DEFAULT NULL,
  `model_id` varchar(64) DEFAULT NULL,
  `code_folder` varchar(256) DEFAULT NULL,
  `author` varchar(32) DEFAULT NULL,
  `version` varchar(32) DEFAULT NULL,
  `packages` varchar(32) DEFAULT NULL,
  `url_prefix` varchar(32) DEFAULT NULL,
  `db_schema` varchar(16) DEFAULT NULL,
  `pwd` varchar(32) DEFAULT NULL,
  `user` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `NewIndex1` (`model_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `t_project_model` */

insert  into `t_project_model`(`id`,`ip`,`model_id`,`code_folder`,`author`,`version`,`packages`,`url_prefix`,`db_schema`,`pwd`,`user`) values ('0305b43d-20bc-43c0-8a57-06c01a2e0f71','192.168.3.132','sde','d:/plugins','吕孝怀','V100R002C02B01-SNAPSHOT','com.huaiye.plugin.sde',NULL,'chcdb','root','root');
insert  into `t_project_model`(`id`,`ip`,`model_id`,`code_folder`,`author`,`version`,`packages`,`url_prefix`,`db_schema`,`pwd`,`user`) values ('174f0525-1c46-4859-8f03-b1d47d74f8b1','192.168.3.132','psms','d:/plugins','吕孝怀','V100R002C01-SNAPSHOT','com.huaiye.plugin.psms',NULL,'psmsdb','root','root');
insert  into `t_project_model`(`id`,`ip`,`model_id`,`code_folder`,`author`,`version`,`packages`,`url_prefix`,`db_schema`,`pwd`,`user`) values ('44bc9492-fa53-4dda-bf0b-4fcf970b6b16','192.168.3.132','ffs','d:/plugins','吕孝怀','V100R002C02B01-SNAPSHOT','com.huaiye.plugin.ffs',NULL,'ffsdb','root','root');
insert  into `t_project_model`(`id`,`ip`,`model_id`,`code_folder`,`author`,`version`,`packages`,`url_prefix`,`db_schema`,`pwd`,`user`) values ('542d03cb-c3b5-45fc-821e-f6af4b18ab9f','192.168.3.132','cg','d:/plugins','吕孝怀','V100R002C01-SNAPSHOT','com.huaiye.plugin.cg','2','36cgdb','root','root');
insert  into `t_project_model`(`id`,`ip`,`model_id`,`code_folder`,`author`,`version`,`packages`,`url_prefix`,`db_schema`,`pwd`,`user`) values ('6bd26b2a-7788-4298-b889-be04f121c9bc','192.168.3.132','ecs','d:/plugins','吕孝怀','V100R002C03B01-SNAPSHOT','com.huaiye.plugin.ecs',NULL,'somdb','root','root');
insert  into `t_project_model`(`id`,`ip`,`model_id`,`code_folder`,`author`,`version`,`packages`,`url_prefix`,`db_schema`,`pwd`,`user`) values ('851eda09-7879-4c4f-9ed9-40f1448db525','192.168.2.132','plat','d:/plugins','吕孝怀','V100R002C01-SNAPSHOT','com.huaiye.plugin.plat',NULL,'platform','root','root');
insert  into `t_project_model`(`id`,`ip`,`model_id`,`code_folder`,`author`,`version`,`packages`,`url_prefix`,`db_schema`,`pwd`,`user`) values ('9a317d89-e242-4049-81d8-a6a49bfeea1c','192.168.3.132','gcms','d:/plugins','吕孝怀','V100R002C03B01-SNAPSHOT','com.huaiye.plugin.gcms',NULL,'somdb','root','root');
insert  into `t_project_model`(`id`,`ip`,`model_id`,`code_folder`,`author`,`version`,`packages`,`url_prefix`,`db_schema`,`pwd`,`user`) values ('a5753865-3873-468d-86e9-f1665c895133','192.168.3.132','api','d:/plugins','吕孝怀','V100R002C01-SNAPSHOT','com.huaiye.plugin.api','3','apidb','root','root');
insert  into `t_project_model`(`id`,`ip`,`model_id`,`code_folder`,`author`,`version`,`packages`,`url_prefix`,`db_schema`,`pwd`,`user`) values ('a6a79145-c32b-466d-945d-663ec729b4ab','192.168.3.132','chc','d:/plugins','吕孝怀','V100R002C01C01-SNAPSHOT','com.huaiye.plugin.chc',NULL,'chcdb','root','root');

/*Table structure for table `t_server` */

DROP TABLE IF EXISTS `t_server`;

CREATE TABLE `t_server` (
  `id` varchar(128) NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  `ip` varchar(64) DEFAULT NULL,
  `type` varchar(2) DEFAULT NULL,
  `user` varchar(64) DEFAULT NULL,
  `pwd` varchar(64) DEFAULT NULL,
  `mac` varchar(64) DEFAULT NULL,
  `mask` varchar(64) DEFAULT NULL,
  `gateway` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `t_server` */

insert  into `t_server`(`id`,`name`,`ip`,`type`,`user`,`pwd`,`mac`,`mask`,`gateway`) values ('225e05ec-a82b-4880-b785-762ea4662e0d','28','192.168.3.28',NULL,'root','huaiye2013**',NULL,NULL,NULL);
insert  into `t_server`(`id`,`name`,`ip`,`type`,`user`,`pwd`,`mac`,`mask`,`gateway`) values ('2db7131f-8b2b-4000-9dab-22302fb2b583','3.131','192.168.3.131',NULL,'root','root',NULL,NULL,NULL);
insert  into `t_server`(`id`,`name`,`ip`,`type`,`user`,`pwd`,`mac`,`mask`,`gateway`) values ('4a9a304d-2827-44b8-8def-72e426dd42ac','3.131','192.168.3.131',NULL,'root3','root3',NULL,NULL,NULL);
insert  into `t_server`(`id`,`name`,`ip`,`type`,`user`,`pwd`,`mac`,`mask`,`gateway`) values ('ae973c55-549f-46e0-8386-a1547b375ec3','3.131','192.168.3.131',NULL,'root','root',NULL,NULL,NULL);

/* Function  structure for function  `FUNC_GETREACHTIMES` */

/*!50003 DROP FUNCTION IF EXISTS `FUNC_GETREACHTIMES` */;
DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` FUNCTION `FUNC_GETREACHTIMES`( V_REACHSTR TEXT ) RETURNS int(11)
BEGIN
    DECLARE R_REACHTIME INT(11) DEFAULT 0 ;
	-- 先计算0,1的情况
	set R_REACHTIME = ROUND( ( LENGTH( V_REACHSTR ) - LENGTH( REPLACE( V_REACHSTR ,'0,1', '')) ) / LENGTH('0,1') ) ;
	-- 再计算$,1的情况
	SET R_REACHTIME = ROUND( ( LENGTH( V_REACHSTR ) - LENGTH( REPLACE( V_REACHSTR ,'$,1', '')) ) / LENGTH('$,1') ) + R_REACHTIME ;
    RETURN R_REACHTIME;
END */$$
DELIMITER ;

/* Function  structure for function  `F_GET_BILL_NO` */

/*!50003 DROP FUNCTION IF EXISTS `F_GET_BILL_NO` */;
DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` FUNCTION `F_GET_BILL_NO`(V_SERIES_CODE VARCHAR(32)) RETURNS varchar(32) CHARSET utf8
    NO SQL
BEGIN
DECLARE NEWCODE VARCHAR(32) DEFAULT '-1';
CALL P_GET_BILL_NO(V_SERIES_CODE,NEWCODE);
RETURN NEWCODE;
END */$$
DELIMITER ;

/* Function  structure for function  `GET_RATIO` */

/*!50003 DROP FUNCTION IF EXISTS `GET_RATIO` */;
DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` FUNCTION `GET_RATIO`() RETURNS int(11)
BEGIN
RETURN 10;
END */$$
DELIMITER ;

/* Function  structure for function  `HYFUNC_DATA_ROLE_ANME` */

/*!50003 DROP FUNCTION IF EXISTS `HYFUNC_DATA_ROLE_ANME` */;
DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` FUNCTION `HYFUNC_DATA_ROLE_ANME`( P_USER_ID INT(10) ) RETURNS varchar(1024) CHARSET utf8
BEGIN
     DECLARE STEMP VARCHAR(1024);
     SELECT IFNULL ((SELECT GROUP_CONCAT( conf_data_role.NAME) FROM conf_data_role,conf_user_data_role WHERE conf_user_data_role.DATA_ROLE_ID = conf_data_role.ID AND conf_user_data_role.USER_ID = P_USER_ID ), '' )
     INTO STEMP
     FROM DUAL;
     RETURN STEMP;
END */$$
DELIMITER ;

/* Function  structure for function  `HYFUNC_GETDATAROLENAMEBYUSER` */

/*!50003 DROP FUNCTION IF EXISTS `HYFUNC_GETDATAROLENAMEBYUSER` */;
DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` FUNCTION `HYFUNC_GETDATAROLENAMEBYUSER`( P_USER_ID INT(10) ) RETURNS varchar(1024) CHARSET utf8
BEGIN
     DECLARE STEMP VARCHAR(1024);
     SELECT IFNULL ((SELECT GROUP_CONCAT( CONF_DATA_ROLE.NAME) FROM CONF_DATA_ROLE,CONF_USER_DATA_ROLE WHERE CONF_USER_DATA_ROLE.DATA_ROLE_ID = CONF_DATA_ROLE.ID AND CONF_USER_DATA_ROLE.USER_ID = P_USER_ID ), '' )
     INTO STEMP
     FROM DUAL;
     RETURN STEMP;
END */$$
DELIMITER ;

/* Function  structure for function  `HYFUNC_GETDEPNAMEBYUSER` */

/*!50003 DROP FUNCTION IF EXISTS `HYFUNC_GETDEPNAMEBYUSER` */;
DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` FUNCTION `HYFUNC_GETDEPNAMEBYUSER`( P_USER_ID INT(10) ) RETURNS varchar(1024) CHARSET utf8
BEGIN
     DECLARE STEMP VARCHAR(1024);
     SELECT IFNULL ((SELECT GROUP_CONCAT( CONF_DEPARTMENT.NAME) FROM CONF_DEPARTMENT,CONF_USER_DEP WHERE CONF_USER_DEP.DEP_ID = CONF_DEPARTMENT.ID AND CONF_USER_DEP.USER_ID = P_USER_ID ), '' )
     INTO STEMP
     FROM DUAL;
     RETURN STEMP;
END */$$
DELIMITER ;

/* Function  structure for function  `HYFUNC_GETEVENT_BYUSER` */

/*!50003 DROP FUNCTION IF EXISTS `HYFUNC_GETEVENT_BYUSER` */;
DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` FUNCTION `HYFUNC_GETEVENT_BYUSER`( P_LOGIN_NAME VARCHAR(32),P_ENT_CODE VARCHAR(32) ) RETURNS varchar(1024) CHARSET utf8
BEGIN
     DECLARE STEMP VARCHAR(1024);
    SELECT
  IFNULL ((SELECT
  GROUP_CONCAT( ecs_events_person.EVENT_ID,'_',ecs_events_person.EMP_ENT_CODE)
FROM ecs_events_person,
  ecs_events_info
WHERE ecs_events_person.EXTEND_COL1 = P_LOGIN_NAME
    AND ecs_events_person.EMP_ENT_CODE = P_ENT_CODE
    AND ecs_events_person.EVENT_ID = ecs_events_info.ID
    AND  ecs_events_info.EVENT_STATE < 2 ), '' )
     INTO STEMP
     FROM DUAL;
     RETURN STEMP;
END */$$
DELIMITER ;

/* Function  structure for function  `HYFUNC_GETMEETINGMEMBERS` */

/*!50003 DROP FUNCTION IF EXISTS `HYFUNC_GETMEETINGMEMBERS` */;
DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` FUNCTION `HYFUNC_GETMEETINGMEMBERS`( P_MEETING_ID INT(10) ) RETURNS varchar(1024) CHARSET utf8
BEGIN
     DECLARE STEMP VARCHAR(2048);
     SELECT IFNULL ((SELECT GROUP_CONCAT(CONF_USER.NAME) FROM CONF_USER WHERE CONF_USER.ID IN (SELECT CONF_MEETING_USER.USER_ID FROM CONF_MEETING_USER,CONF_MEETING WHERE CONF_MEETING.ID=CONF_MEETING_USER.MEETING_ID AND CONF_MEETING.ID= P_MEETING_ID) ), '' )
     INTO STEMP
     FROM DUAL;
     RETURN STEMP;
END */$$
DELIMITER ;

/* Function  structure for function  `HYFUNC_GETROLENAMEBYUSER` */

/*!50003 DROP FUNCTION IF EXISTS `HYFUNC_GETROLENAMEBYUSER` */;
DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` FUNCTION `HYFUNC_GETROLENAMEBYUSER`( P_USER_ID INT(10) ) RETURNS varchar(1024) CHARSET utf8
BEGIN
     DECLARE STEMP VARCHAR(1024);
     SELECT IFNULL ((SELECT GROUP_CONCAT( CONF_ROLE.NAME) FROM CONF_ROLE,CONF_USER_ROLE WHERE CONF_USER_ROLE.ROLE_ID = CONF_ROLE.ID AND CONF_USER_ROLE.USER_ID = P_USER_ID ), '' )
     INTO STEMP
     FROM DUAL;
     RETURN STEMP;
END */$$
DELIMITER ;

/* Function  structure for function  `hyfunc_nextval` */

/*!50003 DROP FUNCTION IF EXISTS `hyfunc_nextval` */;
DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` FUNCTION `hyfunc_nextval`(seqName VARCHAR(50)) RETURNS int(11)
BEGIN
DECLARE newValue INT;
DECLARE prefixVal INT;
SET prefixVal = (SELECT CAST(config_value AS SIGNED) config_value FROM conf_info WHERE config_name = 'SEQ_PREFIX');
UPDATE conf_sequence SET current_value = current_value + increment WHERE seq_name = seqName;
SET newValue = (SELECT current_value FROM conf_sequence WHERE seq_name = seqName);
IF newValue IS NULL THEN
	SET newValue = 100000;
	INSERT INTO conf_sequence (seq_name, current_value, increment) VALUES (seqName, 100001, 1);
END IF;
RETURN COALESCE(prefixVal,10)*1000000+newValue;
END */$$
DELIMITER ;

/* Function  structure for function  `queryChildDeptInfoForReport` */

/*!50003 DROP FUNCTION IF EXISTS `queryChildDeptInfoForReport` */;
DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` FUNCTION `queryChildDeptInfoForReport`( entCode VARCHAR(32) , deptCode VARCHAR(32) ) RETURNS varchar(4000) CHARSET utf8
BEGIN
DECLARE sTemp VARCHAR(4000);
DECLARE sTempChd VARCHAR(4000);
SET sTemp='$';
SET sTempChd = CAST(deptCode AS CHAR);
IF ( entCode = -1 )
THEN 
	SELECT CONCAT(sTemp,',',GROUP_CONCAT(id)) INTO sTemp FROM conf_department;
elseIF ( deptCode = -1 )
THEN 
	SELECT CONCAT(sTemp,',',GROUP_CONCAT(id)) INTO sTemp FROM conf_department where ent_code = entCode ;
ELSE
	WHILE sTempChd IS NOT NULL DO
		SET sTemp= CONCAT(sTemp,',',sTempChd);
		SELECT GROUP_CONCAT(id) INTO sTempChd FROM conf_department WHERE FIND_IN_SET(PARENT_id,sTempChd)>0;
	END WHILE;
END IF ;
RETURN sTemp;
END */$$
DELIMITER ;

/* Function  structure for function  `queryChildEntInfo` */

/*!50003 DROP FUNCTION IF EXISTS `queryChildEntInfo` */;
DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` FUNCTION `queryChildEntInfo`(entCode varchar(32)) RETURNS varchar(4000) CHARSET utf8
BEGIN
DECLARE sTemp VARCHAR(4000);
DECLARE sTempChd VARCHAR(4000);
SET sTemp='$';
SET sTempChd = CAST(entCode AS CHAR);
WHILE sTempChd IS NOT NULL DO
SET sTemp= CONCAT(sTemp,',',sTempChd);
SELECT GROUP_CONCAT(ent_CODE) INTO sTempChd FROM conf_ent WHERE FIND_IN_SET(PARENT_CODE,sTempChd)>0;
END WHILE;
RETURN sTemp;
END */$$
DELIMITER ;

/* Function  structure for function  `queryChildEntInfoForReport` */

/*!50003 DROP FUNCTION IF EXISTS `queryChildEntInfoForReport` */;
DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` FUNCTION `queryChildEntInfoForReport`( entCode VARCHAR(32) , deptCode VARCHAR(32) ) RETURNS varchar(4000) CHARSET utf8
BEGIN
DECLARE sTemp VARCHAR(4000);
DECLARE sTempChd VARCHAR(4000);
SET sTemp='$';
SET sTempChd = CAST(entCode AS CHAR);
IF ( deptCode != -1)
THEN 
	SET sTemp= CONCAT(sTemp,',',sTempChd);
ELSEIF ( entCode = -1 )
then
	SELECT CONCAT(sTemp,',',GROUP_CONCAT(ent_CODE)) INTO sTemp FROM conf_ent;
else
	WHILE sTempChd IS NOT NULL DO
		SET sTemp= CONCAT(sTemp,',',sTempChd);
		SELECT GROUP_CONCAT(ent_CODE) INTO sTempChd FROM conf_ent WHERE FIND_IN_SET(PARENT_CODE,sTempChd)>0;
	END WHILE;
END IF ;
RETURN sTemp;
END */$$
DELIMITER ;

/* Function  structure for function  `snakeToCamel` */

/*!50003 DROP FUNCTION IF EXISTS `snakeToCamel` */;
DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`%` FUNCTION `snakeToCamel`(snakeString VARCHAR(16383)) RETURNS varchar(16383) CHARSET utf8
BEGIN
    set snakeString = replace(snakeString, '_a', 'A');
    set snakeString = replace(snakeString, '_b', 'B');
    set snakeString = replace(snakeString, '_c', 'C');
    set snakeString = replace(snakeString, '_d', 'D');
    set snakeString = replace(snakeString, '_e', 'E');
    set snakeString = replace(snakeString, '_f', 'F');
    set snakeString = replace(snakeString, '_g', 'G');
    set snakeString = replace(snakeString, '_h', 'H');
    set snakeString = replace(snakeString, '_i', 'I');
    set snakeString = replace(snakeString, '_j', 'J');
    set snakeString = replace(snakeString, '_k', 'K');
    set snakeString = replace(snakeString, '_l', 'L');
    set snakeString = replace(snakeString, '_m', 'M');
    set snakeString = replace(snakeString, '_n', 'N');
    set snakeString = replace(snakeString, '_o', 'O');
    set snakeString = replace(snakeString, '_p', 'P');
    set snakeString = replace(snakeString, '_q', 'Q');
    set snakeString = replace(snakeString, '_r', 'R');
    set snakeString = replace(snakeString, '_s', 'S');
    set snakeString = replace(snakeString, '_t', 'T');
    set snakeString = replace(snakeString, '_u', 'U');
    set snakeString = replace(snakeString, '_v', 'V');
    set snakeString = replace(snakeString, '_w', 'W');
    set snakeString = replace(snakeString, '_x', 'X');
    set snakeString = replace(snakeString, '_y', 'Y');
    set snakeString = replace(snakeString, '_z', 'Z');
    set snakeString = replace(snakeString, '_', '');
    RETURN snakeString;
  END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
