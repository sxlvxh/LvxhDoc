package com.lvxh.plugin.platform.utils;

import java.awt.geom.Point2D;
import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.log4j.Logger;


public class EcsUtils {
	private static final Logger LOG = Logger.getLogger(EcsUtils.class);
	
    /**
     * list对象 map转换成bean
     * @param listMap
     * @param T
     * @return
     * @throws Exception
     */
    @SuppressWarnings("rawtypes")
	public static <T> List<T> convertListMap2ListBean(List<Map<String,Object>> listMap, Class T) throws Exception {  
        List<T> beanList = new ArrayList<T>();
        if (listMap != null) {
	        for(int i=0, n=listMap.size(); i<n; i++){
	            Map<String,Object> map = listMap.get(i);
	            T bean = convertMap2Bean(map,T);
	            beanList.add(bean);
	        }
        }
        return beanList;  
    }
    
    /**
     * map转换成bean
     * @param map
     * @param T
     * @return
     * @throws Exception
     */    
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static <T> T convertMap2Bean(Map map, Class T) throws Exception {  
        if(map==null || map.size()==0){
            return null;
       }
       BeanInfo beanInfo = Introspector.getBeanInfo(T);  
       T bean = (T)T.newInstance(); 
       PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();  
       for (int i = 0, n = propertyDescriptors.length; i <n ; i++) {  
           PropertyDescriptor descriptor = propertyDescriptors[i];  
           String propertyName = descriptor.getName(); 
           //String upperPropertyName = propertyName.toUpperCase();
           if (map.containsKey(propertyName)) {           	   
        	   //if (propertyName.toUpperCase().indexOf("TIME") >0 || propertyName.toUpperCase().indexOf("DATE") >0  || propertyName.indexOf("birthday") >0  || propertyName.equals("birthday")) {
        	   String filedType = getFieldType(propertyName, bean);
        	   if (filedType.indexOf("Date") >0 ){
        		   Object value = map.get(propertyName); 
        		   if (value != null) {
        			   try{
		        		   SimpleDateFormat sdf =   new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		        		   SimpleDateFormat sdf1 =   new SimpleDateFormat("yyyy-MM-dd");
		        		   Date date ;
		        		   if (value.toString().length() == 10)
		        			   date = sdf1.parse(value.toString().replace("/", "-"));
		        		   else
		        			   date = sdf.parse(value.toString().replace("/", "-"));
		        		   BeanUtils.copyProperty(bean, propertyName, date);
        			   }catch(Exception e){
        				   LOG.debug(e.getMessage());
        				   BeanUtils.copyProperty(bean, propertyName, new Date());
        			   }	        		  
        		   }
        	   }else {
        		   try{
		               Object value = map.get(propertyName);  
		               BeanUtils.copyProperty(bean, propertyName, value);
        		   }catch(Exception e){
    				   LOG.debug(e.getMessage());
    			   }	
        	   }
           }  
       }  
       return bean;  
   } 	
	
    public static String getFieldType(String fieldName, Object o) {  
        try {    
            String firstLetter = fieldName.substring(0, 1).toUpperCase();    
            String getter = "get" + firstLetter + fieldName.substring(1);    
            Method method = o.getClass().getMethod(getter, new Class[] {});    
            
            String type = method.getReturnType().toString();
            
            return type;    
        } catch (Exception e) {    
        	LOG.error(e.getMessage(), e);
            return "";    
        }   
    }
    
