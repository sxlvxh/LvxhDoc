package com.huaiye.plugin.plat.util;

public class SqlData {
	public static final String fourEventList = "SELECT\r\n" + 
			"  a.*,\r\n" + 
			"  d.DATA_NAME AS CLASSIFY_NAME,\r\n" + 
			"  e.DATA_NAME AS GRADE_NAME,\r\n" + 
			"  f.DATA_NAME AS STATE_NAME,\r\n" + 
			"  g.NAME      AS HEAD_PER_NAME,\r\n" + 
			"  ''          AS EXEC_NAME,\r\n" + 
			"  0           AS EXEC_ID,\r\n" + 
			"  H.ENT_NAME,\r\n" + 
			"  J.NAME      AS PLAN_EXEC_NAME,\r\n" + 
			"  J.EMP_count,\r\n" + 
			"  K.CASE_CODE,\r\n" + 
			"  K.CASE_NAME,\r\n" + 
			"  m.BCS_ID,\r\n" + 
			"  N.NAME      AS DEPT_NAME,\r\n" + 
			"  m.area_type\r\n" + 
			"FROM (SELECT\r\n" + 
			"        b.*,\r\n" + 
			"        ''           AS ACTIVE_ENT_CODE\r\n" + 
			"      FROM ecs_events_info b\r\n" + 
			"      WHERE FIND_IN_SET(b.ENT_CODE,queryChildEntInfo(10000))) a\r\n" + 
			"  LEFT JOIN conf_dictionaries d\r\n" + 
			"    ON (a.CLASSIFY = d.DATA_ID\r\n" + 
			"        AND d.GROUP_ID = 'EVENT_CLASSIFY')\r\n" + 
			"  LEFT JOIN conf_dictionaries e\r\n" + 
			"    ON (a.GRADE = e.DATA_ID\r\n" + 
			"        AND e.GROUP_ID = 'EVENT_GRADE')\r\n" + 
			"  LEFT JOIN conf_dictionaries f\r\n" + 
			"    ON (a.EVENT_STATE = f.DATA_ID\r\n" + 
			"        AND f.GROUP_ID = 'EVENT_STATE')\r\n" + 
			"  LEFT JOIN CONF_USER G\r\n" + 
			"    ON (A.HEAD_PERSON = G.ID)\r\n" + 
			"  LEFT JOIN CONF_ENT H\r\n" + 
			"    ON A.ENT_CODE = H.ent_CODE\r\n" + 
			"  LEFT JOIN (SELECT\r\n" + 
			"               EVENT_ID,\r\n" + 
			"               GROUP_CONCAT(b.name SEPARATOR ',') AS NAME,\r\n" + 
			"               COUNT(1)     AS EMP_count\r\n" + 
			"             FROM ecs_events_person a\r\n" + 
			"               JOIN CONF_USER b\r\n" + 
			"                 ON a.PERSON_ID = b.id\r\n" + 
			"             WHERE a.isdel = 0\r\n" + 
			"             GROUP BY EVENT_ID) J\r\n" + 
			"    ON A.ID = J.EVENT_ID\r\n" + 
			"  LEFT JOIN ecs_case K\r\n" + 
			"    ON A.CASE_ID = K.ID\r\n" + 
			"  LEFT JOIN ecs_efence m\r\n" + 
			"    ON a.EFENCE_ID = m.id\r\n" + 
			"  LEFT JOIN conf_department N\r\n" + 
			"    ON A.DEPT_ID = N.ID\r\n" + 
			"WHERE A.REC_TYPE = '2'\r\n" + 
			"    AND a.ISDEL = 0 ";

}