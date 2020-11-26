package com.huaiye.plugin.plat.custom.utils;

import java.io.OutputStream;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.huaiye.plugin.plat.platpositionhis.holder.PlatPositionHisHolder;
import com.huaiye.plugin.plat.platuserlist.holder.PlatUserListHolder;
import com.lvxh.plugin.platform.service.Constants;

public class PlatUtils {
	private static final Logger LOG = Logger.getLogger(PlatUtils.class);

	public static final BlockingQueue<PlatPositionHisHolder> POSITION_QUEUE = new LinkedBlockingQueue<PlatPositionHisHolder>(
			2000);

	public static PlatUserListHolder getSessionUser(HttpServletRequest req) {
		Object obj = req.getSession().getAttribute(Constants.LOGIN_USER);
		if (obj != null) {
			return (PlatUserListHolder) obj;
		} else {
			return null;
		}

	}

	public static void put(PlatPositionHisHolder e) throws InterruptedException {
		POSITION_QUEUE.put(e);
	}

	public static int drainTo(Collection<? super PlatPositionHisHolder> c, int size) {
		return POSITION_QUEUE.drainTo(c, size);
	}

	public static void getQRCode(String url, OutputStream os) {
		int width = 200;
		int height = 200;
		String format = "png";
		Map<EncodeHintType, Object> hints = new HashMap<EncodeHintType, Object>();
		hints.put(EncodeHintType.CHARACTER_SET, "utf-8");
		hints.put(EncodeHintType.MARGIN, 1);
		try {
			BitMatrix bitMatrix = new MultiFormatWriter().encode(url, BarcodeFormat.QR_CODE, width, height, hints);
			MatrixToImageWriter.writeToStream(bitMatrix, format, os);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	}
}
