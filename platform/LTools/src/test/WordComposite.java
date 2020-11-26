package test;
 
import java.io.File;
import java.util.HashMap;
import java.util.Iterator;
 
import org.eclipse.swt.SWT;
import org.eclipse.swt.SWTException;
import org.eclipse.swt.events.DisposeEvent;
import org.eclipse.swt.events.DisposeListener;
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.ole.win32.OLE;
import org.eclipse.swt.ole.win32.OleAutomation;
import org.eclipse.swt.ole.win32.OleControlSite;
import org.eclipse.swt.ole.win32.OleFrame;
import org.eclipse.swt.ole.win32.Variant;
import org.eclipse.swt.widgets.Composite;
 
/**
 * @author lifei114@gmail.com,lifei114@126.com
 * 嵌入 Word 的容器，更多的API正在开发中。
 */
public class WordComposite extends Composite {
	private static String progID = "WEBOFFICE.WebOfficeCtrl.1";
	OleControlSite site = null;
	OleAutomation auto = null;
	private OleFrame frame;
 
	/**
	 * Create the composite.
	 * 
	 * @param parent
	 * @param style
	 */
	public WordComposite(Composite parent, int style) {
		super(parent, style | SWT.BORDER);
		parent.addDisposeListener(new DisposeListener() {
 
			@Override
			public void widgetDisposed(DisposeEvent e) {
				dispose();
			}
		});
		setLayout(new FillLayout());
		init();
	}
 
	private void init() {
		frame = new OleFrame(this, SWT.NONE);
		try {
			site = new OleControlSite(frame, SWT.NONE, progID);
			// site.doVerb(OLE.OLEIVERB_SHOW);
			site.doVerb(OLE.OLEIVERB_INPLACEACTIVATE);
			auto = new OleAutomation(site);
			showWebOfficeBtn();
		} catch (SWTException ex) {
			try {
				System.out.println("注册Office控件。");
				installWebOffice();
				site = new OleControlSite(frame, SWT.NONE, progID);
				site.doVerb(OLE.OLEIVERB_SHOW);
				site.doVerb(OLE.OLEIVERB_INPLACEACTIVATE);
				auto = new OleAutomation(site);
				showWebOfficeBtn();				
			} catch (Exception e) {
				System.out.println("Unable to open type library for " + progID);
				e.printStackTrace();
			}
			return;
		}
	}
	private void installWebOffice() throws Exception{
		StringBuffer cmd = new StringBuffer();
		File ocxfile = new File("activex\\WebOffice.ocx");
		cmd.append("regsvr32 /s ").append(ocxfile.getAbsolutePath());
		String cmdStr = cmd.toString();
		Process process = Runtime.getRuntime().exec(cmdStr);
		process.waitFor();
	}
	@Override
	protected void checkSubclass() {
	}
 
	public void open(File file) {
		String filePath = file.getAbsolutePath();
		int[] methodIDs = null;
		methodIDs = auto.getIDsOfNames(new String[] { "LoadOriginalFile" });
 
		auto.invoke(methodIDs[0], new Variant[] { new Variant(filePath),new Variant("doc") });
		//hideToolBarAll();
		
	}
	public void printPreview(){
		int[] methodIDs = null;
		methodIDs = auto.getIDsOfNames(new String[] { "PrintPreview" });
 
		auto.invoke(methodIDs[0]);
	}
	public void print(){
		
		int[] methodIDs = null;
		methodIDs = auto.getIDsOfNames(new String[] { "PrintOut" });
 
		auto.invoke(methodIDs[0]);
	}
	public void setFieldValue(String key,String value){
		int[] methodIDs = null;
		methodIDs = auto.getIDsOfNames(new String[] { "SetFieldValue" });
		Variant[] vars = new Variant[]{new Variant(key),new Variant(value),new Variant("")};
		auto.invoke(methodIDs[0],vars);
	}
	public void updateFields(HashMap<String, String> values){
		Iterator<String> keyIterator = values.keySet().iterator();
		while (keyIterator.hasNext()){
			String key = keyIterator.next();
			String value = values.get(key);
			setFieldValue(key, value);
		}
	}
	/**
	 * 隐藏 WebOffice 所有工具栏
	 */
	public void hideToolBarAll(){
		int ids[] = auto.getIDsOfNames(new String[] { "ShowToolBar" });
		auto.setProperty(ids[0], new Variant[] { new Variant(false) });
	}
	
	public void showWebOfficeBtn(){
		int ids[] = auto.getIDsOfNames(new String[] { "HideMenuItem" });
		//auto.invoke(ids[0],new Variant[]{new Variant(0x04 + 0x10 + 0x20)});
		auto.invoke(ids[0],new Variant[]{new Variant(0x01 + 0x1000 + 0x02)});
	}
	
	@Override
	public void dispose() {
		super.dispose();
		auto.dispose();
		site.dispose();
		frame.dispose();
	}
 
}