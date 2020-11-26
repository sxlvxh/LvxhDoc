package test;

public class Word {/*
	public static boolean changeWord(String docPath, Map map) {
		ActiveXComponent component=null;
		try {
 
			 component = new ActiveXComponent(
					"Word.Application");
			component.setProperty("Visible", new Variant(false)); // 设置word不可见
			Dispatch docs = component.getProperty("Documents").toDispatch();
			Dispatch doc = Dispatch.invoke(
					docs,
					"Open",
					Dispatch.Method,
					new Object[] { docPath, new Variant(false),
							new Variant(false) }, new int[1]).toDispatch();
 
			Dispatch selection = component.getProperty("Selection")
					.toDispatch();// 获得对Selection组件
			Dispatch.call(selection, "HomeKey", new Variant(6));// 移到开头
			Dispatch find = Dispatch.call(selection, "Find").toDispatch();// 获得Find组件
 
			Set set = map.entrySet();
			Iterator iter = set.iterator();
			while (iter.hasNext()) {
				Entry entry = (Entry) iter.next();
				Dispatch.put(find, "Text", entry.getKey()); // 查找字符串"name"
				Dispatch.put(find, "MatchCase", "True"); // 大小写匹配
				Dispatch.put(find, "MatchWholeWord", "True"); // 全字符匹配
 
				boolean b = Dispatch.call(find, "Execute").getBoolean(); // 执行查询
				// 循环查找， 知道一个就替换一个 并且移动到下一位
				System.out.println(b);
				while (b) {
					Dispatch.put(selection, "Text", entry.getValue());
					Dispatch.call(selection, "MoveRight"); // 替换之后移动到下一位 重要 or
															// 出现死循环
					b = Dispatch.call(find, "Execute").getBoolean(); // 判断是否还存在
					// 执行替换替换
				}
				Dispatch.call(selection, "HomeKey", new Variant(6));// 移到开头
			}
 
			Dispatch.call(doc, "Save"); // 保存
			Dispatch.call(doc, "Close", new Variant(false));
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			component.invoke("Quit", new Variant[] {});
			component.safeRelease();
		}
		return true;
	}
 
	public static void main(String[] args) {
		Map map = new TreeMap();
		map.put("#(name)", "张三");
		map.put("#(age)", "18");
		map.put("#(sex)", "man");
		changeWord("e:/深圳下坪场智慧平台初步软件部分技术建议.docx",map);
	}
*/}