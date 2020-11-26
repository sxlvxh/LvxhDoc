package test;

import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.FileDialog;
import org.eclipse.swt.widgets.Shell;

public class SwtDemo {

	/**
	 * Launch the application
	 * 
	 * @param args
	 */
	public static void main(String[] args) {
		final Display display = Display.getDefault();
		final Shell shell = new Shell();
		shell.setSize(500, 375);
		shell.setText("SWT Application");
		//

		final WordView composite = new WordView(shell, SWT.NULL);
		composite.setBounds(0, 0, 490, 295);

		final Button open = new Button(shell, SWT.NONE);
		open.setText("打开文档");
		open.setBounds(315, 310, 70, 20);

		final Button save = new Button(shell, SWT.NONE);
		save.setBounds(412, 310, 70, 20);
		save.setText("保存文档");
		shell.layout();

		open.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent event) {
				FileDialog dlg = new FileDialog(shell, SWT.OPEN);
				dlg.setFilterNames(new String[] { "word文档(*.doc)" });
				dlg.setFilterExtensions(new String[] { "*.doc" });

				String fileName = dlg.open();
				if (fileName != null) {
					composite.open(fileName);
				}
			}
		});

		save.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent event) {
				FileDialog dlg = new FileDialog(shell, SWT.SAVE);
				dlg.setFilterNames(new String[] { "word文档(*.doc)" });
				dlg.setFilterExtensions(new String[] { "*.doc" });

				String fileName = dlg.open();
				if (fileName != null) {
					composite.save(fileName);
				}
			}
		});

		shell.open();
		while (!shell.isDisposed()) {
			if (!display.readAndDispatch())
				display.sleep();
		}
	}

}
