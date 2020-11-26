package utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.text.DecimalFormat;

import org.apache.log4j.Logger;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;

public class LvxhJschUtil {
	private final static Logger LOG = Logger.getLogger(LvxhJschUtil.class);
	private String charset = "UTF-8"; // 设置编码格式
	private Session session;
	private boolean r = true;

	/**
	 * 
	 * @param user
	 *            � �户名
	 * @param passwd
	 *            � ��码
	 * @param host
	 *            � ��机IP
	 */
	public LvxhJschUtil() {

	}

	/**
	 * 连接到指定的IP
	 * 
	 * @throws JSchException
	 */
	public boolean connect(String user, String passwd, String host) {
		boolean f = true;
		JSch jsch = new JSch();
		try {
			session = jsch.getSession(user, host, 22);
			session.setTimeout(50000);
			session.setPassword(passwd);
			java.util.Properties config = new java.util.Properties();
			config.put("StrictHostKeyChecking", "no");
			session.setConfig(config);
			session.connect();
			execCmd("hostname");
		} catch (JSchException e) {
			f = false;
			e.printStackTrace();
		}
		return f;
	}

	/**
	 * 执行相关的命令
	 */
	public void execCmd(String cmd) {

		BufferedReader reader = null;
		Channel channel = null;

		try {
			channel = session.openChannel("exec");
			ChannelExec exec = (ChannelExec) channel;
			exec.setCommand(cmd);
			channel.setInputStream(null);
			((ChannelExec) channel).setErrStream(System.err);

			channel.connect();

			InputStream in = channel.getInputStream();
			reader = new BufferedReader(new InputStreamReader(in,
					Charset.forName(charset)));
			String buf = null;
			while ((buf = reader.readLine()) != null) {

				System.out.println(buf);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
		} finally {
			try {
				reader.close();
			} catch (IOException e) {
				System.out.println(e.getMessage());
			}
			channel.disconnect();
		}
	}

	/**
	 * 执行相关的命令
	 */
	public void execSftp(File file, String path) {
		if (!r) {
			return;
		}
		Channel channel = null;
		OutputStream outstream = null;
		InputStream instream = null;
		try {
			// 创建sftp通信通道
			channel = (Channel) session.openChannel("sftp");
			channel.connect(1000);
			ChannelSftp sftp = (ChannelSftp) channel;
			sftp.setFilenameEncoding(charset);
			sftp.cd(path);
			// 以下代码实现从本地上传一个文件到服务器，如果要实现下载，对换以下流就可以了
			outstream = sftp.put(file.getName());
			instream = new FileInputStream(file);

			byte b[] = new byte[10240];
			int n;
			long length = file.length();
			long i = 0;
			int j = 0;

			while ((n = instream.read(b)) != -1) {
				if (!r) {
					channel.disconnect();
				}
				j++;
				i = i + b.length;
				double d = i * 1.0 / length * 100;
				DecimalFormat df = new DecimalFormat("0.00");
				String k = df.format(d) + "%";
				System.out.println(j + ": " + k);
				outstream.write(b, 0, n);
				outstream.flush();
			}

		} catch (Exception e) {
			System.out.println(e.getMessage());
		} finally {
			if (outstream != null) {
				try {
					outstream.close();
				} catch (IOException e) {
					System.out.println(e.getMessage());
				}

			}
			if (instream != null) {
				try {
					instream.close();
				} catch (IOException e) {
					System.out.println(e.getMessage());
				}
			}
			channel.disconnect();
		}
	}

	/**
	 * 执行相关的命令
	 */
	public void execShell(String shellCommand) {
		Channel channel = null;
		OutputStream outstream = null;
		InputStream instream = null;
		String cmd = shellCommand;
		try {
			channel = (Channel) session.openChannel("shell");
			try {
				channel.connect(1000);
			} catch (Exception e1) {
				for (int i = 0; i < 3; i++) {
					try {
						channel.connect(1000);
						break;
					} catch (Exception e2) {
						System.out.println(e2.getMessage());
					}
				}
				System.out.println(e1.getMessage());
			}

			Thread.sleep(2000);
			//.println(channel.getId());
			outstream = channel.getOutputStream();
			shellCommand = shellCommand + "\n";
			outstream.write(shellCommand.getBytes());
			outstream.flush();
			instream = channel.getInputStream();
			while (true) {
				byte[] b = new byte[2048];
				instream.read(b, 0, b.length);

				/*
				 * for (int i = 0; i < b.length; i++) { if ( b[i] == 91 || b[i]
				 * < 32) { b[i] = 32; } else {
				 * 
				 * } }
				 */
				String str = new String(b, charset);
				String result = str.replaceAll("        ", "").trim();
				System.out.println(result);
				String ft[] = result.split("\\r\\n");
			}

		} catch (Exception e) {

			System.out.println(e.getMessage());

		} finally {
			if (outstream != null) {
				try {
					outstream.close();
				} catch (IOException e) {
					System.out.println(e.getMessage());
				}

			}
			if (instream != null) {
				try {
					instream.close();
				} catch (IOException e) {
					System.out.println(e.getMessage());
				}
			}
			if (channel!=null && channel.isConnected()) {
				channel.disconnect();
			}
			// this.close();

		}
	}

	private void filter(byte[] b, int sk) {
		for (int k = 48; k < 58; k++) {
			for (int j = 48; j < 58; j++) {
				byte[] ff = new byte[3];
				ff[0] = (byte) k;
				ff[1] = (byte) j;
				ff[2] = (byte) sk;
				filter(b, ff);
			}
		}
	}

	private void filter(byte[] b, byte[] d) {
		for (int j = 0; j < b.length - d.length; j++) {
			boolean f = true;
			for (int i = 0; i < d.length; i++) {
				if (b[j + i] == d[i]) {
					f = true;
				} else {
					f = false;
					break;
				}
			}
			if (f) {
				for (int i = 0; i < d.length; i++) {
					b[j + i] = 32;
				}
			}

		}
	}

	public boolean isR() {
		return r;
	}

	public void setR(boolean r) {
		this.r = r;
	}

	public static void main(String[] args) throws Exception {
		String user = "root";
		String passwd = "huaiye2013**";
		String host = "192.168.3.28";
		// File file = new File("F:/deploy/fyzx2/setup.zip");

		LvxhJschUtil demo = new LvxhJschUtil();
		demo.connect(user, passwd, host);
		demo.execSftp(new File("E:\\出包脚本\\C03White\\Setup.exe"), "/home/");
		// demo.execSftp(file); // demo.execCmd("ls /home"); //
		// demo.execCmd("rm -rf /home/setup");
		// demo.execCmd("unzip -o /home/setup.zip -d /home/"); //
		// demo.execCmd("chmod 777  /home/setup/*");

		demo.execShell("pwd");
	}

}