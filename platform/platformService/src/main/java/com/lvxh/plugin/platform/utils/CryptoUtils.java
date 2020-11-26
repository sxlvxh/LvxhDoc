package com.lvxh.plugin.platform.utils;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.security.Key;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.Arrays;

import javax.crypto.Cipher;
import javax.crypto.CipherInputStream;
import javax.crypto.CipherOutputStream;
import javax.crypto.spec.SecretKeySpec;

/**
 * 加密/解密相关的工具类
 * 
 * @author huangwenhai
 *
 */
public class CryptoUtils {

    private static SecretKeySpec getKey(String rawKey)
            throws NoSuchAlgorithmException, UnsupportedEncodingException {
        if (null == rawKey || rawKey.length() != 16) {
            throw new RuntimeException("length of `rawKey` must be 16!");
        }
        SecretKeySpec secretKey;
        byte[] key = rawKey.getBytes("UTF-8");
        MessageDigest sha = MessageDigest.getInstance("SHA-1");
        key = sha.digest(key);
        key = Arrays.copyOf(key, 16);
        secretKey = new SecretKeySpec(key, "AES");
        return secretKey;

    }

    /**
     * 输入流已经进行缓冲。
     * 
     * @param encryptedIn
     * @param secret
     *            密钥的长度必须是16位
     * @return
     * @throws Exception
     */
    public static InputStream readAESEncrypted(InputStream encryptedIn,
            String secret) throws Exception {

        return readAESEncrypted(encryptedIn, secret, 8192);
    }

    public static InputStream readAESEncrypted(InputStream encryptedIn,
            String secret, int bufferSize)
            throws Exception {
        Cipher cipher = null;
        try {
            Key key = getKey(secret);
            cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, key);
        } finally {
            ;
        }
        BufferedInputStream bis = new BufferedInputStream(encryptedIn,
                bufferSize);// 8192
        CipherInputStream cis = new CipherInputStream(bis, cipher);
        return cis;
    }

    public static OutputStream writeAsAESEncrypted(OutputStream out,
            String secret,
            int bufferSize)
            throws Exception {
        Key key = getKey(secret);
        OutputStream cos = writeAsEncrypted0("AES/ECB/PKCS5Padding", out, key,
                bufferSize);
        return cos;
    }

    public static OutputStream writeAsEncrypted0(String cryptAlgorithm,
            OutputStream out,
            Key key,
            int bufferSize)
            throws Exception {
        Cipher cipher = null;
        try {
            cipher = Cipher.getInstance(cryptAlgorithm);
            cipher.init(Cipher.ENCRYPT_MODE, key);
        } finally {
            ;
        }
        BufferedOutputStream bos = new BufferedOutputStream(out, bufferSize);
        CipherOutputStream cos = new CipherOutputStream(bos, cipher);
        return cos;
    }

    public static OutputStream writeAsRSAEncrypted(OutputStream out,
            PublicKey key,
            int bufferSize)
            throws Exception {
        OutputStream cos = writeAsEncrypted0("RSA/ECB/PKCS1Padding", out, key,
                bufferSize);
        return cos;
    }

    public static InputStream readEncrypted0(String cryptAlgorithm,
            InputStream encryptedIn,
            Key key, int bufferSize)
            throws Exception {
        Cipher cipher = null;
        try {
            cipher = Cipher.getInstance(cryptAlgorithm);
            cipher.init(Cipher.DECRYPT_MODE, key);
        } finally {
            ;
        }
        BufferedInputStream bis = new BufferedInputStream(encryptedIn,
                bufferSize);// 8192
        CipherInputStream cis = new CipherInputStream(bis, cipher);
        return cis;
    }

    public static InputStream readRASEncrypted(InputStream encryptedIn,
            PrivateKey key, int bufferSize)
            throws Exception {
        Cipher cipher = null;
        try {
            cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
            cipher.init(Cipher.DECRYPT_MODE, key);
        } finally {
            ;
        }
        BufferedInputStream bis = new BufferedInputStream(encryptedIn,
                bufferSize);// 8192
        CipherInputStream cis = new CipherInputStream(bis, cipher);
        return cis;
    }

    public static InputStream readRASEncrypted(InputStream encryptedIn,
            PrivateKey key) throws Exception {
        return readRASEncrypted(encryptedIn, key, 8192);
    }

}
