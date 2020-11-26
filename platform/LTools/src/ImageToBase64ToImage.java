public class ImageToBase64ToImage {/*
    public static void main(String[] args) {
        String strImg = ImageToBase64();
        System.out.println(strImg);
        Base64ToImage(strImg);
    }
    //图片转化成base64字符串
    public static String ImageToBase64(){
        //将图片文件转化为字节数组字符串，并对其进行Base64编码处理
        String imgFile = "D:\\20190904\\20190904100308.png";//待处理的图片
        InputStream in = null;
        byte[] data = null;
        //读取图片字节数组
        try{
            in = new FileInputStream(imgFile);
            data = new byte[in.available()];
            in.read(data);
            in.close();
        }catch (IOException e){
            e.printStackTrace();
        }
        //对字节数组Base64编码
        BASE64Encoder encoder = new BASE64Encoder();
        //返回Base64编码过的字节数组字符串
        return encoder.encode(data);
    }

    //base64字符串转化成图片
    public static boolean Base64ToImage(String imgStr){
        //对字节数组字符串进行Base64解码并生成图片
        if (imgStr == null) //图像数据为空
            return false;
        BASE64Decoder decoder = new BASE64Decoder();
        try{
            //Base64解码
            byte[] b = decoder.decodeBuffer(imgStr);
            for(int i=0;i<b.length;++i){
                if(b[i]<0){//调整异常数据
                    b[i]+=256;
                }
            }
            //生成png图片
            String imgFilePath = "E:\\photo\\new_timg.png";//新生成的图片
            OutputStream out = new FileOutputStream(imgFilePath);
            out.write(b);
            out.flush();
            out.close();
            return true;
        }catch (Exception e){
            return false;
        }
    }
*/}
