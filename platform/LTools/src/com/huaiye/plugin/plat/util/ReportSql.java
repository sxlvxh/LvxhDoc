package com.huaiye.plugin.plat.util;

public class ReportSql {
  public static String cg_ent_report = "SELECT\r\n" + 
  		"  S.ENT_CODE,\r\n" + 
  		"  S.ENT_NAME,\r\n" + 
  		"  S.ID,\r\n" + 
  		"  IFNULL(SS.TASK_DATE,'') AS TASK_DATE,\r\n" + 
  		"  IFNULL(SS.TASK_DURATION_SUM,0) AS TASK_DURATION_SUM,\r\n" + 
  		"  IFNULL(SS.TASK_MILEAGE_SUM,0) AS TASK_MILEAGE_SUM,\r\n" + 
  		"  IFNULL(SS.TASK_REACH_TIMES_SUM,0) AS TASK_REACH_TIMES_SUM,\r\n" + 
  		"  '' AS ACTIVE_ENT_CODE\r\n" + 
  		"FROM (SELECT * FROM CONF_ENT WHERE FIND_IN_SET(CONF_ENT.ENT_CODE,QUERYCHILDENTINFO(320102))) S\r\n" + 
  		"  LEFT JOIN (SELECT\r\n" + 
  		"               T.UENT_CODE,\r\n" + 
  		"               T.TASK_DATE,             \r\n" + 
  		"               SUM(T.TASK_DURATION) AS TASK_DURATION_SUM,\r\n" + 
  		"               SUM(T.TASK_MILEAGE) AS TASK_MILEAGE_SUM,\r\n" + 
  		"               SUM(T.TASK_REACH_TIMES) AS TASK_REACH_TIMES_SUM\r\n" + 
  		"             FROM CG_USER_DAY_REPORT T WHERE T.TASK_DATE = ''\r\n" + 
  		"             GROUP BY T.TASK_DATE,T.UENT_CODE) SS\r\n" + 
  		"    ON S.ENT_CODE = SS.UENT_CODE";
  
  public static String cg_dep_report = "SELECT\r\n" + 
  		"  S.ENT_CODE,\r\n" + 
  		"  S.NAME,\r\n" + 
  		"  S.ID,\r\n" + 
  		"  IFNULL(SS.TASK_DATE,DATE_FORMAT(NOW(), '%Y-%m-%d')) AS TASK_DATE,\r\n" + 
  		"  IFNULL(SS.TASK_DURATION_SUM,0) AS TASK_DURATION_SUM,\r\n" + 
  		"  IFNULL(SS.TASK_MILEAGE_SUM,0) AS TASK_MILEAGE_SUM,\r\n" + 
  		"   IFNULL(SS.TASK_REACH_TIMES_SUM,0) AS TASK_REACH_TIMES_SUM\r\n" + 
  		"FROM CONF_DEPARTMENT S\r\n" + 
  		"  LEFT JOIN (SELECT\r\n" + 
  		"               T.UDEPT_ID,\r\n" + 
  		"               T.TASK_DATE,\r\n" + 
  		"               T.UENT_CODE,\r\n" + 
  		"               SUM(T.TASK_DURATION) AS TASK_DURATION_SUM,\r\n" + 
  		"               SUM(T.TASK_MILEAGE) AS TASK_MILEAGE_SUM,\r\n" + 
  		"               SUM(T.TASK_REACH_TIMES) AS TASK_REACH_TIMES_SUM\r\n" + 
  		"             FROM CG_USER_DAY_REPORT T\r\n" + 
  		"             GROUP BY T.TASK_DATE,T.UDEPT_ID) SS\r\n" + 
  		"    ON S.ID = SS.UDEPT_ID";
  