	public static int compare_date(String DATE1, String DATE2) {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		//DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date dt1 = df.parse(DATE1);
            Date dt2 = df.parse(DATE2);
            if (dt1.getTime() > dt2.getTime()) {
                //System.out.println("dt1 在dt2前");
                return 1;
            } else if (dt1.getTime() < dt2.getTime()) {
                //System.out.println("dt1在dt2后");
                return -1;
            } else {
                return 0;
            }
        } catch (Exception e) {
        	LOG.error(e.getMessage(), e);
        }
        return 0;
    }	
	
	public static double deff_date(String DATE1, String DATE2) {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        double ss =0;
        try {
		    Date d1 = df.parse(DATE1);
		    Date d2 = df.parse(DATE2);
		    long diff = d1.getTime() - d2.getTime();
		    ss = diff / (1000 );   //秒
        } catch (Exception e) {
        	LOG.error(e.getMessage(), e);
        }
        return ss;
    }	
	
	
	/** 
     *  
     * @param latitue 待测点的纬度 
     * @param longitude 待测点的经度 
     * @param areaLatitude1 纬度范围限制1 
     * @param areaLatitude2 纬度范围限制2 
     * @param areaLongitude1 经度限制范围1 
     * @param areaLongitude2 经度范围限制2 
     * @return 
     */  
    public static boolean isInArea(double latitue,double longitude,double areaLatitude1,double areaLatitude2,double areaLongitude1,double areaLongitude2){  
        if(isInRange(latitue, areaLatitude1, areaLatitude2)){//如果在纬度的范围内  
            if(areaLongitude1*areaLongitude2>0){//如果都在东半球或者都在西半球  
                if(isInRange(longitude, areaLongitude1, areaLongitude2)){  
                    return true;  
                }else {  
                    return false;  
                }  
            }else {//如果一个在东半球，一个在西半球  
                if(Math.abs(areaLongitude1)+Math.abs(areaLongitude2)<180){//如果跨越0度经线在半圆的范围内  
                    if(isInRange(longitude, areaLongitude1, areaLongitude2)){  
                        return true;  
                    }else {  
                        return false;  
                    }  
                }else{//如果跨越180度经线在半圆范围内  
                    double left = Math.max(areaLongitude1, areaLongitude2);//东半球的经度范围left-180  
                    double right = Math.min(areaLongitude1, areaLongitude2);//西半球的经度范围right-（-180）  
                    if(isInRange(longitude, left, 180)||isInRange(longitude, 0, right)){  
                        return true;  
                    }else {  
                        return false;  
                    }  
                }  
            }  
        }else{  
            return false;  
        }  
    }  
      
    public static boolean isInRange(double point, double left,double right){  
            if(point>=Math.min(left, right)&&point<=Math.max(left, right)){  
                return true;  
            }else {  
                return false;  
            }  
          
    }  	
    
	/**
	 * 计算地球上任意两点(经纬度)距离 
	 * @param long1
	 * @param lat1
	 * @param long2
	 * @param lat2
	 * @return
	 */
	public static double checkDistance(double long1, double lat1, double long2,  
	        double lat2) {  
	    double a, b, R;  
	    R = 6378137; // 地球半径  
	    lat1 = lat1 * Math.PI / 180.0;  
	    lat2 = lat2 * Math.PI / 180.0;  
	    a = lat1 - lat2;  
	    b = (long1 - long2) * Math.PI / 180.0;  
	    double d;  
	    double sa2, sb2;  
	    sa2 = Math.sin(a / 2.0);  
	    sb2 = Math.sin(b / 2.0);  
	    d = 2  
	            * R  
	            * Math.asin(Math.sqrt(sa2 * sa2 + Math.cos(lat1)  
	                    * Math.cos(lat2) * sb2 * sb2));  
	    return d;  
	}	
	
    /**   
    * 判断当前位置是否在圆内   
    * @param orderLocation 当前点  
    * @param partitionLocation 区域顶点  
    * @return   
    */  
	public static boolean isInCircle(Map<?, ?> orderLocation , String partitionLocation)
	{
		double p_lat =Double.parseDouble(orderLocation.get("LAT").toString());    
		double p_lng =Double.parseDouble(orderLocation.get("LNG").toString());  
		
		String[] strList = partitionLocation.split(","); 
        double polygonPoint_lat=Double.parseDouble(strList[1]);    
        double polygonPoint_lng=Double.parseDouble(strList[0]); 
        double v_distance = Double.parseDouble(strList[2]); 
        
        double getDistance= checkDistance(p_lng,p_lat,polygonPoint_lng,polygonPoint_lat);
        
        if (getDistance >= v_distance )
        {
        	return false;
        }
        
        return true;
	}
	
	
    /**   
    * 判断当前位置是否在多边形区域内   
    * @param orderLocation 当前点  
    * @param partitionLocation 区域顶点  
    * @return   
    */    
   public static boolean isInPolygon(Map<?, ?> orderLocation,String partitionLocation){    
         
       double p_lat =Double.parseDouble(orderLocation.get("LAT").toString());    
       double p_lng =Double.parseDouble(orderLocation.get("LNG").toString());    
       Point2D.Double point = new Point2D.Double(p_lat, p_lng);    
  
       List<Point2D.Double> pointList= new ArrayList<Point2D.Double>();    
       String[] strList = partitionLocation.split(";");  //解析坐标序列，如 118.733347,32.035642;118.739384,32.046171;118.726736,32.050456;118.710207,32.041763;118.713944,32.031234;118.730473,32.037846;118.727023,32.039437;118.727023,32.039437
         
       for (String str : strList){  
           String[] points = str.split(",");  
           double polygonPoint_lat=Double.parseDouble(points[1]);    
           double polygonPoint_lng=Double.parseDouble(points[0]);    
           Point2D.Double polygonPoint = new Point2D.Double(polygonPoint_lat,polygonPoint_lng);    
           pointList.add(polygonPoint);    
       }    
       return IsPtInPoly(point,pointList);    
   } 
   
   /**   
    * 判断点是否在多边形内，如果点位于多边形的顶点或边上，也算做点在多边形内，直接返回true  
    * @param point 检测点   
    * @param pts   多边形的顶点   
    * @return      点在多边形内返回true,否则返回false   
    */    
   public static boolean IsPtInPoly(Point2D.Double point, List<Point2D.Double> pts){    
           
       int N = pts.size();    
       boolean boundOrVertex = true; //如果点位于多边形的顶点或边上，也算做点在多边形内，直接返回true    
       int intersectCount = 0;//cross points count of x     
       double precision = 2e-10; //浮点类型计算时候与0比较时候的容差    
       Point2D.Double p1, p2;//neighbour bound vertices    
       Point2D.Double p = point; //当前点    
           
       p1 = pts.get(0);//left vertex            
       for(int i = 1; i <= N; ++i){//check all rays                
           if(p.equals(p1)){    
               return boundOrVertex;//p is an vertex    
           }    
               
           p2 = pts.get(i % N);//right vertex                
           if(p.x < Math.min(p1.x, p2.x) || p.x > Math.max(p1.x, p2.x)){//ray is outside of our interests                    
               p1 = p2;     
               continue;//next ray left point    
           }    
               
           if(p.x > Math.min(p1.x, p2.x) && p.x < Math.max(p1.x, p2.x)){//ray is crossing over by the algorithm (common part of)    
               if(p.y <= Math.max(p1.y, p2.y)){//x is before of ray                        
                   if(p1.x == p2.x && p.y >= Math.min(p1.y, p2.y)){//overlies on a horizontal ray    
                       return boundOrVertex;    
                   }    
                       
                   if(p1.y == p2.y){//ray is vertical                            
                       if(p1.y == p.y){//overlies on a vertical ray    
                           return boundOrVertex;    
                       }else{//before ray    
                           ++intersectCount;    
                       }     
                   }else{//cross point on the left side                            
                       double xinters = (p.x - p1.x) * (p2.y - p1.y) / (p2.x - p1.x) + p1.y;//cross point of y                            
                       if(Math.abs(p.y - xinters) < precision){//overlies on a ray    
                           return boundOrVertex;    
                       }    
                           
                       if(p.y < xinters){//before ray    
                           ++intersectCount;    
                       }     
                   }    
               }    
           }else{//special case when ray is crossing through the vertex                    
               if(p.x == p2.x && p.y <= p2.y){//p crossing over p2                        
                   Point2D.Double p3 = pts.get((i+1) % N); //next vertex                        
                   if(p.x >= Math.min(p1.x, p3.x) && p.x <= Math.max(p1.x, p3.x)){//p.x lies between p1.x & p3.x    
                       ++intersectCount;    
                   }else{    
                       intersectCount += 2;    
                   }    
               }    
           }                
           p1 = p2;//next ray left point    
       }    
           
       if(intersectCount % 2 == 0){//偶数在多边形外    
           return false;    
       } else { //奇数在多边形内    
           return true;    
       }    
   }       
}
