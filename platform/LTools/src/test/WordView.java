package test;

import java.io.File;

import org.eclipse.swt.SWT;
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.ole.win32.OleClientSite;
import org.eclipse.swt.ole.win32.OleFrame;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Shell;

public class WordView extends org.eclipse.swt.widgets.Composite {
	private OleFrame oleFrame1;
	private OleClientSite site;

	/**
	 * Auto-generated main method to display this org.eclipse.swt.widgets.Composite
	 * inside a new Shell.
	 */
	public static void main(String[] args) {
		showGUI();
	}

	/**
	 * Auto-generated method to display this org.eclipse.swt.widgets.Composite
	 * inside a new Shell.
	 */
	public static void showGUI() {
		Display display = Display.getDefault();
		Shell shell = new Shell(display);
		shell.setText("Word in SWT");
		new WordView(shell, SWT.NULL);

		shell.setLayout(new FillLayout());
		shell.layout();
		shell.setSize(600, 400);

		shell.open();
		while (!shell.isDisposed()) {
			if (!display.readAndDispatch())
				display.sleep();
		}
	}

	public WordView(org.eclipse.swt.widgets.Composite parent, int style) {
		super(parent, style);
		initGUI();
	}

	private void initGUI() {
		try {
			FillLayout thisLayout = new FillLayout(org.eclipse.swt.SWT.HORIZONTAL);
			this.setLayout(thisLayout);
			this.setSize(229, 54);
			{
				oleFrame1 = new OleFrame(this, SWT.NONE);
				{
					try {
						site = new org.eclipse.swt.ole.win32.OleClientSite(oleFrame1, org.eclipse.swt.SWT.NONE,
								"Word.Document");

						site.setBounds(0, 0, 104, 54);
						site.doVerb(org.eclipse.swt.ole.win32.OLE.OLEIVERB_SHOW);
					} catch (org.eclipse.swt.SWTException e) {
						String str = "Create OleClientSite Error" + e.toString();
						System.out.println(str);
						return;
					}
				}
			}

			this.layout();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private void open(File file) {
		site = null;
		try {
			site = new org.eclipse.swt.ole.win32.OleClientSite(oleFrame1, org.eclipse.swt.SWT.NONE, file);

			site.setBounds(0, 0, 104, 54);
			site.doVerb(org.eclipse.swt.ole.win32.OLE.OLEIVERB_SHOW);
		} catch (org.eclipse.swt.SWTException e) {
			String str = "Create OleClientSite Error" + e.toString();
			System.out.println(str);
			return;
		}
	}

	public void open(String strName) {
		// site.(new File(strName),true);
		open(new File(strName));
	}

	public void save(String strName) {
		site.save(new File(strName), true);
	}

}