  public static String cg_week_user_report = "SELECT\r\n" + 
  		"  T2.*,\r\n" + 
  		"  T3.*\r\n" + 
  		"FROM (SELECT\r\n" + 
  		"        T.DEP_ID,\r\n" + 
  		"        T.USER_ID,\r\n" + 
  		"        T1.NAME\r\n" + 
  		"      FROM CONF_USER_DEP T,\r\n" + 
  		"        CONF_USER T1\r\n" + 
  		"      WHERE T.USER_ID = T1.ID\r\n" + 
  		"          AND T.DEP_ID = 320101) T2\r\n" + 
  		"  LEFT JOIN (SELECT\r\n" + 
  		"               T.UDEPT_ID,\r\n" + 
  		"               T.UENT_CODE,\r\n" + 
  		"               T.USER_NAME,\r\n" + 
  		"               T.USER_ID AS USERS_ID,\r\n" + 
  		"               T.TASK_DATE,\r\n" + 
  		"               SUM(T.TASK_MILEAGE) AS TASK_MILEAGE_SUM,\r\n" + 
  		"               SUM(T.TASK_REACH_TIMES) AS TASK_REACH_TIMES_SUM,\r\n" + 
  		"               SUM(T.TASK_DURATION) AS TASK_DURATION_SUM\r\n" + 
  		"             FROM CG_USER_DAY_REPORT T\r\n" + 
  		"             WHERE T.TASK_DATE = '2019-01-03'\r\n" + 
  		"                 AND T.UDEPT_ID = 320101\r\n" + 
  		"             GROUP BY T.USER_ID) T3\r\n" + 
  		"    ON T2.USER_ID = T3.USERS_ID";
  public static String cg_week_area_report = "SELECT\r\n" + 
  		"  T1.*,\r\n" + 
  		"  SS.*\r\n" + 
  		"FROM (SELECT\r\n" + 
  		"        T.ENT_CODE,\r\n" + 
  		"        T.SHAPE_TYPE,\r\n" + 
  		"        T.TITLE,\r\n" + 
  		"        T.ID\r\n" + 
  		"      FROM CG_EFENCE T\r\n" + 
  		"      WHERE T.ENT_CODE = 320101\r\n" + 
  		"          AND (T.AREA_TYPE = 3\r\n" + 
  		"                OR T.AREA_TYPE = 5)) T1\r\n" + 
  		"  LEFT JOIN (SELECT\r\n" + 
  		"               T2.UENT_CODE,\r\n" + 
  		"               T2.TASK_DATE,\r\n" + 
  		"               T2.TASK_AREA_ID,\r\n" + 
  		"               T2.TASK_AREA_NAME,\r\n" + 
  		"               SUM(T2.TASK_DURATION) AS TASK_DURATION_SUM,\r\n" + 
  		"               SUM(T2.TASK_MILEAGE) AS TASK_MILEAGE_SUM,\r\n" + 
  		"               SUM(T2.TASK_REACH_TIMES) AS TASK_REACH_TIMES_SUM\r\n" + 
  		"             FROM CG_USER_DAY_REPORT T2\r\n" + 
  		"             WHERE T2.TASK_DATE = '2019-01-03'\r\n" + 
  		"                 AND T2.UENT_CODE = 320101\r\n" + 
  		"             GROUP BY T2.TASK_DATE,T2.TASK_AREA_ID) SS\r\n" + 
  		"    ON T1.ENT_CODE = SS.UENT_CODE\r\n" + 
  		"      AND T1.ID = SS.TASK_AREA_ID";
  
  
  public static final String cg_user_POST_POLYGONS = "SELECT\r\n" + 
  		"  A.*,\r\n" + 
  		"  A2.EFENCE_ID AS TT_ID,\r\n" + 
  		"  ''           AS CG_TEMPLATE_TYPE,\r\n" + 
  		"  A3.POLYGONS,\r\n" + 
  		"  A4.POLYGONS     POST_POLYGONS\r\n" + 
  		"FROM (SELECT\r\n" + 
  		"        CG_TASKTEMP_USER.*\r\n" + 
  		"      FROM CG_TASKTEMP_USER,\r\n" + 
  		"        CG_TASK_TEMPLATE\r\n" + 
  		"      WHERE CG_TASKTEMP_USER.USER_ID = 13021494\r\n" + 
  		"          AND CG_TASK_TEMPLATE.CG_TEMPLATE_TYPE = 1\r\n" + 
  		"          AND CG_TASK_TEMPLATE.STATUS = 1\r\n" + 
  		"          AND CG_TASKTEMP_USER.TEMP_ID = CG_TASK_TEMPLATE.ID) A\r\n" + 
  		"  LEFT JOIN CG_TASKTEMP_AREA A1\r\n" + 
  		"    ON A.EFENCE_ID = A1.EFENCE_ID\r\n" + 
  		"      AND A1.TASKTEMP_ID = A.TEMP_ID\r\n" + 
  		"  LEFT JOIN CG_TASKTEMP_AREA A2\r\n" + 
  		"    ON A2.POST_ID = A1.EFENCE_ID\r\n" + 
  		"  LEFT JOIN CG_EFENCE A3\r\n" + 
  		"    ON A3.ID = A.EFENCE_ID\r\n" + 
  		"  LEFT JOIN CG_EFENCE A4\r\n" + 
  		"    ON A4.ID = A2.EFENCE_ID ";  		
}
